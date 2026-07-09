import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts } from "@/lib/products";

export const Route = createFileRoute("/new-arrivals")({
  component: NewArrivalsPage,
  head: () => ({
    meta: [
      { title: "New Arrivals — LLUMI Jewellery" },
      { name: "description", content: "The latest pieces to land at LLUMI." },
    ],
  }),
});

function NewArrivalsPage() {
  const { data = [] } = useQuery({
    queryKey: ["products", "new-arrivals"],
    queryFn: () => fetchProducts({ isNew: true }),
  });
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <p className="text-[11px] tracking-luxe text-muted-foreground">New Arrivals</p>
        <h1 className="mt-3 font-serif text-5xl md:text-6xl">Just landed.</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">Our newest pieces, freshly added to the collection.</p>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {data.map((p) => <ProductCard key={p.id} product={p} hideBadge />)}
          {data.length === 0 && <p className="text-sm text-muted-foreground">No new arrivals right now.</p>}
        </div>
      </section>
    </Layout>
  );
}
