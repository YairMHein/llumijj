import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import photo1 from "@/assets/why-llumi-1.png";
import photo2 from "@/assets/why-llumi-2.png";


export const Route = createFileRoute("/why-llumi")({
  component: WhyLlumi,
  head: () => ({
    meta: [
      { title: "Why LLUMI" },
      { name: "description", content: "Our story, materials, and the way we make things." },
    ],
  }),
});

const content = {
  en: {
    eyebrow: "Why LLUMI",
    title: "Quiet pieces, made to be lived in.",
    beliefLabel: "Our belief",
    madeToLastLabel: "Made to last",
    materialLabel: "The material",
    silverGivesYou: "925 sterling silver gives you",
    whySilverTitle: "Why silver?",
    belief: [
      "Jewellery is more than decoration.",
      "It is a mirror of who you are.",
      "The pieces you choose speak for you — your personality, your mood, your style, and the moments you carry with you.",
      "The best jewellery keeps memories.",
      "But expressing yourself should never come with a price that's out of reach.",
      "And the jewellery you love shouldn't fade, tarnish, or lose its meaning over time.",
      "That frustration is exactly why LLUMI exists.",
      "A timeless jewellery brand rooted in sterling silver — made to stay beautiful, made to stay with you.",
    ],
    madeToLast: [
      "At LLUMI, we chose 925 Sterling Silver — a timeless metal known for its lasting beauty, durability, and understated elegance.",
      "Every piece is designed for everyday wear, created to evolve with you through life's milestones and become a meaningful part of your journey.",
      "As Myanmar's first warranty-backed 925 Sterling Silver fashion jewellery brand, every LLUMI piece is backed by our complimentary lifetime warranty, giving you lasting confidence with every wear.",
    ],
    whySilverBody:
      "True style is not about luxury. It is about authenticity.",
    silverPoints: [
      "Everyday elegance",
      "Long-lasting quality",
      "Affordable luxury",
      "Timeless styling",
      "Real value you can keep",
    ],
  },
  my: {
    eyebrow: "ဘာကြောင့် LLUMI လဲ",
    title: "တိတ်တဆိတ်နဲ့လှပနေတဲ့ အလှတရား၊ နေ့စဉ်ဝတ်ဆင်နိုင်ဖို့ ဖန်တီးထားပါတယ်။",
    beliefLabel: "LLUMI ၏ ယုံကြည်ချက်",
    madeToLastLabel: "ကြာရှည်ခံစေရန် ရည်ရွယ်ထားသည်",
    materialLabel: "သုံးထားသည့် အထည်",
    silverGivesYou: "925 sterling silver က သင့်ကို ဘာတွေပေးစွမ်းနိုင်လဲ",
    whySilverTitle: "ဘာကြောင့် ငွေထည်လဲ?",
    belief: [
      "လက်ဝတ်ရတနာဆိုတာ အလှဆင်ဖို့သက်သက်ထက်ကို ပိုပါတယ်။",
      "ကိုယ်ဘယ်သူဆိုတာကို ပြသနေတဲ့ မှန်တစ်ချပ်ပါ။",
      "သင်ရွေးချယ်တဲ့ jewellery တွေက သင့် personality, mood, style နဲ့ အမှတ်တရတွေအထိ ပြောပြနေပါတယ်။",
      "အကောင်းဆုံး လက်ဝတ်ရတနာဆိုတာ အမှတ်တရတွေကို သိမ်းဆည်းထားပေးနိုင်တဲ့ အရာတစ်ခုပါ။",
      "ဒါပေမယ့် ကိုယ့်ကိုယ်ကိုယ် ဖော်ပြဖို့အတွက် တန်ဖိုးကြီးတဲ့ဈေးနှုန်းကို ပေးစရာ မလိုသင့်ပါဘူး။",
      "သင်ချစ်မြတ်နိုးတဲ့ လက်ဝတ်ရတနာဟာလည်း အချိန်နဲ့အမျှ အရောင်မှိန်မသွားဘဲ၊ တန်ဖိုးနဲ့ အဓိပ္ပာယ်ကို ဆက်လက်ထိန်းသိမ်းထားနိုင်သင့်ပါတယ်။",
      "အဲဒီယုံကြည်ချက်နဲ့ပဲ LLUMI ကို စတင်တည်ထောင်ခဲ့ပါတယ်။",
      "925 Sterling Silver နဲ့ဖန်တီးထားတဲ့ LLUMI ရဲ့ လက်ဝတ်ရတနာတွေဟာ အဆုံးမဲ့သောအလှတရားတွေကို ပိုင်ဆိုင်ထားပြီး၊ သင့်ဘဝရဲ့ အခိုက်အတန့်တိုင်းမှာ အတူတကွ ထာဝရမှတ်တမ်းတင်ပေးဖို့ ရည်ရွယ်ထားပါတယ်။",
    ],
    madeToLast: [
      "LLUMI မှာ ကျွန်တော်တို့ ရွေးချယ်ထားတာက 925 Sterling Silver — အချိန်ကို ကျော်လွန်တဲ့ အလှတရား၊ ခိုင်ခံ့မှုနဲ့ ရိုးရှင်းတဲ့ ကျက်သရေကို ပိုင်ဆိုင်ထားတဲ့ သတ္တုတစ်မျိုးပါ။",
      "နေ့စဉ်ဝတ်ဆင်နိုင်ဖို့၊ အချိန်နဲ့အမျှ သင့်ဘဝရဲ့ အမှတ်တရတွေနဲ့အတူ တန်ဖိုးပိုမိုကြီးထွားလာဖို့၊ သင့်ဇာတ်လမ်းရဲ့ အစိတ်အပိုင်းတစ်ခု ဖြစ်လာဖို့ ရည်ရွယ်ပြီး လက်ဝတ်ရတနာတစ်ခုချင်းစီကို ဖန်တီးထားပါတယ်။",
      "မြန်မာနိုင်ငံ၏ ပထမဆုံး အာမခံပေးတဲ့ 925 Sterling Silver Fashion Jewellery Brand ဖြစ်တဲ့ LLUMI ဟာ လက်ဝတ်ရတနာတစ်ခုချင်းစီကို တစ်သက်တာ အာမခံဝန်ဆောင်မှုဖြင့် ယုံကြည်စိတ်ချစွာ ရောင်းချပေးနေပါတယ်။",
    ],
    whySilverBody: "စစ်မှန်တဲ့စတိုင်ဟာ Luxury ဖြစ်နေမှမဟုတ်ဘူး။ ကိုယ့်ရဲ့ပုံစံအစစ်အမှန်ကို ပြသနေတဲ့အရာပါ။",
    silverPoints: [
      "နေ့စဉ်ဝတ်ဆင်နိုင်တဲ့ ကျက်သရေရှိမှု",
      "ကြာရှည်ခံတဲ့ အရည်အသွေး",
      "လက်လှမ်းမီတဲ့ Luxury",
      "အချိန်မရွေး လိုက်ဖက်တဲ့ ဒီဇိုင်း",
      "အချိန်နဲ့အမျှ တန်ဖိုးထားနိုင်တဲ့ လက်ဝတ်ရတနာ",
    ],
  },
} as const;

