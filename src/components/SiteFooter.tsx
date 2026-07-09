import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail } from "lucide-react";
// Logo removed — footer now text-only

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19.6 6.6a5.4 5.4 0 0 1-3.2-1V15a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.7a2.9 2.9 0 1 0 2 2.8V2h2.6a5.4 5.4 0 0 0 3.3 5v2.6c.6.1 1.4.1 2 0V6.6h-2z" />
    </svg>
  );
}

function VisaMark() {
  return (
    <span className="flex h-7 w-12 items-center justify-center rounded-sm bg-white text-[10px] font-bold italic tracking-tight text-[#1a1f71]">VISA</span>
  );
}
function MasterMark() {
  return (
    <span className="flex h-7 w-12 items-center justify-center gap-0 rounded-sm bg-white px-1.5">
      <span className="block h-4 w-4 rounded-full bg-[#eb001b]" />
      <span className="-ml-1.5 block h-4 w-4 rounded-full bg-[#f79e1b] mix-blend-multiply" />
    </span>
  );
}
function KbzPayMark() {
  return (
    <span className="flex h-7 items-center justify-center rounded-sm bg-white px-2 text-[10px] font-bold tracking-tight text-[#0a4d8c]">KBZ Pay</span>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border text-background" style={{ backgroundColor: "#930f31" }}>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4 md:px-8">
        <div className="md:col-span-1">
          <span className="font-serif text-xl">LLUMI</span>
          <p className="mt-4 max-w-sm font-serif text-2xl leading-tight">Wear your story.</p>
          <p className="mt-3 max-w-sm text-sm text-background/70">
            Heirloom-quality 925 silver jewellery, crafted in small batches and finished by hand.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="https://facebook.com/llumi" target="_blank" rel="noreferrer" aria-label="Facebook" className="inline-flex h-9 w-9 items-center justify-center text-background/80 hover:text-background">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="https://instagram.com/llumi" target="_blank" rel="noreferrer" aria-label="Instagram" className="inline-flex h-9 w-9 items-center justify-center text-background/80 hover:text-background">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://tiktok.com/@llumi" target="_blank" rel="noreferrer" aria-label="TikTok" className="inline-flex h-9 w-9 items-center justify-center text-background/80 hover:text-background">
              <TikTokIcon className="h-4 w-4" />
            </a>
          </div>
          <a href="mailto:hello@llumi.com" className="mt-4 inline-flex items-center gap-2 text-sm text-background/80 hover:text-background">
            <Mail className="h-4 w-4" />
            <span>hello@llumi.com</span>
          </a>
        </div>

        <div>
          <h4 className="text-[11px] tracking-luxe text-background/60">Shop</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/shop" search={{ category: "earrings" }}>Earrings</Link></li>
            <li><Link to="/shop" search={{ category: "necklaces" }}>Necklaces</Link></li>
            <li><Link to="/shop" search={{ category: "rings" }}>Rings</Link></li>
            <li><Link to="/sale">Sale</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] tracking-luxe text-background/60">Customer care</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/ring-size-guide">Ring size guide</Link></li>
            <li><Link to="/lifetime-care">Lifetime care</Link></li>
            <li><Link to="/trade-in">Trade-in program</Link></li>
            <li><Link to="/shipping">Shipping & FAQ</Link></li>
            <li><Link to="/contact">Contact us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] tracking-luxe text-background/60">House</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/why-llumi">Why LLUMI</Link></li>
            <li><Link to="/privacy">Privacy policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-5 text-xs text-background/60 md:flex-row md:px-8">
          <span>© {new Date().getFullYear()} LLUMI Jewellery. All rights reserved.</span>
          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-luxe text-background/50">We accept</span>
            <VisaMark />
            <MasterMark />
            <KbzPayMark />
          </div>
        </div>
      </div>
    </footer>
  );
}
