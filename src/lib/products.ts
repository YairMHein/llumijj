import { supabase } from "@/integrations/supabase/client";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  category: "earrings" | "necklaces" | "rings" | "bracelets";
  price: number;
  sale_price: number | null;
  image_url: string;
  material: string | null;
  metal: string | null;
  is_featured: boolean | null;
  is_new: boolean | null;
  is_best_seller: boolean | null;
};

export async function fetchProducts(opts: { category?: string; onSale?: boolean; featured?: boolean } = {}) {
  let q = supabase.from("products").select("*").order("created_at", { ascending: false });
  if (opts.category) q = q.eq("category", opts.category);
  if (opts.onSale) q = q.not("sale_price", "is", null);
  if (opts.featured) q = q.eq("is_featured", true);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as Product[];
}

export async function fetchProductBySlug(slug: string) {
  const { data, error } = await supabase.from("products").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data as Product | null;
}
