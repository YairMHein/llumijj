import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts } from "@/lib/products";

export const Route = createFileRoute("/best-sellers")({
  component: BestSellersPage,
  head: () => ({
    meta: [
      { title: "Best Sellers — LLUMI Jewellery" },
      { name: "description", content: "The most-loved pieces at LLUMI." },
    ],
  }),
});

function BestSellersPage() {
  const { data = [] } = useQuery({
    queryKey: ["products", "best-sellers"],
    queryFn: () => fetchProducts({ isBestSeller: true }),
  });
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <p className="text-[11px] tracking-luxe text-muted-foreground">Best Sellers</p>
        <h1 className="mt-3 font-serif text-5xl md:text-6xl">Loved most.</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">The pieces our community keeps coming back to.</p>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {data.map((p) => <ProductCard key={p.id} product={p} hideBadge />)}
          {data.length === 0 && <p className="text-sm text-muted-foreground">No best sellers yet.</p>}
        </div>
      </section>
    </Layout>
  );
}
