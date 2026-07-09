import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/privacy")({
  component: () => (
    <Layout>
      <section className="mx-auto max-w-3xl px-5 py-20 md:px-0">
        <p className="text-[11px] tracking-luxe text-muted-foreground">Privacy</p>
        <h1 className="mt-3 font-serif text-5xl">Privacy policy</h1>
        <div className="mt-10 space-y-5 text-sm text-muted-foreground">
          <p>LLUMI ("we", "our") respects your privacy. This policy explains what we collect and how we use it.</p>
          <h2 className="font-serif text-xl text-foreground">What we collect</h2>
          <p>Account details (name, email), order details (items, address, contact), and basic device data to keep the site running.</p>
          <h2 className="font-serif text-xl text-foreground">How we use it</h2>
          <p>To process orders, communicate with you about your purchase, and improve our service. We do not sell your data.</p>
          <h2 className="font-serif text-xl text-foreground">Your rights</h2>
          <p>You can request access to or deletion of your data anytime by emailing hello@llumi.studio.</p>
        </div>
      </section>
    </Layout>
  ),
  head: () => ({ meta: [{ title: "Privacy policy — LLUMI" }, { name: "description", content: "How LLUMI collects and uses your data." }] }),
});
