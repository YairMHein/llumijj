import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Search as SearchIcon, X } from "lucide-react";
import { fetchProducts, type Product } from "@/lib/products";
import { resolveProductImage } from "@/lib/product-images";
import { formatMoney } from "@/lib/cart";

const CATEGORY_ALIASES: Record<string, Product["category"]> = {
  ring: "rings", rings: "rings",
  necklace: "necklaces", necklaces: "necklaces",
  earring: "earrings", earrings: "earrings",
  bracelet: "bracelets", bracelets: "bracelets",
};

export function SearchPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { data = [] } = useQuery({ queryKey: ["products", "all"], queryFn: () => fetchProducts(), enabled: open });

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    const cat = CATEGORY_ALIASES[term];
    return data
      .filter((p) => {
        const hay = `${p.name} ${p.material ?? ""} ${p.category}`.toLowerCase();
        return cat ? p.category === cat : hay.includes(term);
      })
      .slice(0, 8);
  }, [q, data]);

  if (!open) return null;

  return (
    <div className="absolute inset-x-0 top-full z-[70] animate-slide-down border-t border-border bg-background shadow-lg">
      <div className="mx-auto max-w-3xl px-5 py-6 md:px-8">
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <SearchIcon className="h-5 w-5 text-muted-foreground" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search Rings, Necklaces, Crystal, Vintage…"
            className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground/60"
          />
          <button onClick={onClose} aria-label="Close search" className="inline-flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 max-h-[60vh] overflow-y-auto">
          {q.trim() === "" ? (
            <div className="text-[11px] tracking-luxe text-muted-foreground">
              Try “Rings”, “Necklace”, “Crystal”, or “Vintage”.
            </div>
          ) : results.length === 0 ? (
            <p className="text-sm text-muted-foreground">No matches for “{q}”.</p>
          ) : (
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    to="/product/$slug"
                    params={{ slug: p.slug }}
                    onClick={onClose}
                    className="flex items-center gap-3 border border-transparent p-2 hover:border-border"
                  >
                    <img src={resolveProductImage(p.image_url)} alt="" className="h-14 w-14 flex-none object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-serif text-base">{p.name}</p>
                      <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">{p.category}</p>
                    </div>
                    <span className="text-xs">{formatMoney(Number(p.sale_price ?? p.price))}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
