import { supabase } from "@/integrations/supabase/client";

export type ProductPhoto = {
  id: string;
  product_id: string;
  image_url: string;
  image_name: string | null;
  storage_path: string | null;
  is_primary: boolean | null;
  sort_order: number | null;
  media_type?: string | null;
};

export type ProductVariant = {
  id: string;
  product_id: string;
  sku: string | null;
  size: string;
  price: number;
  sale_price: number | null;
  stock: number | null;
  sort_order: number | null;
};

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
  sku: string | null;
  is_featured: boolean | null;
  is_new: boolean | null;
  is_best_seller: boolean | null;
  product_photos?: ProductPhoto[];
  product_variants?: ProductVariant[];
};

const SELECT =
  "*, product_photos(id, product_id, image_url, image_name, storage_path, is_primary, sort_order, media_type), product_variants(id, product_id, sku, size, price, sale_price, stock, sort_order)";


export async function fetchProducts(opts: { category?: string; onSale?: boolean; featured?: boolean; isNew?: boolean; isBestSeller?: boolean } = {}) {
  let q = supabase.from("products").select(SELECT).order("created_at", { ascending: false });
  if (opts.category) q = q.eq("category", opts.category);
  if (opts.onSale) q = q.not("sale_price", "is", null);
  if (opts.featured) q = q.eq("is_featured", true);
  if (opts.isNew) q = q.eq("is_new", true);
  if (opts.isBestSeller) q = q.eq("is_best_seller", true);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as Product[];
}

export async function fetchProductBySlug(slug: string) {
  const { data, error } = await supabase.from("products").select(SELECT).eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data as Product | null;
}

export function sortedPhotos(product: Pick<Product, "product_photos">): ProductPhoto[] {
  const photos = product.product_photos ?? [];
  return [...photos].sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1;
    if (!a.is_primary && b.is_primary) return 1;
    return (a.sort_order ?? 0) - (b.sort_order ?? 0);
  });
}

export function primaryPhotoUrl(product: Pick<Product, "product_photos">): string | null {
  const photos = sortedPhotos(product);
  return photos[0]?.image_url ?? null;
}

export function sortedVariants(product: Pick<Product, "product_variants">): ProductVariant[] {
  const variants = product.product_variants ?? [];
  return [...variants].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
}

export function variantPrice(v: ProductVariant): number {
  return Number(v.sale_price ?? v.price);
}

