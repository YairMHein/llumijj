import logo from "@/assets/llumi-bw-bbg.png";
const messages = [
  "Grand Opening Sale — Up to 10% Off",
  "Lifetime Warranty on Every Piece",
  "Fast, Insured Shipping Nationwide",
  "Trade-In Program Available",
];

export function AnnouncementBar() {
  // Duplicate the list so the marquee loops seamlessly with -50% translate.
  const loop = [...messages, ...messages];
  return (
    <div className="overflow-hidden bg-foreground text-background">
      <div className="flex animate-marquee whitespace-nowrap py-2 text-[11px] tracking-luxe">
        {loop.map((m, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-8">
            {m}
            <img src={logo} alt="" className="h-4 w-4" />
            {/* <span aria-hidden className="opacity-40">✦</span> */}
          </span>
        ))}
      </div>
    </div>
  );
}
