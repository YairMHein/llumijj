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
  metal: string | null;
  sku: string | null;
  plating: string | null;
  size: string | null;
  weight: string | null;
  stone: string | null;
  is_featured: boolean | null;
  is_new: boolean | null;
  is_best_seller: boolean | null;
  product_photos?: ProductPhoto[];
  product_variants?: ProductVariant[];
};

export type ProductCart = {
  id: string;
  slug: string;
  name: string;
  category: string;
  plating: string | null;
  price: number;
  sale_price: number | null;
  sku: string | null;
  image_url: string;
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

export async function fetchProductsCart(filters?: {
  category?: string;
  featured?: boolean;
}): Promise<ProductCart[]> {
  let query = supabase
    .from("products")
    .select(`
      id,
      slug,
      name,
      plating,
      category,
      price,
      sale_price,
      sku,
      product_photos!left(image_url, is_primary, sort_order)
    `)
    .order("created_at", { ascending: false });

  if (filters?.category) query = query.eq("category", filters.category);
  if (filters?.featured) query = query.eq("is_featured", true);

  const { data, error } = await query;
  if (error) throw error;

  return (data ?? []).map((p) => {
    const photos = (p.product_photos ?? []) as {
      image_url: string;
      is_primary: boolean;
      sort_order: number;
    }[];
    const primary =
      photos.find((ph) => ph.is_primary) ??
      photos.sort((a, b) => a.sort_order - b.sort_order)[0];

    return {
      id: p.id,
      slug: p.slug,
      name: p.name,
      category: p.category,
      plating: p.plating,
      price: Number(p.price),
      sale_price: p.sale_price != null ? Number(p.sale_price) : null,
      sku: p.sku ?? null,
      image_url: primary?.image_url ?? "",
    };
  });
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

