import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import img from "@/assets/ring-size-guide.jpg";

export const Route = createFileRoute("/ring-size-guide")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Ring size guide — LLUMI" },
      { name: "description", content: "Find your perfect ring size at home with our simple guide." },
    ],
  }),
});

const sizes = [
  { us: "5", mm: "49.3" },
  { us: "6", mm: "51.9" },
  { us: "7", mm: "54.4" },
  { us: "8", mm: "57.0" },
  { us: "9", mm: "59.5" },
  { us: "10", mm: "62.1" },
];

function Page() {
  return (
    <Layout>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:px-8">
        <div>
          <p className="text-[11px] tracking-luxe text-muted-foreground">Support</p>
          <h1 className="mt-3 font-serif text-5xl md:text-6xl">Ring size guide</h1>
          <p className="mt-5 text-muted-foreground">
            Wrap a thin strip of paper snugly around the base of your finger, mark where it overlaps,
            then measure the length in millimetres and match it to the chart below.
          </p>
          <ol className="mt-6 space-y-2 text-sm">
            <li>1. Cut a strip of paper about 10 cm long.</li>
            <li>2. Wrap it around the finger you'd like to wear the ring on.</li>
            <li>3. Mark where the paper meets, then measure with a ruler in mm.</li>
            <li>4. Use the chart to find your LLUMI size.</li>
          </ol>
          <Link to="/shop" search={{ category: "rings" }} className="mt-8 inline-block bg-foreground px-6 py-3 text-[11px] tracking-luxe text-background">
            Shop rings
          </Link>
        </div>
        <img src={img} alt="Measuring a ring size" className="aspect-[4/3] w-full object-cover" loading="lazy" />
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-20 md:px-8">
        <h2 className="font-serif text-3xl">Size chart</h2>
        <div className="mt-6 overflow-hidden border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted text-[11px] tracking-luxe text-muted-foreground">
              <tr><th className="px-4 py-3 text-left">US size</th><th className="px-4 py-3 text-left">Inner circumference (mm)</th></tr>
            </thead>
            <tbody>
              {sizes.map((s) => (
                <tr key={s.us} className="border-t border-border">
                  <td className="px-4 py-3">{s.us}</td>
                  <td className="px-4 py-3">{s.mm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  );
}
