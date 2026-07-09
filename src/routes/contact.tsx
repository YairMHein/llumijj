import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Layout } from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(2000),
});

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({ meta: [{ title: "Contact — LLUMI" }, { name: "description", content: "Talk to us about a piece, a custom order, or anything else." }] }),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) return toast.error(parsed.error.errors[0].message);
    setBusy(true);
    const { error } = await supabase.from("contact_messages").insert(parsed.data);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Message sent — we'll be in touch.");
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <Layout>
      <section className="mx-auto grid max-w-5xl gap-12 px-5 py-16 md:grid-cols-2 md:px-0">
        <div>
          <p className="text-[11px] tracking-luxe text-muted-foreground">Contact us</p>
          <h1 className="mt-3 font-serif text-5xl">Say hello.</h1>
          <p className="mt-4 text-muted-foreground">For custom orders, sizing, or anything you'd like to ask. We typically reply within one business day.</p>
          <p className="mt-8 text-sm">hello@llumi.studio<br />Mon–Fri · 10am–6pm</p>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <input className="w-full border border-border bg-background px-3 py-2.5 text-sm" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input type="email" className="w-full border border-border bg-background px-3 py-2.5 text-sm" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <textarea rows={6} className="w-full border border-border bg-background px-3 py-2.5 text-sm" placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          <button disabled={busy} className="w-full bg-foreground py-3 text-[11px] tracking-luxe text-background disabled:opacity-60">{busy ? "Sending…" : "Send message"}</button>
        </form>
      </section>
    </Layout>
  );
}
