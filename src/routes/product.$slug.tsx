import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { fetchProductBySlug, fetchProducts, sortedPhotos, sortedVariants, variantPrice } from "@/lib/products";
import { fetchCollectionsByProductId } from "@/lib/collections";
import { useCart, formatMoney } from "@/lib/cart";

export const Route = createFileRoute("/product/$slug")({
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);


  const { data: product, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchProductBySlug(slug),
  });

  const { data: related = [] } = useQuery({
    queryKey: ["related", product?.metal, product?.id],
    queryFn: () => fetchProducts({}),
    enabled: !!product,
  });

  const { data: productCollections = [] } = useQuery({
    queryKey: ["product-collections", product?.id],
    queryFn: () => fetchCollectionsByProductId(product!.id),
    enabled: !!product,
  });

  const gallerySrcs = useMemo(() => {
    if (!product) return [] as Array<{ url: string; type: "image" | "video" }>;
    const dbPhotos = sortedPhotos(product).map((p) => ({
      url: p.image_url,
      type: (p.media_type === "video" ? "video" : "image") as "image" | "video",
    }));
    if (dbPhotos.length > 0) return dbPhotos;
    return [];
  }, [product]);

  const suggested = useMemo(() => {
    if (!product) return [];
    return related
      .filter((p) => p.id !== product.id && (product.metal ? p.metal === product.metal : p.category === product.category))
      .slice(0, 4);
  }, [related, product]);

  const specs = useMemo(() => {
  if (!product) return [] as Array<{ label: string; value: string }>;

  return [
    { label: "Metal", value: product.metal },
    { label: "Plating", value: product.plating },
    { label: "Size", value: product.size },
    { label: "Weight", value: product.weight },
    { label: "Stone", value: product.stone },
  ].filter((s): s is { label: string; value: string } => !!s.value);
}, [product]);

  if (isLoading) return <Layout><div className="mx-auto max-w-7xl px-8 py-24 text-sm text-muted-foreground">Loading…</div></Layout>;
  if (!product) return <Layout><div className="mx-auto max-w-7xl px-8 py-24"><p>Not found.</p><Link to="/shop" className="underline">Back to shop</Link></div></Layout>;

  const variants = sortedVariants(product);
  const selectedVariant = variants.find((v) => v.id === selectedVariantId) ?? null;
  const onSale = selectedVariant
    ? selectedVariant.sale_price != null
    : product.sale_price != null;
  const basePrice = selectedVariant
    ? Number(selectedVariant.price)
    : Number(product.price);
  const price = selectedVariant
    ? variantPrice(selectedVariant)
    : onSale
    ? Number(product.sale_price)
    : Number(product.price);
  const displaySku = selectedVariant?.sku ?? product.sku ?? null;


  return (
    <Layout>
      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-[1fr_1fr] md:px-8">
        {/* Gallery */}
        <div className="flex gap-3">
          <div className="hidden flex-col gap-2 md:flex">
            {gallerySrcs.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`relative block h-14 w-14 shrink-0 overflow-hidden border ${i === activeIdx ? "border-foreground" : "border-border opacity-70 hover:opacity-100"}`}
                aria-label={`View media ${i + 1}`}
              >
                {src.type === "video" ? (
                  <>
                    <video src={src.url} muted playsInline preload="metadata" className="h-full w-full object-cover" />
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20 text-[10px] text-white">▶</span>
                  </>
                ) : (
                  <img src={src.url} alt="" className="h-full w-full object-cover" />
                )}
              </button>
            ))}
          </div>
          <div className="flex-1 bg-muted">
            {gallerySrcs[activeIdx]?.type === "video" ? (
              <video
                key={gallerySrcs[activeIdx].url}
                src={gallerySrcs[activeIdx].url}
                controls
                autoPlay
                playsInline
                className="aspect-[4/5] max-h-[520px] w-full bg-black object-contain"
              />
            ) : (
              <img
                src={gallerySrcs[activeIdx]?.url}
                alt={product.name}
                width={800}
                height={1000}
                className="aspect-[4/5] max-h-[520px] w-full object-cover"
              />
            )}
          </div>
        </div>

        <div className="md:pl-4">
          <p className="text-[11px] tracking-luxe text-muted-foreground">{product.category}</p>
          <h1 className="mt-3 font-serif text-5xl">{product.name}</h1>
          <div className="mt-4 flex items-baseline gap-3 text-lg">
            {onSale && <span className="text-muted-foreground line-through">{formatMoney(basePrice)}</span>}
            <span className="font-medium">{formatMoney(price)}</span>
            {onSale && <span className="bg-sale px-2 py-0.5 text-[10px] tracking-luxe text-sale-foreground">Sale</span>}
          </div>
          <p className="mt-2 text-xs tracking-luxe text-muted-foreground">{product.material}</p>
          {displaySku && (
            <p className="mt-1 text-[11px] tracking-luxe text-muted-foreground">SKU · {displaySku}</p>
          )}
          <p className="mt-6 max-w-md text-muted-foreground">{product.description}</p>

          {productCollections.length > 0 && (
            <div className="mt-4">
              <p className="text-[11px] tracking-luxe text-muted-foreground">
                Part of{" "}
                {productCollections.map((c, i) => (
                  <span key={c.id}>
                    <Link
                      to="/collection/$slug"
                      params={{ slug: c.slug }}
                      className="underline hover:text-foreground"
                    >
                      {c.name}
                    </Link>
                    {i < productCollections.length - 1
                      ? i === productCollections.length - 2
                        ? " and "
                        : ", "
                      : ""}
                  </span>
                ))}
              </p>
            </div>
          )}

          {variants.length > 0 && (
            <div className="mt-8">
              <p className="text-[11px] tracking-luxe text-muted-foreground">Size</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {variants.map((v) => {
                  const active = v.id === selectedVariantId;
                  const oos = v.stock != null && v.stock <= 0;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      disabled={oos}
                      onClick={() => setSelectedVariantId(active ? null : v.id)}
                      className={`min-w-[3rem] border px-3 py-2 text-[11px] tracking-luxe transition-colors ${
                        active
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-foreground hover:border-foreground"
                      } ${oos ? "opacity-40 line-through" : ""}`}
                    >
                      {v.size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center gap-4">
            <div className="inline-flex items-center border border-border">
              <button className="h-10 w-10 text-lg" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">−</button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button className="h-10 w-10 text-lg" onClick={() => setQty((q) => q + 1)} aria-label="Increase">+</button>
            </div>
            <button
              onClick={() => {
                if (variants.length > 0 && !selectedVariant) {
                  toast.error("Please select a size");
                  return;
                }
                add(
                  {
                    id: product.id,
                    slug: product.slug,
                    name: product.name,
                    price,
                    image_url: product.image_url,
                    variant_id: selectedVariant?.id ?? null,
                    variant_size: selectedVariant?.size ?? null,
                    sku: selectedVariant?.sku ?? product.sku ?? null,
                  },
                  qty,
                );
                toast.success("Added to bag");
              }}
              className="flex-1 bg-foreground py-3 text-[11px] tracking-luxe text-background hover:opacity-90"
            >
              Add to bag
            </button>

          </div>

          {/* Specifications */}
          <div className="mt-10 border-t border-border pt-6">
            <p className="text-[11px] tracking-luxe text-muted-foreground">Specifications</p>
            <dl className="mt-4 divide-y divide-border">
              {specs.map((s) => (
                <div key={s.label} className="grid grid-cols-[120px_1fr] gap-4 py-3 text-sm">
                  <dt className="tracking-luxe text-[11px] uppercase text-muted-foreground">{s.label}</dt>
                  <dd className="text-foreground">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          
          <ul className="mt-10 space-y-3 border-t border-border pt-6 text-sm text-muted-foreground">
            <li>• Preorder — pay only a 50% deposit at checkout</li>
            <li>• Free pickup at our atelier, or home delivery available</li>
            <li>• Arrives in our signature LLUMI's atelier box</li>
          </ul>
          {/* Mobile thumbnail strip */}
          <div className="mt-8 flex gap-2 overflow-x-auto md:hidden">
            {gallerySrcs.map((src, i) => (
              <button key={i} onClick={() => setActiveIdx(i)} className={`h-16 w-16 shrink-0 overflow-hidden border ${i === activeIdx ? "border-foreground" : "border-border opacity-70"}`}>
                {src.type === "video" ? (
                  <video src={src.url} muted playsInline preload="metadata" className="h-full w-full object-cover" />
                ) : (
                  <img src={src.url} alt="" className="h-full w-full object-cover" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Suggested */}
      {suggested.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-[11px] tracking-luxe text-muted-foreground">You may also love</p>
              <h2 className="mt-2 font-serif text-3xl md:text-4xl">More in {product.metal ?? product.category}</h2>
            </div>
            <Link to="/shop" className="text-[11px] tracking-luxe text-foreground/70 hover:text-foreground">View all →</Link>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
            {suggested.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </Layout>
  );
}
