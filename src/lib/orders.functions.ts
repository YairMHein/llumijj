import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// Server-authoritative pricing constants — mirror cart.tsx display logic.
const DELIVERY_FEE = 12;
const DEPOSIT_PCT = 0.3;

const orderInput = z.object({
  items: z
    .array(
      z.object({
        product_id: z.string().uuid(),
        quantity: z.number().int().min(1).max(50),
      }),
    )
    .min(1)
    .max(50),
  delivery_method: z.enum(["pickup", "delivery"]),
  contact_email: z.string().trim().email().max(255),
  contact_phone: z.string().trim().min(5).max(40),
  shipping_address: z.string().trim().max(500).optional().nullable(),
});

export const placeOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => orderInput.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    if (data.delivery_method === "delivery" && !data.shipping_address?.trim()) {
      throw new Error("Delivery address is required for home delivery");
    }

    // Re-fetch authoritative prices from the products table.
    const ids = data.items.map((i) => i.product_id);
    const { data: products, error: pErr } = await supabase
      .from("products")
      .select("id, name, slug, price, sale_price, image_url")
      .in("id", ids);
    if (pErr) throw pErr;
    if (!products || products.length !== ids.length) {
      throw new Error("One or more products are no longer available");
    }

    const priceMap = new Map(products.map((p) => [p.id, p]));
    let subtotal = 0;
    const items = data.items.map((i) => {
      const p = priceMap.get(i.product_id)!;
      const unit = Number(p.sale_price ?? p.price);
      const line = unit * i.quantity;
      subtotal += line;
      return {
        id: p.id,
        slug: p.slug,
        name: p.name,
        image_url: p.image_url,
        price: unit,
        quantity: i.quantity,
      };
    });

    const delivery_fee = data.delivery_method === "delivery" ? DELIVERY_FEE : 0;
    const total = subtotal + delivery_fee;
    const deposit_amount = Math.round(total * DEPOSIT_PCT * 100) / 100;

    const { data: inserted, error } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        delivery_method: data.delivery_method,
        delivery_fee,
        subtotal,
        total,
        deposit_amount,
        shipping_address: data.delivery_method === "delivery" ? data.shipping_address : null,
        contact_phone: data.contact_phone,
        contact_email: data.contact_email,
        items,
        status: "preorder",
      })
      .select("tracking_code")
      .single();

    if (error) throw error;
    return { tracking_code: inserted.tracking_code as string };
  });
