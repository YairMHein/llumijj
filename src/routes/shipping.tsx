import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/shipping")({
  component: () => (
    <Layout>
      <section className="mx-auto max-w-3xl px-5 py-20 md:px-0">
        <p className="text-[11px] tracking-luxe text-muted-foreground">Shipping</p>
        <h1 className="mt-3 font-serif text-5xl">How it arrives.</h1>
        <div className="mt-10 space-y-8 text-sm">
          <div>
            <h2 className="font-serif text-2xl">In-stock pieces — 1–2 weeks</h2>
            <p className="mt-2 text-muted-foreground">Pieces marked in-stock ship from our atelier within 1–2 weeks of your order.</p>
          </div>
          <div>
            <h2 className="font-serif text-2xl">Preorder pieces — 5–6 weeks</h2>
            <p className="mt-2 text-muted-foreground">Out-of-stock and made-to-order pieces are crafted on demand. Expect 5–6 weeks from the day your deposit is received. The balance is collected once the piece is ready.</p>
          </div>
          <div>
            <h2 className="font-serif text-2xl">Pickup & delivery</h2>
            <p className="mt-2 text-muted-foreground">Pickup at our atelier is complimentary. Home delivery is available — the fee is calculated based on your distance and confirmed before dispatch.</p>
          </div>
        </div>
      </section>
    </Layout>
  ),
  head: () => ({ meta: [{ title: "Shipping — LLUMI" }, { name: "description", content: "In-stock pieces ship in 1–2 weeks; preorder pieces in 5–6 weeks." }] }),
});
