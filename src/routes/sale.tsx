import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts } from "@/lib/products";

export const Route = createFileRoute("/sale")({
  component: SalePage,
  head: () => ({
    meta: [
      { title: "Sale — LLUMI Jewellery" },
      { name: "description", content: "Limited-time pieces on sale at LLUMI." },
    ],
  }),
});

function SalePage() {
  const { data = [] } = useQuery({ queryKey: ["products", "sale"], queryFn: () => fetchProducts({ onSale: true }) });
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <p className="text-[11px] tracking-luxe text-muted-foreground">Sale</p>
        <h1 className="mt-3 font-serif text-5xl md:text-6xl">A handful, less.</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">A small edit of pieces at a softer price. While they last.</p>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {data.map((p) => <ProductCard key={p.id} product={p} />)}
          {data.length === 0 && <p className="text-sm text-center text-muted-foreground">Coming Soon. Stay Tuned.</p>}
        </div>
      </section>
    </Layout>
  );
}
