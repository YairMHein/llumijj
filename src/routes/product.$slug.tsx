import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { fetchProductBySlug, fetchProducts } from "@/lib/products";
import { resolveProductImage, resolveWornImage } from "@/lib/product-images";
import { useCart, formatMoney } from "@/lib/cart";
import packaging from "@/assets/packaging.jpg";
import packagingOpen from "@/assets/packaging-open.jpg";
import lifestyle from "@/assets/lifetime-care.jpg";
import gallery from "@/assets/gallery-1.jpg";

export const Route = createFileRoute("/product/$slug")({
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [activeIdx, setActiveIdx] = useState(0);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchProductBySlug(slug),
  });

  const { data: related = [] } = useQuery({
    queryKey: ["related", product?.metal, product?.id],
    queryFn: () => fetchProducts({}),
    enabled: !!product,
  });

  const gallerySrcs = useMemo(() => {
    if (!product) return [] as string[];
    return [
      resolveProductImage(product.image_url),
      resolveWornImage(product.category),
      gallery,
      lifestyle,
      packaging,
      packagingOpen,
    ];
  }, [product]);

  const suggested = useMemo(() => {
    if (!product) return [];
    return related
      .filter((p) => p.id !== product.id && (product.metal ? p.metal === product.metal : p.category === product.category))
      .slice(0, 4);
  }, [related, product]);

  if (isLoading) return <Layout><div className="mx-auto max-w-7xl px-8 py-24 text-sm text-muted-foreground">Loading…</div></Layout>;
  if (!product) return <Layout><div className="mx-auto max-w-7xl px-8 py-24"><p>Not found.</p><Link to="/shop" className="underline">Back to shop</Link></div></Layout>;

  const onSale = product.sale_price != null;
  const price = onSale ? Number(product.sale_price) : Number(product.price);

  return (
    <Layout>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.2fr_1fr] md:px-8">
        {/* Gallery */}
        <div className="flex gap-4">
          <div className="hidden flex-col gap-3 md:flex">
            {gallerySrcs.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`block h-20 w-20 shrink-0 overflow-hidden border ${i === activeIdx ? "border-foreground" : "border-border opacity-70 hover:opacity-100"}`}
                aria-label={`View image ${i + 1}`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1 bg-muted">
            <img src={gallerySrcs[activeIdx]} alt={product.name} width={1024} height={1280} className="h-full max-h-[720px] w-full object-cover" />
          </div>
        </div>

        <div className="md:pl-4">
          <p className="text-[11px] tracking-luxe text-muted-foreground">{product.category}</p>
          <h1 className="mt-3 font-serif text-5xl">{product.name}</h1>
          <div className="mt-4 flex items-baseline gap-3 text-lg">
            {onSale && <span className="text-muted-foreground line-through">{formatMoney(Number(product.price))}</span>}
            <span className="font-medium">{formatMoney(price)}</span>
            {onSale && <span className="bg-sale px-2 py-0.5 text-[10px] tracking-luxe text-sale-foreground">Sale</span>}
          </div>
          <p className="mt-2 text-xs tracking-luxe text-muted-foreground">{product.material}</p>
          <p className="mt-6 max-w-md text-muted-foreground">{product.description}</p>

          <div className="mt-8 flex items-center gap-4">
            <div className="inline-flex items-center border border-border">
              <button className="h-10 w-10 text-lg" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">−</button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button className="h-10 w-10 text-lg" onClick={() => setQty((q) => q + 1)} aria-label="Increase">+</button>
            </div>
            <button
              onClick={() => {
                add({ id: product.id, slug: product.slug, name: product.name, price, image_url: product.image_url }, qty);
                toast.success("Added to bag");
              }}
              className="flex-1 bg-foreground py-3 text-[11px] tracking-luxe text-background hover:opacity-90"
            >
              Add to bag
            </button>
          </div>

          <ul className="mt-10 space-y-3 border-t border-border pt-6 text-sm text-muted-foreground">
            <li>• Preorder — pay only a 30% deposit at checkout</li>
            <li>• Free pickup at our atelier, or home delivery available</li>
            <li>• Arrives in our signature pistachio atelier box</li>
          </ul>

          {/* Mobile thumbnail strip */}
          <div className="mt-8 flex gap-2 overflow-x-auto md:hidden">
            {gallerySrcs.map((src, i) => (
              <button key={i} onClick={() => setActiveIdx(i)} className={`h-16 w-16 shrink-0 overflow-hidden border ${i === activeIdx ? "border-foreground" : "border-border opacity-70"}`}>
                <img src={src} alt="" className="h-full w-full object-cover" />
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
