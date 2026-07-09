import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";
import { fetchCollections } from "@/lib/collections";

export const Route = createFileRoute("/collections")({
  component: CollectionsPage,
  head: () => ({
    meta: [
      { title: "Collections — LLUMI Jewellery" },
      { name: "description", content: "Curated LLUMI collections — pearls, gold statement pieces, silver essentials." },
      { property: "og:title", content: "Collections — LLUMI Jewellery" },
      { property: "og:description", content: "Curated LLUMI collections — pearls, gold statement pieces, silver essentials." },
    ],
  }),
});

function CollectionsPage() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: fetchCollections,
  });

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <header className="mb-10 text-center">
          <p className="text-[11px] tracking-luxe text-muted-foreground">Curated</p>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl">Collections</h1>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
            Stories told in silver, gold, and pearl. Each collection is styled to wear together.
          </p>
        </header>

        {isLoading ? (
          <p className="text-center text-sm text-muted-foreground">Loading…</p>
        ) : data.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">No collections yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map((c) => (
              <Link
                key={c.id}
                to="/collection/$slug"
                params={{ slug: c.slug }}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  {c.image_url ? (
                    <img
                      src={c.image_url}
                      alt={c.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : null}
                </div>
                <div className="mt-4">
                  <h2 className="font-serif text-xl">{c.name}</h2>
                  {c.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
                  )}
                  <p className="mt-2 text-[11px] tracking-luxe text-foreground/70 transition-colors group-hover:text-foreground">
                    Explore →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
