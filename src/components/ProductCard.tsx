import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { type Product, sortedPhotos } from "@/lib/products";
import { formatMoney, useCart } from "@/lib/cart";

export function ProductCard({ product, hideBadge = false }: { product: Product; hideBadge?: boolean }) {
  const onSale = product.sale_price != null;
  const display = onSale ? Number(product.sale_price) : Number(product.price);
  const { add } = useCart();
  const photos = sortedPhotos(product);
  const base = photos[0]?.image_url;
  const worn = photos[1]?.image_url;

  return (
    <div className="group block">
      <Link to="/product/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          {base && (
            <img
              src={base}
              alt={product.name}
              loading="lazy"
              width={1024}
              height={1280}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${worn ? "group-hover:opacity-0" : ""}`}
            />
          )}
          {worn && (
            <img
              src={worn}
              alt={`${product.name} worn`}
              loading="lazy"
              width={1024}
              height={1280}
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
          {onSale && !hideBadge && (
            <span className="absolute left-3 top-3 z-10 bg-sale px-2 py-1 text-[10px] tracking-luxe text-sale-foreground">
              Sale
            </span>
          )}
        </div>
        <div className="mt-4">
          <h3 className="font-serif text-lg leading-tight">{product.name}</h3>
          <div className="mt-1 text-sm">
            {onSale ? (
              <>
                <span className="text-muted-foreground line-through">{formatMoney(Number(product.price))}</span>
                <span className="ml-2 font-medium">{formatMoney(display)}</span>
              </>
            ) : (
              <span className="font-medium">{formatMoney(display)}</span>
            )}
          </div>
          <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{product.material}</p>
        </div>
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          add({ id: product.id, slug: product.slug, name: product.name, price: display, image_url: product.image_url });
          toast.success("Added to bag");
        }}
        className="mt-3 w-full border border-foreground py-2 text-[11px] tracking-luxe transition-colors hover:bg-foreground hover:text-background"
      >
        Add to cart
      </button>
    </div>
  );
}
