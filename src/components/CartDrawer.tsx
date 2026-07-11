import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useCart, formatMoney } from "@/lib/cart";
import { fetchProductsCart } from "@/lib/products";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, setQty, remove, subtotal, add } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { data: suggested = [] } = useQuery({
    queryKey: ["products", "featured"],
    queryFn: () => fetchProductsCart({ featured: true }),
    enabled: open,
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  const node = (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 animate-fade-in bg-foreground/40" onClick={onClose} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md animate-drawer-in flex-col bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-[11px] tracking-luxe">Your bag ({items.length})</h2>
          <button onClick={onClose} aria-label="Close" className="inline-flex h-8 w-8 items-center justify-center">
            <X className="h-4 w-4" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 overflow-y-auto px-5 py-8">
            <p className="font-serif text-2xl">Your cart is empty.</p>
            <p className="mt-2 text-sm text-muted-foreground">Discover pieces loved by the LLUMI community.</p>
            <h3 className="mt-8 text-[11px] tracking-luxe text-muted-foreground">You may like</h3>
            <ul className="mt-4 grid grid-cols-2 gap-4">
              {suggested.slice(0, 4).map((p) => (
                <li key={p.id} className="group">
                  <Link to="/product/$slug" params={{ slug: p.slug }} onClick={onClose} className="block">
                    <div className="aspect-[4/5] overflow-hidden bg-muted">
                      <img src={p.image_url} alt={p.name} className="h-full w-full object-cover transition-transform group-hover:scale-[1.03]" loading="lazy" />
                    </div>
                    <p className="mt-2 truncate font-serif text-sm">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{formatMoney(Number(p.sale_price ?? p.price))}</p>
                  </Link>
                  <button
                    onClick={() => add({ id: p.id, slug: p.slug, name: p.name, price: Number(p.sale_price ?? p.price), image_url: p.image_url })}
                    className="mt-2 w-full border border-border py-1.5 text-[10px] tracking-luxe hover:bg-foreground hover:text-background"
                  >
                    Add to bag
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
              {items.map((i) => (
                <li key={`${i.id}:${i.variant_id ?? ""}`} className="flex gap-4 py-5">
                  <img src={i.image_url} alt="" className="h-24 w-20 object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <div>
                        <h3 className="font-serif text-base">{i.name}</h3>
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
                        <button className="h-7 w-7 text-sm" onClick={() => setQty(i.id, i.quantity - 1, i.variant_id)}>−</button>
                        <span className="w-7 text-center text-xs">{i.quantity}</span>
                        <button className="h-7 w-7 text-sm" onClick={() => setQty(i.id, i.quantity + 1, i.variant_id)}>+</button>
                      </div>
                      <button onClick={() => remove(i.id, i.variant_id)} className="text-[10px] tracking-luxe text-muted-foreground hover:text-foreground">Remove</button>
                    </div>
                  </div>
                </li>
              ))}

            </ul>
            <div className="border-t border-border p-5">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span><span>{formatMoney(subtotal)}</span>
              </div>
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>Deposit due today (50%)</span><span>{formatMoney(subtotal * 0.5)}</span>
              </div>
              <Link to="/checkout" onClick={onClose} className="mt-4 block bg-foreground py-3 text-center text-[11px] tracking-luxe text-background">
                Checkout (preorder)
              </Link>
              <Link to="/cart" onClick={onClose} className="mt-2 block py-2 text-center text-[10px] tracking-luxe text-muted-foreground hover:text-foreground">
                View full bag
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );

  return createPortal(node, document.body);
}