function WhyLlumi() {
  const [lang, setLang] = useState<"en" | "my">("en");
  const t = content[lang];
  return (
    <Layout>
      {/* Intro */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="flex items-start justify-between gap-4">
          <p className="text-[11px] tracking-luxe text-muted-foreground">{t.eyebrow}</p>
          <LangToggle lang={lang} onChange={setLang} />
        </div>
        <h1 className="mt-3 max-w-3xl font-serif text-3xl md:text-4xl">{t.title}</h1>
      </section>

      {/* Row 1 — content left, photo right */}
      <section className="mx-auto max-w-5xl px-5 pb-16 md:px-8">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="space-y-4 text-muted-foreground">
            <p className="text-[11px] tracking-luxe text-foreground">{t.beliefLabel}</p>
            <h2 className="font-serif text-2xl leading-tight text-foreground md:text-3xl">
              {t.belief[0]}
            </h2>
            {t.belief.slice(1).map((p, i) => (
              <p key={i} className="text-sm md:text-base">{p}</p>
            ))}
          </div>
          <div className="overflow-hidden">
            <img
              src={photo1}
              alt="LLUMI floral statement earrings in gold and silver"
              className="aspect-[4/5] w-full max-w-sm object-cover md:ml-auto"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Row 2 — photo left, content right */}
      <section className="mx-auto max-w-5xl px-5 pb-16 md:px-8">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="order-2 overflow-hidden md:order-1">
            <img
              src={photo2}
              alt="LLUMI ginkgo silver earring worn by model"
              className="aspect-[4/5] w-full max-w-sm object-cover"
              loading="lazy"
            />
          </div>
          <div className="order-1 space-y-4 text-muted-foreground md:order-2">
            <p className="text-[11px] tracking-luxe text-foreground">{t.madeToLastLabel}</p>
            <h2 className="font-serif text-xl leading-tight text-foreground md:text-3xl">
              {t.madeToLast[0]}
            </h2>
            <p className="text-sm md:text-base">{t.madeToLast[1]}</p>
            <p className="text-sm md:text-base">{t.madeToLast[2]}</p>
          </div>
        </div>
      </section>

      {/* Why silver — silver row */}
      <section
        className="border-y border-border"
        style={{ background: "linear-gradient(135deg, #e8e8ea 0%, #f3f3f5 40%, #cfcfd3 100%)" }}
      >
        <div className="mx-auto grid max-w-5xl gap-10 px-5 py-16 md:grid-cols-2 md:px-8">
          <div>
            <p className="text-[11px] tracking-luxe text-foreground/70">{t.materialLabel}</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">{t.whySilverTitle}</h2>
            <p className="mt-4 max-w-md text-foreground/70">{t.whySilverBody}</p>
          </div>
          <div>
            <p className="text-[11px] tracking-luxe text-foreground/70">{t.silverGivesYou}</p>
            <ul className="mt-4 space-y-3 font-serif text-xl md:text-2xl">
              {t.silverPoints.map((line) => (
                <li key={line} className="flex items-baseline gap-3 border-b border-foreground/15 pb-2">
                  <span aria-hidden className="text-sm">✓</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Layout>
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
