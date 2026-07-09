import { supabase } from "@/integrations/supabase/client";
import type { Product } from "./products";

export type Collection = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  image_url: string | null;
  is_featured: boolean;
  sort_order: number;
};

export type CollectionWithProducts = Collection & {
  products: Product[];
};

const PRODUCT_SELECT =
  "*, product_photos(id, product_id, image_url, image_name, storage_path, is_primary, sort_order), product_variants(id, product_id, sku, size, price, sale_price, stock, sort_order)";

export async function fetchCollections(): Promise<Collection[]> {
  const { data, error } = await supabase
    .from("collections")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Collection[];
}

export async function fetchCollectionsByProductId(
  productId: string,
): Promise<Collection[]> {
  const { data, error } = await supabase
    .from("collection_products")
    .select("collection:collections(*)")
    .eq("product_id", productId)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return ((data ?? []) as Array<{ collection: Collection | null }>)
    .map((r) => r.collection)
    .filter((c): c is Collection => !!c);
}

export async function fetchCollectionBySlug(
  slug: string,
): Promise<CollectionWithProducts | null> {
  const { data: collection, error } = await supabase
    .from("collections")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  if (!collection) return null;

  const { data: links, error: linkErr } = await supabase
    .from("collection_products")
    .select(`sort_order, product:products(${PRODUCT_SELECT})`)
    .eq("collection_id", collection.id)
    .order("sort_order", { ascending: true });
  if (linkErr) throw linkErr;

  const products = ((links ?? []) as Array<{ product: Product | null }>)
    .map((l) => l.product)
    .filter((p): p is Product => !!p);

  return { ...(collection as Collection), products };
}
