import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts, type Product } from "@/lib/products";
import shopHero1 from "@/assets/shop-hero-1.jpg";
import shopHero2 from "@/assets/shop-hero-2.jpg";

type Search = { category?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    category: typeof s.category === "string" ? s.category : undefined,
  }),
  component: ShopPage,
  head: () => ({
    meta: [
      { title: "Shop — LLUMI Jewellery" },
      { name: "description", content: "Browse LLUMI's earrings, necklaces, rings, and bracelets." },
    ],
  }),
});

const tabs = [
  { key: undefined, label: "All" },
  { key: "earrings", label: "Earrings" },
  { key: "necklaces", label: "Necklaces" },
  { key: "rings", label: "Rings" },
  { key: "bracelets", label: "Bracelets" },
] as const;

const features = ["Sale", "New", "Best Seller"] as const;
const metals = ["Silver", "Gold", "Blue"] as const;
type Sort = "featured" | "best-selling" | "price-asc" | "date-desc";

// Prices are stored in MMK.
const MIN_MMK = 0;
const MAX_MMK = 5000000;
const PAGE = 8;
const fmtMMK = (n: number) => `${new Intl.NumberFormat("en-US").format(n)} MMK`;

function ShopPage() {
  const { category } = Route.useSearch();
  const { data = [], isLoading } = useQuery({
    queryKey: ["products", "shop", category],
    queryFn: () => fetchProducts({ category }),
  });

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedMetals, setSelectedMetals] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(MIN_MMK);
  const [maxPrice, setMaxPrice] = useState(MAX_MMK);
  const [sort, setSort] = useState<Sort>("featured");
  const [visible, setVisible] = useState(PAGE);
  const sentinel = useRef<HTMLDivElement>(null);

  const toggle = (list: string[], setter: (v: string[]) => void, v: string) =>
    setter(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const filtered = useMemo(() => {
    let out = data.slice();
    if (selectedFeatures.length) {
      out = out.filter((p) => {
        if (selectedFeatures.includes("Sale") && p.sale_price != null) return true;
        if (selectedFeatures.includes("New") && p.is_new) return true;
        if (selectedFeatures.includes("Best Seller") && p.is_best_seller) return true;
        return false;
      });
    }
    if (selectedMetals.length) {
      out = out.filter((p) => p.metal && selectedMetals.includes(p.metal));
    }
    out = out.filter((p) => {
      const mmk = Number(p.sale_price ?? p.price);
      return mmk >= minPrice && mmk <= maxPrice;
    });
    const cmpPrice = (a: Product, b: Product) => Number(a.sale_price ?? a.price) - Number(b.sale_price ?? b.price);
    if (sort === "price-asc") out.sort(cmpPrice);
    else if (sort === "best-selling") out.sort((a, b) => Number(!!b.is_best_seller) - Number(!!a.is_best_seller));
    else if (sort === "featured") out.sort((a, b) => Number(!!b.is_featured) - Number(!!a.is_featured));
    return out;
  }, [data, selectedFeatures, selectedMetals, minPrice, maxPrice, sort]);

  useEffect(() => { setVisible(PAGE); }, [category, selectedFeatures, selectedMetals, minPrice, maxPrice, sort]);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setVisible((v) => Math.min(v + PAGE, filtered.length));
    }, { rootMargin: "400px" });
    io.observe(el);
    return () => io.disconnect();
  }, [filtered.length]);

  const shown = filtered.slice(0, visible);

  return (
    <Layout>
      {/* Hero banner */}
      <section className="relative isolate overflow-hidden">
        <div className="grid h-[42vh] min-h-[320px] grid-cols-2 gap-0">
          <img src={shopHero1} alt="" width={1280} height={800} className="h-full w-full object-cover" />
          <img src={shopHero2} alt="" width={1280} height={800} className="h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="pointer-events-none absolute inset-0 grid place-items-center bg-foreground/10">
          <h1 className="font-serif text-4xl text-background drop-shadow md:text-6xl">Shine in your own story</h1>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-10 md:px-8">
        {/* Toolbar: filters toggle on left, categories center, sort on right */}
        <div className="mb-6 grid grid-cols-1 items-center gap-4 md:grid-cols-[auto_1fr_auto]">
          <button
            onClick={() => setFiltersOpen((o) => !o)}
            className="inline-flex w-fit items-center gap-2 border border-border bg-background px-3 py-2 text-[11px] tracking-luxe text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            {filtersOpen ? <X className="h-3.5 w-3.5" /> : <SlidersHorizontal className="h-3.5 w-3.5" />}
            {filtersOpen ? "Hide filters" : "Filters"}
          </button>

          <div className="flex flex-wrap justify-start gap-1 md:justify-center">
            {tabs.map((t) => {
              const active = category === t.key;
              return (
                <Link
                  key={t.label}
                  to="/shop"
                  search={t.key ? { category: t.key } : {}}
                  className={`px-3 py-1.5 text-[11px] tracking-luxe transition-colors ${active ? "bg-foreground text-background" : "text-foreground/70 hover:text-foreground"}`}
                >
                  {t.label}
                </Link>
              );
            })}
          </div>

          <label className="inline-flex w-fit items-center gap-2 justify-self-start text-[11px] tracking-luxe text-muted-foreground md:justify-self-end">
            Sort by
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="border border-border bg-background px-2 py-1.5 text-[11px] tracking-luxe text-foreground focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="best-selling">Best selling</option>
              <option value="price-asc">Price: low to high</option>
              <option value="date-desc">Date: new to old</option>
            </select>
          </label>
        </div>

        <div className="flex gap-8">
          {/* Filters */}
          <aside
            className={`shrink-0 overflow-hidden transition-[width,opacity] duration-300 ease-out ${
              filtersOpen ? "w-64 opacity-100" : "w-0 opacity-0"
            }`}
          >
            <div className="w-64 space-y-2 pr-2">
              <Accordion title="Feature">
                {features.map((f) => (
                  <Check key={f} label={f} checked={selectedFeatures.includes(f)} onChange={() => toggle(selectedFeatures, setSelectedFeatures, f)} />
                ))}
              </Accordion>
              <Accordion title="Metal">
                {metals.map((m) => (
                  <Check key={m} label={m} checked={selectedMetals.includes(m)} onChange={() => toggle(selectedMetals, setSelectedMetals, m)} />
                ))}
              </Accordion>
              <Accordion title="Price">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="number" min={MIN_MMK} max={MAX_MMK} step={5000} value={minPrice}
                      onChange={(e) => setMinPrice(Math.max(MIN_MMK, Math.min(Number(e.target.value), maxPrice)))}
                      className="w-full border border-border bg-background px-2 py-1.5 text-xs"
                      aria-label="Min price"
                    />
                    <span className="text-muted-foreground">–</span>
                    <input
                      type="number" min={MIN_MMK} max={MAX_MMK} step={5000} value={maxPrice}
                      onChange={(e) => setMaxPrice(Math.min(MAX_MMK, Math.max(Number(e.target.value), minPrice)))}
                      className="w-full border border-border bg-background px-2 py-1.5 text-xs"
                      aria-label="Max price"
                    />
                  </div>
                  <div className="relative h-5">
                    <input
                      type="range" min={MIN_MMK} max={MAX_MMK} step={5000} value={minPrice}
                      onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice))}
                      className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full accent-foreground"
                    />
                    <input
                      type="range" min={MIN_MMK} max={MAX_MMK} step={5000} value={maxPrice}
                      onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice))}
                      className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full accent-foreground"
                    />
                  </div>
                  <p className="text-[10px] tracking-luxe text-muted-foreground">
                    {fmtMMK(minPrice)} — {fmtMMK(maxPrice)}
                  </p>
                </div>
              </Accordion>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading…</p>
            ) : filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground">No pieces match those filters.</p>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
                  {shown.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
                <div ref={sentinel} className="h-12" />
                {visible < filtered.length && (
                  <p className="py-6 text-center text-[11px] tracking-luxe text-muted-foreground">Loading more…</p>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-3 text-[11px] tracking-luxe text-foreground"
      >
        {title}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pb-3">{children}</div>
        </div>
      </div>
    </div>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-1 text-xs text-foreground/80 hover:text-foreground">
      <span className="relative inline-grid h-3.5 w-3.5 place-items-center border border-border bg-background">
        <input type="checkbox" checked={checked} onChange={onChange} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
        {checked && <span className="block h-1.5 w-1.5 bg-foreground" />}
      </span>
      {label}
    </label>
  );
}
