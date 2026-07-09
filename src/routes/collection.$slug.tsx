import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { fetchCollectionBySlug } from "@/lib/collections";

export const Route = createFileRoute("/collection/$slug")({
  component: CollectionDetailPage,
  head: ({ params }) => ({
    meta: [
      { title: `${titleCase(params.slug)} — LLUMI Collection` },
      { name: "description", content: `Explore the ${titleCase(params.slug)} collection at LLUMI.` },
    ],
  }),
});

function titleCase(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

function CollectionDetailPage() {
  const { slug } = Route.useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["collection", slug],
    queryFn: () => fetchCollectionBySlug(slug),
  });

  if (isLoading) {
    return (
      <Layout>
        <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <p className="text-sm text-muted-foreground">Loading…</p>
        </section>
      </Layout>
    );
  }

  if (isError || !data) {
    return (
      <Layout>
        <section className="mx-auto max-w-7xl px-5 py-20 text-center md:px-8">
          <h1 className="font-serif text-3xl">Collection not found</h1>
          <Link to="/collections" className="mt-6 inline-block text-[11px] tracking-luxe underline">
            Back to collections
          </Link>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="relative isolate overflow-hidden">
        <div className="relative h-[42vh] min-h-[300px] w-full">
          {data.image_url && (
            <img src={data.image_url} alt="" className="h-full w-full object-cover" />
          )}
          <div className="absolute inset-0 grid place-items-center bg-foreground/25 px-6 text-center">
            <div>
              <p className="text-[11px] tracking-luxe text-background/80">Collection</p>
              <h1 className="mt-2 font-serif text-4xl text-background drop-shadow md:text-6xl">
                {data.name}
              </h1>
              {data.description && (
                <p className="mx-auto mt-3 max-w-xl text-sm text-background/90">{data.description}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        {data.products.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">No pieces in this collection yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {data.products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
        <div className="mt-12 text-center">
          <Link to="/collections" className="text-[11px] tracking-luxe underline">
            ← All collections
          </Link>
        </div>
      </section>
    </Layout>
  );
}
