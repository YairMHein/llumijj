import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts, primaryPhotoUrl } from "@/lib/products";
import packagingBags from "@/assets/packaging-bags.png";
import lifetimeCare from "@/assets/lifetime-care.jpg";
import tradeIn from "@/assets/trade-in.jpg";
import heroVideo from "@/assets/hero-video.mp4";
import heroPoster from "@/assets/hero-model.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import { resolveProductImage } from "@/lib/product-images";
import { getCategoryImageUrl, CATEGORY_IMAGE_FILENAMES } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "LLUMI Jewellery — Wear your story" },
      { name: "description", content: "Heirloom-quality 925 silver earrings, necklaces, and rings, finished by hand and delivered in our signature pistachio atelier box." },
    ],
  }),
});

function HomePage() {
  const { data: featured = [] } = useQuery({
    queryKey: ["products", "featured"],
    queryFn: () => fetchProducts({ featured: true }),
  });

  const categories = [
    { slug: "earrings", label: "Earrings", desc: "Quiet hoops, brave studs." },
    { slug: "necklaces", label: "Necklaces", desc: "Layer your phases." },
    { slug: "rings", label: "Rings", desc: "Stories on your hand." },
    { slug: "bracelets", label: "Bracelets", desc: "Hold the moment." },
  ];

  return (
    <Layout>
      {/* Hero video */}
      <section className="relative h-[78vh] min-h-[520px] w-full overflow-hidden bg-foreground md:h-[88vh]">
        <video
          src={heroVideo}
          poster={heroPoster}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/45" />
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center text-background">
          <h1 className="font-serif text-2xl leading-none tracking-[0.4em] md:text-4xl">
            WEAR YOUR STORY
          </h1>
          <Link
            to="/shop"
            className="group mt-5 inline-flex items-center gap-3 border-b border-background/70 pb-1 text-[11px] tracking-luxe text-background/90 transition-colors hover:border-background hover:text-background"
          >
            Explore All
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-3xl md:text-4xl">Shop by category</h2>
          <Link to="/shop" className="text-[11px] tracking-luxe text-muted-foreground hover:text-foreground">View all →</Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.slug} to="/shop" search={{ category: c.slug }} className="group block">
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <CategoryCover category={c.slug as "earrings" | "necklaces" | "rings" | "bracelets"} />
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <h3 className="font-serif text-xl">{c.label}</h3>
                <span className="text-[11px] tracking-luxe text-muted-foreground group-hover:text-foreground">Shop →</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <h2 className="font-serif text-3xl md:text-4xl">Featured pieces</h2>
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {featured.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Packaging */}
      <section className="bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:px-8">
          <div>
            <p className="text-[11px] tracking-luxe text-background/60">Packaging</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">A small ceremony.</h2>
            <p className="mt-5 max-w-md text-background/75">
              Every LLUMI piece arrives in our signature pistachio atelier box,
              hand-stamped with the LLUMI mark. Inside, a soft velvet pouch cradles
              your piece — designed for the moment of opening.
            </p>
            <ul className="mt-8 space-y-2 text-sm text-background/75">
              <li>· Hand-finished pistachio gift box</li>
              <li>· Embossed LLUMI wordmark</li>
              <li>· Soft velvet pouch & care card included</li>
            </ul>
          </div>
          <div className="grid gap-4">
            {/*<img src={packagingMockup} alt="LLUMI packaging box designs" className="w-full object-cover" loading="lazy" />*/}
            <img src={packagingBags} alt="LLUMI shopping bags and drawer boxes" className="w-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Gallery — worn on the wall */}
      <section style={{ backgroundColor: "#930f31", color: "#FFF9ee" }} className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] tracking-luxe" style={{ color: "#FFF9ee", opacity: 0.8 }}>Gallery</p>
              <h2 className="mt-3 font-serif text-4xl md:text-5xl" style={{ color: "#FFF9ee" }}>Jewellery is more than decoration.</h2>
            </div>
            <Link to="/shop" className="hidden text-[11px] tracking-luxe md:inline" style={{ color: "#FFF9ee" }}>
              Shop the looks →
            </Link>
          </div>

          <div className="relative mt-14 h-px w-full bg-background/40" aria-hidden />
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {[
              { src: gallery1, label: "Layered gold", tilt: "-rotate-2" },
              { src: gallery2, label: "Chandelier silver", tilt: "rotate-2" },
              { src: gallery3, label: "Stacked rings", tilt: "-rotate-1" },
              { src: gallery4, label: "Tennis bracelet", tilt: "rotate-1" },
            ].map((g, i) => (
              <figure key={g.label} className={`relative ${i % 2 === 0 ? "mt-8" : "mt-14"} ${g.tilt} transition-transform duration-500 hover:rotate-0 hover:-translate-y-2`}>
                <span aria-hidden className="absolute left-1/2 -top-6 h-6 w-px -translate-x-1/2 bg-background/50" />
                <span aria-hidden className="absolute left-1/2 -top-7 block h-2 w-2 -translate-x-1/2 rounded-full bg-background" />
                <div className="overflow-hidden bg-background/10 shadow-2xl ring-1 ring-background/30">
                  {i === 0 ? (
                    <video src={heroVideo} poster={g.src} autoPlay muted loop playsInline className="aspect-[4/5] w-full object-cover" />
                  ) : (
                    <img src={g.src} alt={g.label} loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full object-cover" />
                  )}
                </div>
                <figcaption className="mt-3 text-center text-[10px] tracking-luxe text-background/80">{g.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
          {[
            { n: "5+", label: "Trusted suppliers" },
            { n: "12k+", label: "Pieces delivered" },
            { n: "98%", label: "Happy customers" },
            { n: "24h", label: "Order processing" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-serif text-5xl md:text-6xl">{s.n}</div>
              <p className="mt-2 text-[11px] tracking-luxe text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Care & trade-in */}
      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="max-w-xl">
            <p className="text-[11px] tracking-luxe text-muted-foreground">Owned for life</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Cared for, always.</h2>
            <p className="mt-4 text-muted-foreground">
              Every piece purchased from LLUMI is covered by complimentary lifetime polishing and
              eligible for our trade-in program — so your jewellery grows with you.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <article className="group overflow-hidden border border-border bg-background">
              <div className="aspect-[5/3] overflow-hidden">
                <img src={lifetimeCare} alt="Polishing service" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl">Lifetime warranty & care</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We polish, re-plate and refresh every LLUMI piece — free, for life.
                </p>
                <Link to="/lifetime-care" className="mt-4 inline-flex items-center gap-2 text-[11px] tracking-luxe hover:text-foreground">
                  Read more <span aria-hidden>→</span>
                </Link>
              </div>
            </article>
            <article className="group overflow-hidden border border-border bg-background">
              <div className="aspect-[5/3] overflow-hidden">
                <img src={tradeIn} alt="Trade-in program" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl">Trade-in program</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Eligible pieces can be traded toward something new — up to 40% off your next piece.
                </p>
                <Link to="/trade-in" className="mt-4 inline-flex items-center gap-2 text-[11px] tracking-luxe hover:text-foreground">
                  Read more <span aria-hidden>→</span>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function CategoryCover({ category }: { category: "earrings" | "necklaces" | "rings" | "bracelets" }) {
  const src = getCategoryImageUrl(CATEGORY_IMAGE_FILENAMES[category]);
  return (
    <img
      src={src}
      alt={category}
      loading="lazy"
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      width={1024}
      height={1280}
    />
  );
}
