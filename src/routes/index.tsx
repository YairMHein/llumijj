import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts } from "@/lib/products";
import whySilver from "@/assets/why_silver.png";
import lifetimeCare from "@/assets/lifetime-care.jpg";
import tradeIn from "@/assets/trade-in.jpg";
import heroVideo from "@/assets/home-video.mp4";
import heroPoster from "@/assets/L.png";
import gallery1 from "@/assets/gallery-1.png";
import gallery2 from "@/assets/gallery-2.png";
import gallery3 from "@/assets/gallery-3.png";
import gallery4 from "@/assets/gallery-4.png";
import { getCategoryImageUrl, CATEGORY_IMAGE_FILENAMES } from "@/lib/utils";
import logo from "@/assets/llumi-bw-bbg.png";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "LLUMI Jewellery — Wear your story" },
      { name: "description", content: "Heirloom-quality 925 silver earrings, necklaces, and rings, finished by hand and delivered in our signature pistachio atelier box." },
    ],
  }),
});

const content = {
  en: {
    eyebrow: "Why LLUMI",
    title: "Cared for, always.",
    description: "Every piece purchased from LLUMI is covered by complimentary lifetime polishing and eligible for our trade-in program — so your jewellery grows with you.",
    label1:"Lifetime warranty & care",
    label2:"Trade-in program",
    label1desc:"We polish, re-plate and refresh every LLUMI piece — free, for life.",
    label2desc:"Eligible pieces can be traded toward something new — up to 40% off your next piece.",
  },
  my: {
    eyebrow: "ဘာကြောင့် LLUMI",
    title: "တစ်သက်တာစောင့်ရှောက်မှု။",
    description: "LLUMI-ယူမီ မှဝယ်ယူသည့်လက်ဝတ်ရတနာတိုင်းအတွက် တစ်သက်တာအခမဲ့ Polishတင်ပေးသည့် ဝန်ဆောင်မှုကိုပေးအပ်ထားပြီး၊ ၇၀%အထိပြန်လည်ရရှိနိုင်မယ့် အလဲအထပ်အစီအစဉ်လည်းပါဝင်တာကြောင့် သင်နဲ့အတူအမြဲတမ်းလှပခေတ်မှီတဲ့လက်ဝတ်ရတနာများအတူရှိနေမှာပါ",
    label1:"တစ်သက်တာအာမခံမှု",
    label2:"အလဲအထပ်အစီအစဉ်",
    label1desc:"LLUMI-ယူမီ မှ လက်ဝတ်ရတနာတိုင်းကို အခမဲ့ Polish၊ အရောင်တင်၊ ပြန်လည်ပြုပြင်ပေးပါသည်။",
    label2desc:"အလဲအထပ်အစီအစဉ်အတွက် အရည်အသွေးပြည့်မီသော လက်ဝတ်ရတနာများကို သင့်ရဲ့ နောက်ထပ်လက်ဝတ်ရတနာသို့ အလဲအထပ်ပြုလုပ်နိုင်ပြီး ၇၀% အထိ လျှော့စျေးရရှိနိုင်ပါသည်။",
  },
} as const;

const content_why_silver = {
  en: {
    eyebrow: "Why choose 925 silver?",
    title: "Jewelry is more than decoration—it's something you wear every day to express your style and story. Fashion jewelry may be affordable, but it often tarnishes quickly, loses its shine, and can break easily. On the other hand, fine jewelry made from solid gold or diamonds is a valuable investment, but its high price makes it less practical for everyday wear.",
    label1:"Timeless Beauty – A naturally elegant shine that never goes out of style.",
    label2:"Affordable Luxury – Enjoy the premium look and feel of fine jewelry without the premium price.",
    label3:"Lifetime Value – Sterling silver can be polished and restored, allowing it to look beautiful for years.",
    label1desc:"We polish, re-plate and refresh every LLUMI piece — free, for life.",
    label2desc:"Eligible pieces can be traded toward something new — up to 40% off your next piece.",
  },
  my: {
    eyebrow: "ဘာကြောင့် 925 Sterling Silver ကို ရွေးချယ်သင့်သလဲ?",
    title: "လက်ဝတ်ရတနာဆိုတာ အလှဆင်ဖို့တင်မဟုတ်ဘဲ ကိုယ့်ရဲ့စတိုင်နဲ့ ကိုယ်ပိုင်ဇာတ်လမ်းကို ဖော်ပြပေးတဲ့ အရာတစ်ခုပါ။ Fashion Jewelry တွေက ဈေးနှုန်းသက်သာပေမယ့် အရောင်လွယ်လွယ်မှိန်တတ်ပြီး ကျိုးပဲ့လွယ်ကာ ကြာရှည်အသုံးပြုဖို့ မသင့်တော်ပါဘူး။ အခြားတစ်ဖက်မှာတော့ ရွှေ၊ စိန်စတဲ့ Premium Jewelry တွေက အရည်အသွေးမြင့်ပေမယ့် နေ့စဉ်ဝတ်ဆင်ဖို့ ဈေးနှုန်းမြင့်မားတတ်ပါတယ်။",
    description: "LLUMI-ယူမီ မှဝယ်ယူသည့်လက်ဝတ်ရတနာတိုင်းအတွက် တစ်သက်တာအခမဲ့ Polishတင်ပေးသည့် ဝန်ဆောင်မှုကိုပေးအပ်ထားပြီး၊ ၇၀%အထိပြန်လည်ရရှိနိုင်မယ့် အလဲအထပ်အစီအစဉ်လည်းပါဝင်တာကြောင့် သင်နဲ့အတူအမြဲတမ်းလှပခေတ်မှီတဲ့လက်ဝတ်ရတနာများအတူရှိနေမှာပါ",
    label1:"နေ့စဉ်ဝတ်ဆင်နိုင်တယ် – လွယ်လွယ်မကျိုးပဲ့ဘဲ ကြာရှည်အသုံးပြုနိုင်ပါတယ်",
    label2:"Luxury ကို သင့်တင့်တဲ့ဈေးနှုန်းနဲ့ ရရှိခြင်း – ရွှေလက်ဝတ်ရတနာလို အရည်အသွေးမြင့်တဲ့ ခံစားမှုကို ပိုမိုသက်သာတဲ့ ဈေးနှုန်းနဲ့ ပိုင်ဆိုင်နိုင်ပါတယ်။",
    label3:"နှစ်ရှည်အသုံးပြုနိုင်ခြင်း – Sterling Silver တွေဟာ Professional Polishing ပြန်လုပ်နိုင်တာကြောင့် နှစ်ပေါင်းများစွာ လှပနေစေပါတယ်။",
    label1desc:"LLUMI-ယူမီ မှ လက်ဝတ်ရတနာတိုင်းကို အခမဲ့ Polish၊ အရောင်တင်၊ ပြန်လည်ပြုပြင်ပေးပါသည်။",
    label2desc:"အလဲအထပ်အစီအစဉ်အတွက် အရည်အသွေးပြည့်မီသော လက်ဝတ်ရတနာများကို သင့်ရဲ့ နောက်ထပ်လက်ဝတ်ရတနာသို့ အလဲအထပ်ပြုလုပ်နိုင်ပြီး ၇၀% အထိ လျှော့စျေးရရှိနိုင်ပါသည်။",
  },
} as const;

