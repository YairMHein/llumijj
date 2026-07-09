import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useCart, formatMoney } from "@/lib/cart";
import { resolveProductImage } from "@/lib/product-images";

export const Route = createFileRoute("/cart")({ component: CartPage });

function CartPage() {
  const { items, setQty, remove, subtotal } = useCart();
  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-5 py-14 md:px-8">
        <h1 className="font-serif text-4xl">Your bag</h1>
        {items.length === 0 ? (
          <div className="mt-10 border-t border-border pt-10 text-muted-foreground">
            <p>Your bag is empty.</p>
            <Link to="/shop" className="mt-4 inline-block underline">Continue shopping</Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-10 md:grid-cols-[1fr_320px]">
            <ul className="divide-y divide-border border-y border-border">
              {items.map((i) => (
                <li key={`${i.id}:${i.variant_id ?? ""}`} className="flex gap-4 py-5">
                  <Link to="/product/$slug" params={{ slug: i.slug }} className="shrink-0">
                    <img src={resolveProductImage(i.image_url)} alt="" className="h-24 w-20 object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <div>
                        <Link to="/product/$slug" params={{ slug: i.slug }} className="font-serif text-lg hover:underline">
                          {i.name}
                        </Link>
                        {(i.variant_size || i.sku) && (
                          <p className="mt-0.5 text-[10px] tracking-luxe text-muted-foreground">
                            {i.variant_size ? `Size ${i.variant_size}` : null}
                            {i.variant_size && i.sku ? " · " : ""}
                            {i.sku ? `SKU ${i.sku}` : null}
                          </p>
                        )}
                      </div>
                      <span className="text-sm">{formatMoney(i.price * i.quantity)}</span>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="inline-flex items-center border border-border">
                        <button className="h-8 w-8" onClick={() => setQty(i.id, i.quantity - 1, i.variant_id)}>−</button>
                        <span className="w-8 text-center text-sm">{i.quantity}</span>
                        <button className="h-8 w-8" onClick={() => setQty(i.id, i.quantity + 1, i.variant_id)}>+</button>
                      </div>
                      <button onClick={() => remove(i.id, i.variant_id)} className="text-xs uppercase tracking-luxe text-muted-foreground hover:text-foreground">Remove</button>
                    </div>
                  </div>
                </li>
              ))}

            </ul>
            <aside className="h-fit border border-border p-6">
              <h2 className="text-[11px] tracking-luxe text-muted-foreground">Summary</h2>
              <div className="mt-4 flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatMoney(subtotal)}</span>
              </div>
              <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                <span>Deposit due today (30%)</span>
                <span>{formatMoney(subtotal * 0.3)}</span>
              </div>
              <Link to="/checkout" className="mt-6 block bg-foreground py-3 text-center text-[11px] tracking-luxe text-background">
                Checkout (preorder)
              </Link>
            </aside>
          </div>
        )}
      </section>
    </Layout>
  );
}
