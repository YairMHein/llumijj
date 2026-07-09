import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";

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
    body: [
      "LLUMI — ယူမီ is a silver jewellery brand coming from the belief that jewellery is more than decoration — it reflects identity, personality, and personal stories.",
      "Everyone deserves pieces that feel meaningful, lasting, and authentic.",
      "That is why we choose sterling silver: timeless, durable, and understated. Our jewellery is made for everyday wear — to grow with you and become part of your story.",
      "True style is not about luxury. It is about authenticity.",
      "Myanmar's first warranty-backed silver jewellery fashion brand — designed in Yangon, finished by hand, and protected for the life of the piece.",
    ],
  },
  my: {
    eyebrow: "ဘာကြောင့် LLUMI",
    title: "နေ့စဉ်ဝတ်ဆင်ဖို့ ဖန်တီးထားသော တိတ်ဆိတ်လှပသော လက်ဝတ်ရတနာများ။",
    body: [
      "LLUMI — ယူမီ သည် ငွေလက်ဝတ်ရတနာ အမှတ်တံဆိပ်တစ်ခုဖြစ်ပြီး၊ လက်ဝတ်ရတနာဆိုသည်မှာ အလှအပထက်ပိုသည် — ၎င်းသည် ကိုယ်ပိုင်ပုံစံ၊ စရိုက်နှင့် ပုဂ္ဂိုလ်ရေးပုံပြင်များကို ထင်ဟပ်စေသည် ဟူသော ယုံကြည်ချက်မှ ဆင်းသက်လာသည်။",
      "လူတိုင်းသည် အဓိပ္ပါယ်ရှိ၊ ကြာရှည်ခံ၍ စစ်မှန်သော လက်ဝတ်ရတနာများကို ပိုင်ဆိုင်ထိုက်သည်။",
      "ထို့ကြောင့် ကျွန်ုပ်တို့သည် sterling silver ကိုရွေးချယ်သည် — ခေတ်ကာလမရွေး၊ ခိုင်ခံ့ပြီး ရိုးရှင်းသော လှပမှု။ ကျွန်ုပ်တို့၏ လက်ဝတ်ရတနာများကို နေ့စဉ်ဝတ်ဆင်နိုင်ရန် ဖန်တီးထားသည် — သင်နှင့်အတူ ကြီးထွားလာပြီး သင်၏ပုံပြင်တစ်စိတ်တစ်ပိုင်း ဖြစ်လာစေရန်။",
      "စစ်မှန်သော ဖက်ရှင်ဆိုသည်မှာ ဇိမ်ခံမှုမဟုတ်ဘဲ စစ်မှန်မှုသာဖြစ်သည်။",
      "မြန်မာနိုင်ငံ၏ ပထမဆုံး အာမခံပါသော ငွေလက်ဝတ်ရတနာ ဖက်ရှင်အမှတ်တံဆိပ် — ရန်ကုန်တွင် ဒီဇိုင်းရေးဆွဲ၊ လက်ဖြင့်ပြီးခြောက်ပြီး တစ်သက်တာအာမခံပါသည်။",
    ],
  },
} as const;

function WhyLlumi() {
  const [lang, setLang] = useState<"en" | "my">("en");
  const t = content[lang];
  return (
    <Layout>
      <section className="mx-auto max-w-3xl px-5 py-20 md:px-0">
        <div className="flex items-start justify-between gap-4">
          <p className="text-[11px] tracking-luxe text-muted-foreground">{t.eyebrow}</p>
          <LangToggle lang={lang} onChange={setLang} />
        </div>
        <h1 className="mt-3 font-serif text-5xl">{t.title}</h1>
        <div className="mt-10 space-y-6 text-muted-foreground">
          {t.body.map((p, i) => <p key={i}>{p}</p>)}
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