function HomePage() {
  const [lang, setLang] = useState<"en" | "my">("en");
  const t = content[lang];
  const t2 = content_why_silver[lang];

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
      <section style={{ backgroundColor: "#fff9ee", color: "#930f31" }} className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <h2 className="font-serif text-3xl md:text-4xl">Featured pieces</h2>
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {featured.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
        
      </section>

      {/* Packaging */}
      <section className="bg-foreground text-background">
  <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
    
    <div className="flex items-start justify-between gap-4 mb-8">
      <p className="text-[11px] tracking-luxe text-background/60">Why Silver</p>
      <LangToggle2 lang={lang} onChange={setLang} />
    </div>

    <div className="grid items-center gap-12 md:grid-cols-[2fr_1fr]">
      <div>
        <h2 className="font-serif text-4xl">{t2.eyebrow}</h2>
        <p className="mt-5 max-w text-background/75">
          {t2.title}
        </p>
        <ul className="mt-8 space-y-2 text-sm text-background/75">
          <li className="flex items-center gap-2">
            <img src={logo} alt="" className="h-4 w-4 shrink-0" /> {t2.label1}
          </li>
          <li className="flex items-center gap-2">
            <img src={logo} alt="" className="h-4 w-4 shrink-0" /> {t2.label2}
          </li>
          <li className="flex items-center gap-2">
            <img src={logo} alt="" className="h-4 w-4 shrink-0" /> {t2.label3}
          </li>
        </ul>
      </div>
      <div>
        <img src={whySilver} alt="LLUMI shopping bags and drawer boxes" className="w-full object-cover" loading="lazy" />
      </div>
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
                  {/* {i === 0 ? (
                    <video src={heroVideo} poster={g.src} autoPlay muted loop playsInline className="aspect-[4/5] w-full object-cover" />
                  ) : (
                    <img src={g.src} alt={g.label} loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full object-cover" />
                  )} */}
                    <img src={g.src} alt={g.label} loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full object-cover" />
                </div>
                <figcaption className="mt-3 text-center text-[10px] tracking-luxe text-background/80">{g.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Stats 
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
      </section>*/}

      {/* Care & trade-in */}
      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="flex items-start justify-between gap-4">
              <p className="text-[11px] tracking-luxe text-muted-foreground">Owned for life</p>
              <LangToggle lang={lang} onChange={setLang} />
             </div>
            
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">{t.title}</h2>
            <p className="mt-4 text-muted-foreground">
             {t.description}
            </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <article className="group overflow-hidden border border-border bg-background">
              <div className="aspect-[5/3] overflow-hidden">
                <img src={lifetimeCare} alt="Polishing service" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl">{t.label1}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t.label1desc}
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
                <h3 className="font-serif text-2xl">{t.label2}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t.label2desc}
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

export function LangToggle({ lang, onChange }: { lang: "en" | "my"; onChange: (l: "en" | "my") => void }) {
  return (
    <div className="inline-flex shrink-0 border border-border text-[11px] tracking-luxe">
      {(["en", "my"] as const).map((l) => (
        <button
          key={l}
          onClick={() => onChange(l)}
          className={`px-3 py-1.5 transition-colors ${lang === l ? "bg-foreground text-background" : "text-foreground/70 hover:text-foreground"}`}
        >
          {l === "en" ? "EN" : "မြန်မာ"}
        </button>
      ))}
    </div>
  );
}

export function LangToggle2({ lang, onChange }: { lang: "en" | "my"; onChange: (l: "en" | "my") => void }) {
  return (
    <div className="inline-flex shrink-0 border border-border text-[11px] tracking-luxe">
      {(["en", "my"] as const).map((l) => (
        <button
          key={l}
          onClick={() => onChange(l)}
          className={`px-3 py-1.5 transition-colors ${lang === l ? "bg-background text-foreground" : "text-background/70 hover:text-background"}`}
        >
          {l === "en" ? "EN" : "မြန်မာ"}
        </button>
      ))}
    </div>
  );
}