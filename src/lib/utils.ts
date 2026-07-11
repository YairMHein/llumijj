import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CATEGORY_PHOTOS_BASE_URL =
  "https://xrdftgbksibdcpyeehjw.supabase.co/storage/v1/object/public/category/";
const PRODUCT_PHOTOS_BASE_URL =
  "https://xrdftgbksibdcpyeehjw.supabase.co/storage/v1/object/public/product-photos/";
const COLLECTION_PHOTOS_BASE_URL =
  "https://xrdftgbksibdcpyeehjw.supabase.co/storage/v1/object/public/collection-photos/";

export function getProductImageUrl(
  slug: string | null | undefined,
  filename: string | null | undefined
) {
  if (!filename) return "";
  if (filename.startsWith("http")) return filename; // legacy full-URL rows
  return `${PRODUCT_PHOTOS_BASE_URL}${slug}/${filename}`;
}

export function getCollectionImageUrl(filename: string | null | undefined) {
  if (!filename) return "";
  if (filename.startsWith("http")) return filename; // legacy full-URL rows
  return `${COLLECTION_PHOTOS_BASE_URL}${filename}`;
}

export function getCategoryImageUrl(filename: string | null | undefined) {
  if (!filename) return "";
  if (filename.startsWith("http")) return filename; // legacy full-URL rows
  return `${CATEGORY_PHOTOS_BASE_URL}${filename}`;
}

type CategorySlug = "earrings" | "necklaces" | "rings" | "bracelets";

export const CATEGORY_IMAGE_FILENAMES: Record<CategorySlug, string> = {
  earrings: "earrings.jpg",
  necklaces: "necklaces.jpg", // singular in storage
  rings: "rings.jpg",
  bracelets: "bracelets.jpg",
};