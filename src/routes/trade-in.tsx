import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { ContactModal } from "@/components/ContactModal";
import { LangToggle } from "@/routes/why-llumi";
import img from "@/assets/trade-in.jpg";

export const Route = createFileRoute("/trade-in")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Trade-in programme — LLUMI" },
      { name: "description", content: "Trade your eligible LLUMI piece toward a new one at a discounted price." },
    ],
  }),
});

const content = {
  en: {
    eyebrow: "Support",
    title: "Trade-in programme",
    intro: "Customers can return any LLUMI piece in reasonable condition for trade-in credit:",
    tiers: [
      { period: "Within 1 year", value: "70% of original value" },
      { period: "Within 2 years", value: "50% of original value" },
      { period: "After 2 years", value: "30% of original value" },
    ],
    body: [
      "Returned pieces are refurbished for resale or recycled, supporting a circular model that drives loyalty, repeat purchases, and a thoughtfully curated secondary inventory.",
      "Trade-in credit can be applied toward any new LLUMI piece at checkout. Pieces must be authentic LLUMI, with proof of purchase, and free from major damage.",
    ],
    cta: "Contact us",
    modalTitle: "Start your trade-in",
    modalSubtitle: "Send us photos and your order number on any channel below — we'll reply with a quote.",
  },
  my: {
    eyebrow: "ဝန်ဆောင်မှု",
    title: "အလဲအထပ်အစီအစဉ်",
    intro: "သုံးစွဲသူများသည် သင့်တင့်လျောက်ပတ်သော အခြေအနေရှိ မည်သည့် LLUMI ပစ္စည်းကိုမဆို trade-in ခရက်ဒစ်အတွက် ပြန်လည်အပ်နှံနိုင်သည်−",
    tiers: [
      { period: "၁ နှစ်အတွင်း", value: "မူရင်းတန်ဖိုး၏ ၇၀%" },
      { period: "၂ နှစ်အတွင်း", value: "မူရင်းတန်ဖိုး၏ ၆၀%" },
      { period: "၂ နှစ်ကျော်", value: "မူရင်းတန်ဖိုး၏ ၅၀%" },
    ],
    body: [
      "ပြန်အပ်ထားသော ပစ္စည်းများကို ပြန်လည်ပြုပြင်၍ ရောင်းချခြင်း သို့မဟုတ် ပြန်လည်အသုံးပြုခြင်းဖြင့်၊ သစ္စာစောင့်သိမှု၊ ထပ်မံဝယ်ယူမှုနှင့် ရွေးချယ်ထားသော secondary inventory ကို မြှင့်တင်ပေးသော circular model ကို ထောက်ပံ့ပါသည်။",
      "Trade-in ခရက်ဒစ်ကို checkout တွင် မည်သည့် LLUMI ပစ္စည်းအသစ်နှင့်မဆို အသုံးပြုနိုင်သည်။ ပစ္စည်းများသည် စစ်မှန်သော LLUMI ဖြစ်ရမည်၊ ဝယ်ယူခြင်းအထောက်အထား ပါရှိရမည်နှင့် အကြီးအကျယ်ပျက်စီးမှု မရှိရပါ။",
    ],
    cta: "ဆက်သွယ်ရန်",
    modalTitle: "Trade-in စတင်ရန်",
    modalSubtitle: "အောက်ပါ ချန်နယ်တစ်ခုခုမှ ဓာတ်ပုံများနှင့် order number ပို့ပေးပါ — ကျွန်ုပ်တို့ စျေးနှုန်းပြန်ပို့ပါမည်။",
  },
} as const;

function Page() {
  const [lang, setLang] = useState<"en" | "my">("en");
  const [openModal, setOpenModal] = useState(false);
  const t = content[lang];
  return (
    <Layout>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:px-8">
        <div>
          <div className="flex items-start justify-between gap-4">
            <p className="text-[11px] tracking-luxe text-muted-foreground">{t.eyebrow}</p>
            <LangToggle lang={lang} onChange={setLang} />
          </div>
          <h1 className="mt-3 font-serif text-5xl md:text-6xl">{t.title}</h1>
          <p className="mt-5 text-muted-foreground">{t.intro}</p>
          <ul className="mt-5 divide-y divide-border border-y border-border">
            {t.tiers.map((tier) => (
              <li key={tier.period} className="flex items-baseline justify-between gap-4 py-3 text-sm">
                <span className="font-medium">{tier.period}</span>
                <span className="text-muted-foreground">{tier.value}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-4 text-sm text-muted-foreground">
            {t.body.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <button
            onClick={() => setOpenModal(true)}
            className="mt-8 inline-block bg-foreground px-6 py-3 text-[11px] tracking-luxe text-background"
          >
            {t.cta}
          </button>
        </div>
        <img src={img} alt="Old and new LLUMI rings side by side" className="aspect-[4/3] w-full object-cover" loading="lazy" />
      </section>
      <ContactModal open={openModal} onClose={() => setOpenModal(false)} title={t.modalTitle} subtitle={t.modalSubtitle} />
    </Layout>
  );
}
