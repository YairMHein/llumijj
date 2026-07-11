import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, User, Menu, X, Facebook, Instagram } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { CartDrawer } from "./CartDrawer";
import { SearchPanel } from "./SearchPanel";
import logo from "@/assets/llumi-logo-primary.png";

const navLinks = [
  { to: "/sale", label: "Sale" },
  { to: "/collections", label: "Collections" },
  { to: "/new-arrivals", label: "New Arrivals" },
  //{ to: "/best-sellers", label: "Best Sellers" },
  { to: "/why-llumi", label: "Why LLUMI" },
] as const;

const shopLinks = [
  { to: "/shop", label: "ALL JEWELRIES", search: undefined as string | undefined },
  { to: "/shop", label: "Earrings", search: "earrings" },
  { to: "/shop", label: "Necklaces", search: "necklaces" },
  { to: "/shop", label: "Rings", search: "rings" },
  { to: "/shop", label: "Bracelets", search: "bracelets" },
] as const;

const supportLinks = [
  { to: "/shipping", label: "Shipping & FAQ" },
  { to: "/ring-size-guide", label: "Ring size guide" },
  { to: "/lifetime-care", label: "Lifetime care" },
  { to: "/trade-in", label: "Trade-in program" },
  { to: "/contact", label: "Contact us" },
] as const;

const socials = [
  { href: "https://facebook.com/llumijewellery", label: "Facebook", Icon: Facebook },
  { href: "https://instagram.com/llumijewellery", label: "Instagram", Icon: Instagram },
  { href: "https://tiktok.com/@llumi.silver", label: "TikTok", Icon: TikTokIcon },
];

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19.6 6.6a5.4 5.4 0 0 1-3.2-1V15a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.7a2.9 2.9 0 1 0 2 2.8V2h2.6a5.4 5.4 0 0 0 3.3 5v2.6c.6.1 1.4.1 2 0V6.6h-2z" />
    </svg>
  );
}

export function SiteHeader() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center px-5 md:px-8">
        <button
          className="mr-3 inline-flex h-9 w-9 items-center justify-center md:hidden"
          aria-label="Open menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div className="hidden flex-1 items-center gap-3 md:flex">
          {socials.map(({ href, label, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
              className="inline-flex h-8 w-8 items-center justify-center text-foreground/70 transition-colors hover:text-foreground">
              <Icon className="h-[16px] w-[16px]" />
            </a>
          ))}
        </div>

        <Link to="/" className="mx-auto flex items-center gap-2">
          <img src={logo} alt="" className="h-7 w-7" />
          <span className="font-serif text-2xl tracking-widest">LLUMI</span>
        </Link>

        <div className="ml-auto flex flex-1 items-center justify-end gap-1">
          <button onClick={() => setSearchOpen((s) => !s)} aria-label="Search" className="inline-flex h-9 w-9 items-center justify-center text-foreground/80 hover:text-foreground">
            <Search className="h-[18px] w-[18px]" />
          </button>
          {/*<a href="/login" aria-label="Account" className="inline-flex h-9 w-9 items-center justify-center text-foreground/80 hover:text-foreground">
            <User className="h-[18px] w-[18px]" />
          </a>*/}
          <button onClick={() => setCartOpen(true)} aria-label="Cart" className="relative inline-flex h-9 w-9 items-center justify-center text-foreground/80 hover:text-foreground">
            <ShoppingBag className="h-[18px] w-[18px]" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-medium text-background">
                {count}
              </span>
            )}
          </button>
        </div>

        <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
      </div>

      <nav className="hidden border-t border-border md:block">
        <ul className="mx-auto flex max-w-7xl items-center justify-center gap-10 px-8 py-3 text-[12px] tracking-luxe text-foreground/75">
          <li>
            <Link to="/sale" className="transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>Sale</Link>
          </li>
          <li>
            <Link to="/collections" className="transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>Collections</Link>
          </li>
          <li>
            <Link to="/new-arrivals" className="transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>New Arrivals</Link>
          </li>
          {/* <li>
            <Link to="/best-sellers" className="transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>Best Sellers</Link>
          </li> */}
          <li className="group relative">
            <button type="button" className="uppercase transition-colors hover:text-foreground">Shop</button>
            <div className="invisible absolute left-1/2 top-full z-50 mt-2 w-56 -translate-x-1/2 border border-border bg-background p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
              {shopLinks.map((s) => (
                <Link
                  key={s.label}
                  to="/shop"
                  search={s.search ? { category: s.search } : {}}
                  className="block px-3 py-2 text-[11px] tracking-luxe text-foreground/75 hover:bg-muted hover:text-foreground"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </li>
          <li>
            <Link to="/why-llumi" className="transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>Why LLUMI</Link>
          </li>
          <li className="group relative">
            <button type="button" className="uppercase transition-colors hover:text-foreground">Support</button>
            <div className="invisible absolute left-1/2 top-full z-50 mt-2 w-56 -translate-x-1/2 border border-border bg-background p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
              {supportLinks.map((s) => (
                <Link key={s.to} to={s.to} className="block px-3 py-2 text-[11px] tracking-luxe text-foreground/75 hover:bg-muted hover:text-foreground">
                  {s.label}
                </Link>
              ))}
            </div>
          </li>
        </ul>
      </nav>

      {open && (
        <div className="border-t border-border md:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-5 py-3 text-sm">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} onClick={() => setOpen(false)} className="block py-2.5 tracking-luxe text-[12px] text-foreground/80">
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="border-t border-border pt-2 mt-2 text-[10px] tracking-luxe text-muted-foreground">Shop</li>
            {shopLinks.map((s) => (
              <li key={s.label}>
                <Link
                  to="/shop"
                  search={s.search ? { category: s.search } : {}}
                  onClick={() => setOpen(false)}
                  className="block py-2 pl-3 tracking-luxe text-[12px] text-foreground/80"
                >
                  {s.label}
                </Link>
              </li>
            ))}
            <li className="border-t border-border pt-2 mt-2 text-[10px] tracking-luxe text-muted-foreground">Support</li>
            {supportLinks.map((s) => (
              <li key={s.to}>
                <Link to={s.to} onClick={() => setOpen(false)} className="block py-2 pl-3 tracking-luxe text-[12px] text-foreground/80">
                  {s.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 flex gap-3 border-t border-border pt-3">
              {socials.map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="inline-flex h-9 w-9 items-center justify-center text-foreground/70">
                  <Icon className="h-[16px] w-[16px]" />
                </a>
              ))}
            </li>
          </ul>
        </div>
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
