import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { LangToggle } from "./why-llumi";
import shippingHero from "@/assets/shipping-hero.png.asset.json";

export const Route = createFileRoute("/shipping")({
  component: ShippingPage,
  head: () => ({
    meta: [
      { title: "Shipping — LLUMI" },
      { name: "description", content: "In-stock pieces ship in 1–2 weeks; preorder pieces in 5–6 weeks." },
    ],
  }),
});

const content = {
  en: {
    eyebrow: "Shipping",
    title: "How it arrives.",
    sections: [
      {
        title: "In-stock pieces — 1–2 weeks",
        body: "Pieces marked in-stock ship from our atelier within 1–2 weeks of your order.",
      },
      {
        title: "Preorder pieces — 5–6 weeks",
        body: "Out-of-stock and made-to-order pieces are crafted on demand. Expect 5–6 weeks from the day your deposit is received. The balance is collected once the piece is ready.",
      },
      {
        title: "Pickup & delivery",
        body: "Pickup at our atelier is complimentary. Home delivery is available — the fee is calculated based on your distance and confirmed before dispatch.",
      },
    ],
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        q: "When will my order be shipped?",
        a: "In-stock pieces ship within 1–2 weeks. Preorder pieces are made to order and typically ship in 5–6 weeks after your deposit is received.",
      },
      {
        q: "Do you ship outside Yangon?",
        a: "Yes. We deliver nationwide within Myanmar. Delivery fees depend on your location and are confirmed before dispatch.",
      },
      {
        q: "Can I pick up my order?",
        a: "Absolutely. Pickup at our Yangon atelier is complimentary. We will contact you as soon as your piece is ready.",
      },
      {
        q: "How do I track my order?",
        a: "We send updates by phone or message at each stage — deposit received, crafting, ready, and dispatched.",
      },
      {
        q: "What if my piece arrives damaged?",
        a: "Contact us within 7 days of delivery with a photo. Every LLUMI piece is protected by our lifetime warranty and we will make it right.",
      },
    ],
  },
  my: {
    eyebrow: "ပို့ဆောင်ခြင်း",
    title: "ဘယ်လိုရောက်လာမလဲ။",
    sections: [
      {
        title: "လက်ကျန်ရှိသော ပစ္စည်း — ၁–၂ ပတ်",
        body: "လက်ကျန်ရှိသည်ဟု သတ်မှတ်ထားသော ပစ္စည်းများကို မှာယူပြီး ၁–၂ ပတ်အတွင်း ကျွန်ုပ်တို့၏ atelier မှ ပို့ဆောင်ပေးပါသည်။",
      },
      {
        title: "ကြိုတင်မှာယူသော ပစ္စည်း — ၅–၆ ပတ်",
        body: "လက်ကျန်မရှိသော သို့မဟုတ် အထူးမှာယူသော ပစ္စည်းများကို လက်ဖြင့်ဖန်တီးပါသည်။ စရံငွေ လက်ခံရရှိသည့်နေ့မှ ၅–၆ ပတ်ခန့် ကြာနိုင်ပါသည်။ ကျန်ငွေကို ပစ္စည်းပြီးစီးမှ ကောက်ခံပါမည်။",
      },
      {
        title: "လာယူခြင်း နှင့် ပို့ဆောင်ခြင်း",
        body: "ကျွန်ုပ်တို့၏ atelier တွင် လာယူပါက အခမဲ့ဖြစ်ပါသည်။ အိမ်တိုင်ရာရောက် ပို့ဆောင်မှုကို အကွာအဝေးအရ တွက်ချက်၍ မပို့မီ အတည်ပြုပေးပါသည်။",
      },
    ],
    faqTitle: "မေးလေ့ရှိသော မေးခွန်းများ",
    faqs: [
      {
        q: "ကျွန်ုပ်၏အမှာစာကို ဘယ်အချိန်ပို့မှာလဲ။",
        a: "လက်ကျန်ရှိပစ္စည်းကို ၁–၂ ပတ်အတွင်း ပို့ပေးပါသည်။ ကြိုတင်မှာယူသော ပစ္စည်းများကို စရံလက်ခံရရှိပြီး ၅–၆ ပတ်အတွင်း ပို့ပေးပါသည်။",
      },
      {
        q: "ရန်ကုန်ပြင်ပ ပို့ပေးပါသလား။",
        a: "ပို့ပေးပါသည်။ မြန်မာနိုင်ငံအနှံ့ ပို့ဆောင်ပေးပါသည်။ ပို့ဆောင်ခမှာ တည်နေရာအလိုက် ဖြစ်ပြီး မပို့မီ အတည်ပြုပါမည်။",
      },
      {
        q: "ကိုယ်တိုင်လာယူလို့ရလား။",
        a: "ရပါသည်။ ကျွန်ုပ်တို့၏ ရန်ကုန် atelier တွင် အခမဲ့လာယူနိုင်ပါသည်။ ပစ္စည်းအဆင်သင့်ဖြစ်လျှင် ဆက်သွယ်အကြောင်းကြားပေးပါမည်။",
      },
      {
        q: "အမှာစာကို ဘယ်လိုခြေရာခံနိုင်လဲ။",
        a: "အဆင့်တစ်ခုချင်းစီတွင် — စရံလက်ခံ၊ ဖန်တီးဆဲ၊ အဆင်သင့်၊ ပို့ဆောင်ပြီး — ဖုန်း သို့မဟုတ် message ဖြင့် အသိပေးပါသည်။",
      },
      {
        q: "ပစ္စည်းပျက်စီးလာလျှင် ဘယ်လိုလုပ်ရမလဲ။",
        a: "လက်ခံရရှိပြီး ၇ ရက်အတွင်း ဓာတ်ပုံနှင့်အတူ ဆက်သွယ်ပါ။ LLUMI ပစ္စည်းတိုင်းသည် တစ်သက်တာ အာမခံပါဝင်ပြီး ကူညီဖြေရှင်းပေးပါမည်။",
      },
    ],
  },
} as const;

function ShippingPage() {
  const [lang, setLang] = useState<"en" | "my">("en");
  const t = content[lang];
  return (
    <Layout>
      <section className="mx-auto max-w-3xl px-5 py-16 md:px-0">
        <div className="flex items-start justify-between gap-4">
          <p className="text-[11px] tracking-luxe text-muted-foreground">{t.eyebrow}</p>
          <LangToggle lang={lang} onChange={setLang} />
        </div>
        <h1 className="mt-3 font-serif text-3xl md:text-4xl">{t.title}</h1>

        <div className="mt-8 overflow-hidden">
          <img
            src={shippingHero.url}
            alt="LLUMI silver earrings — Wear Your Story"
            className="aspect-[4/5] w-full max-w-md object-cover md:mx-auto"
            loading="lazy"
          />
        </div>

        <div className="mt-10 space-y-6 text-sm">
          {t.sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-serif text-xl md:text-2xl">{s.title}</h2>
              <p className="mt-2 text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="mt-16 border-t border-border pt-10">
          <p className="text-[11px] tracking-luxe text-muted-foreground">FAQ</p>
          <h2 className="mt-2 font-serif text-2xl md:text-3xl">{t.faqTitle}</h2>
          <dl className="mt-8 divide-y divide-border">
            {t.faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-sm font-medium text-foreground">
                  <span>{f.q}</span>
                  <span className="shrink-0 text-lg leading-none transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </dl>
        </div>
      </section>
    </Layout>
  );
}
