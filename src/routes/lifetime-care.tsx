import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { ContactModal } from "@/components/ContactModal";
import { LangToggle } from "@/routes/why-llumi";
import img from "@/assets/lifetime-care.jpg";

export const Route = createFileRoute("/lifetime-care")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Lifetime care — LLUMI" },
      { name: "description", content: "Every LLUMI piece comes with complimentary lifetime polishing and care." },
    ],
  }),
});

const content = {
  en: {
    eyebrow: "Support",
    title: "Lifetime care",
    intro: "Every piece purchased from LLUMI is covered by our lifetime care promise — drop it off at our atelier or post it to us, and we'll bring it back to its first-day shine.",
    bullets: [
      "Complimentary lifetime cleaning",
      "Within 6 months: free repair or replacement for stone loss and clasp failure",
      "After 6 months: complimentary servicing; replacement stones charged separately",
      "A 5% monthly revenue reserve is maintained to cover warranty claims",
    ],
    body: [
      "Our atelier inspects every returned piece — checking prongs, clasps, chain links and finish — and re-polishes or re-plates as needed before sending it back to you.",
    ],
    cta: "Book a care visit",
    modalTitle: "Book lifetime care",
    modalSubtitle: "Tell us what needs attention on any channel below — we'll arrange a drop-off or pickup.",
  },
  my: {
    eyebrow: "ဝန်ဆောင်မှု",
    title: "တစ်သက်တာ ပြုပြင်စောင့်ရှောက်မှု",
    intro: "LLUMI မှ ဝယ်ယူသော ပစ္စည်းတိုင်းသည် ကျွန်ုပ်တို့၏ တစ်သက်တာ စောင့်ရှောက်မှု ကတိအောက်တွင် ပါဝင်ပါသည် — ကျွန်ုပ်တို့၏ atelier သို့ လာအပ်ပါ သို့မဟုတ် စာတိုက်မှ ပို့ပါ၊ ပထမနေ့ကဲ့သို့ တောက်ပလာအောင် ပြန်လည်ပြုပြင်ပေးပါမည်။",
    bullets: [
      "တစ်သက်တာ အခမဲ့ သန့်ရှင်းရေး",
      "၆ လအတွင်း: ကျောက်ပျက်ဆုံးခြင်းနှင့် ချိတ်ပျက်စီးခြင်းအတွက် အခမဲ့ ပြုပြင်ခြင်း သို့မဟုတ် အစားထိုးခြင်း",
      "၆ လကျော်: အခမဲ့ ဝန်ဆောင်မှု; အစားထိုးကျောက်များကို သီးခြားကောက်ခံပါသည်",
      "အာမခံတောင်းဆိုမှုများ ဖုံးအုပ်ရန် လစဉ်ဝင်ငွေ၏ ၅% ကို သီးသန့်လှောင်ထားပါသည်",
    ],
    body: [
      "ကျွန်ုပ်တို့၏ atelier သည် ပြန်ပို့လာသော ပစ္စည်းတိုင်းကို စစ်ဆေး — prong များ၊ ချိတ်များ၊ ကြိုးဆက်များနှင့် အပြီးသတ်ကို စစ်ဆေး၍ လိုအပ်သလို ပြန်တိုက်ချွတ်ခြင်း သို့မဟုတ် ပြန်လည်ပိုစ်နှင်းခြင်းပြုလုပ်ပြီး သင့်ထံ ပြန်ပို့ပေးပါသည်။",
    ],
    cta: "ပြုပြင်ရန် ဆက်သွယ်ပါ",
    modalTitle: "Lifetime care စတင်ရန်",
    modalSubtitle: "လိုအပ်သည့်အရာများကို အောက်ပါ ချန်နယ်တစ်ခုခုမှ ပြောပြပါ — drop-off သို့မဟုတ် pickup စီစဉ်ပေးပါမည်။",
  },
} as const;

function Page() {
  const [lang, setLang] = useState<"en" | "my">("en");
  const [openModal, setOpenModal] = useState(false);
  const t = content[lang];
  return (
    <Layout>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:px-8">
        <img src={img} alt="LLUMI atelier polishing a silver ring" className="aspect-[4/3] w-full object-cover" loading="lazy" />
        <div>
          <div className="flex items-start justify-between gap-4">
            <p className="text-[11px] tracking-luxe text-muted-foreground">{t.eyebrow}</p>
            <LangToggle lang={lang} onChange={setLang} />
          </div>
          <h1 className="mt-3 font-serif text-5xl md:text-6xl">{t.title}</h1>
          <p className="mt-5 text-muted-foreground">{t.intro}</p>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            {t.bullets.map((b) => <li key={b}>· {b}</li>)}
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
      </section>
      <ContactModal open={openModal} onClose={() => setOpenModal(false)} title={t.modalTitle} subtitle={t.modalSubtitle} />
    </Layout>
  );
}
