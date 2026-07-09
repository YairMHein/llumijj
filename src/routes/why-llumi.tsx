import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import photo1 from "@/assets/why-llumi-1.png.asset.json";
import photo2 from "@/assets/why-llumi-2.png.asset.json";


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
      "We choose sterling silver: timeless, durable, and understated. Our jewellery is made for everyday wear — to grow with you and become part of your story.",
      "Myanmar's first warranty-backed silver jewellery fashion brand — designed in Yangon, finished by hand, and protected for the life of the piece.",
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
    eyebrow: "ဘာကြောင့် LLUMI",
    title: "နေ့စဉ်ဝတ်ဆင်ဖို့ ဖန်တီးထားသော တိတ်ဆိတ်လှပသော လက်ဝတ်ရတနာများ။",
    beliefLabel: "ကျွန်ုပ်တို့၏ ယုံကြည်ချက်",
    madeToLastLabel: "ကြာရှည်ခံစေရန်",
    materialLabel: "ပစ္စည်း",
    silverGivesYou: "925 sterling silver မှ သင်ရရှိမည့်အရာများ",
    whySilverTitle: "ဘာကြောင့် ငွေ?",
    belief: [
      "လက်ဝတ်ရတနာဆိုသည်မှာ အလှအပထက်ပိုသည်။",
      "၎င်းသည် သင်ဘယ်သူဆိုတာ ပြသတဲ့ ကြေးမုံဖြစ်သည်။",
      "သင်ရွေးချယ်တဲ့ လက်ဝတ်ရတနာများသည် သင့်စရိုက်၊ သင့်ခံစားချက်၊ သင့်ပုံစံနှင့် သင်နှင့်အတူပါလာသည့် အခိုက်အတန့်များကို ကိုယ်စားပြုသည်။",
      "အကောင်းဆုံးလက်ဝတ်ရတနာသည် အမှတ်တရများကို ထိန်းသိမ်းထားပေးသည်။",
      "သို့သော် ကိုယ်ပိုင်ပုံစံဖော်ပြခြင်းသည် ဆွဲမယူနိုင်တဲ့ဈေးနှုန်းနှင့် မလာသင့်ပါ။",
      "သင်ချစ်တဲ့ လက်ဝတ်ရတနာသည်လည်း အချိန်ကြာလာသည်နှင့်အမျှ မှိန်ပျောက်၊ ညစ်နွမ်း၊ သို့မဟုတ် အဓိပ္ပါယ်ဆုံးရှုံးမသွားသင့်ပါ။",
      "ထိုစိတ်မကျေမနပ်မှုသည်ပင် LLUMI တည်ရှိရခြင်း၏ အကြောင်းရင်းဖြစ်သည်။",
      "Sterling silver မှ တည်ဆောက်ထားသော ခေတ်မရွေးလက်ဝတ်ရတနာ အမှတ်တံဆိပ်တစ်ခု — အလှမပျက်၊ သင်နှင့်အတူ တည်နေရန် ဖန်တီးထားသည်။",
    ],
    madeToLast: [
      "ကျွန်ုပ်တို့သည် sterling silver ကို ရွေးချယ်သည် — ခေတ်ကာလမရွေး၊ ခိုင်ခံ့ပြီး ရိုးရှင်းသော လှပမှု။ ကျွန်ုပ်တို့၏ လက်ဝတ်ရတနာများကို နေ့စဉ်ဝတ်ဆင်နိုင်ရန် ဖန်တီးထားသည် — သင်နှင့်အတူ ကြီးထွားလာပြီး သင်၏ပုံပြင်တစ်စိတ်တစ်ပိုင်း ဖြစ်လာစေရန်။",
      "မြန်မာနိုင်ငံ၏ ပထမဆုံး အာမခံပါသော ငွေလက်ဝတ်ရတနာ ဖက်ရှင်အမှတ်တံဆိပ် — ရန်ကုန်တွင် ဒီဇိုင်းရေးဆွဲ၊ လက်ဖြင့်ပြီးခြောက်ပြီး တစ်သက်တာအာမခံပါသည်။",
    ],
    whySilverBody: "စစ်မှန်သော ဖက်ရှင်ဆိုသည်မှာ ဇိမ်ခံမှုမဟုတ်ဘဲ စစ်မှန်မှုသာဖြစ်သည်။",
    silverPoints: [
      "နေ့စဉ်လှပမှု",
      "ကြာရှည်ခံသည့် အရည်အသွေး",
      "တတ်နိုင်သော ဇိမ်ခံမှု",
      "ခေတ်မရွေး ဒီဇိုင်း",
      "ထိန်းသိမ်းထားနိုင်သော တန်ဖိုးအမှန်",
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
              src={photo1.url}
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
              src={photo2.url}
              alt="LLUMI ginkgo silver earring worn by model"
              className="aspect-[4/5] w-full max-w-sm object-cover"
              loading="lazy"
            />
          </div>
          <div className="order-1 space-y-4 text-muted-foreground md:order-2">
            <p className="text-[11px] tracking-luxe text-foreground">{t.madeToLastLabel}</p>
            <h2 className="font-serif text-2xl leading-tight text-foreground md:text-3xl">
              {t.madeToLast[0]}
            </h2>
            <p className="text-sm md:text-base">{t.madeToLast[1]}</p>
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
