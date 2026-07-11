import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { ContactModal } from "@/components/ContactModal";
import { useCart, formatMoney } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { resolveProductImage } from "@/lib/product-images";

export const Route = createFileRoute("/checkout")({ component: CheckoutPage });

const DEPOSIT_PCT = 0.3;

function CheckoutPage() {
  const { items, subtotal } = useCart();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [method, setMethod] = useState<"pickup" | "delivery">("pickup");
  const [openContact, setOpenContact] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login", search: { redirect: "/checkout" } });
  }, [user, loading, navigate]);

  const deposit = subtotal * DEPOSIT_PCT;

  if (loading) return null;

  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-5 py-14 md:px-8">
        <h1 className="font-serif text-4xl">Checkout — Preorder</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Reserve your pieces with a 30% deposit. Our team will reach out on your preferred channel to confirm details and arrange payment.
        </p>

        {items.length === 0 ? (
          <div className="mt-10"><Link className="underline" to="/shop">Add a piece to your bag first</Link></div>
        ) : (
          <div className="mt-10 grid gap-10 md:grid-cols-[1fr_360px]">
            <div className="space-y-8">
              <div>
                <h2 className="text-[11px] tracking-luxe text-muted-foreground">Delivery</h2>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  {(["pickup", "delivery"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMethod(m)}
                      className={`border p-4 text-left text-sm transition-colors ${method === m ? "border-foreground" : "border-border hover:border-foreground/40"}`}
                    >
                      <div className="font-serif text-lg capitalize">{m === "pickup" ? "Pickup" : "Home delivery"}</div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {m === "pickup" ? "Free of charge — collect at our atelier." : "Delivery fee calculated based on distance."}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-[11px] tracking-luxe text-muted-foreground">In your bag</h2>
                <ul className="mt-3 divide-y divide-border border-y border-border">
                  {items.map((i) => (
                    <li key={`${i.id}:${i.variant_id ?? ""}`} className="py-3">
                      <Link to="/product/$slug" params={{ slug: i.slug }} className="flex items-center gap-4 hover:opacity-80">
                        <img src={resolveProductImage(i.image_url)} alt="" className="h-16 w-14 object-cover" />
                        <div className="flex-1">
                          <p className="font-serif text-base">{i.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Qty {i.quantity}
                            {i.variant_size ? ` · Size ${i.variant_size}` : ""}
                            {i.sku ? ` · SKU ${i.sku}` : ""}
                          </p>
                        </div>
                        <span className="text-sm">{formatMoney(i.price * i.quantity)}</span>
                      </Link>
                    </li>
                  ))}

                </ul>
              </div>
            </div>

            <aside className="h-fit border border-border p-6">
              <h2 className="text-[11px] tracking-luxe text-muted-foreground">Order</h2>
              <div className="mt-4 space-y-1 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>{formatMoney(subtotal)}</span></div>
                {method === "delivery" && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>+ Delivery fees</span><span className="text-right text-[11px]">based on distance</span>
                  </div>
                )}
                <div className="mt-2 flex justify-between border-t border-border pt-2 text-sale">
                  <span>Deposit due today (50%)</span><span>{formatMoney(deposit)}</span>
                </div>
              </div>
              <button
                onClick={() => setOpenContact(true)}
                className="mt-6 block w-full bg-foreground py-3 text-center text-[11px] tracking-luxe text-background"
              >
                Place preorder
              </button>
              <p className="mt-3 text-[10px] tracking-luxe text-muted-foreground">
                We'll contact you to confirm the order.
              </p>
            </aside>
          </div>
        )}
      </section>
      <ContactModal
        open={openContact}
        onClose={() => setOpenContact(false)}
        title="Confirm your preorder"
        subtitle="Reach us on any channel below to finalise your order and arrange the 30% deposit."
      />
    </Layout>
  );
}
