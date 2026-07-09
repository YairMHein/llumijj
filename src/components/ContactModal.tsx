import { MessageCircle, Phone, Send, X } from "lucide-react";

const options = [
  { label: "Phone", href: "tel:+959000000000", Icon: Phone, hint: "+95 9 000 000 000" },
  { label: "Messenger", href: "https://m.me/llumi", Icon: MessageCircle, hint: "@LLUMI" },
  { label: "Viber", href: "viber://chat?number=%2B959000000000", Icon: ViberIcon, hint: "+95 9 000 000 000" },
  { label: "Telegram", href: "https://t.me/llumi", Icon: Send, hint: "@LLUMI" },
];

function ViberIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.48 2 2 5.7 2 10.27c0 2.62 1.47 4.94 3.76 6.46-.1.84-.6 3-.7 3.49 0 0-.02.15.09.21.1.06.23.01.23.01.34-.05 3.95-2.6 4.57-3.02.66.1 1.34.16 2.05.16 5.52 0 10-3.7 10-8.27S17.52 2 12 2zm5.61 11.34c-.16.47-.95 1-1.4 1.07-.38.06-.86.08-1.39-.09-.32-.1-.74-.24-1.27-.47-2.24-.97-3.7-3.23-3.81-3.38-.11-.15-.92-1.22-.92-2.33s.58-1.66.78-1.88c.2-.22.44-.28.59-.28h.42c.14 0 .33-.05.51.39.19.46.64 1.6.7 1.71.06.11.1.25.02.4-.08.15-.12.24-.24.37-.12.13-.25.3-.36.4-.12.12-.24.25-.1.49.14.24.62 1.03 1.34 1.67.92.82 1.7 1.07 1.94 1.19.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.59-.1 1.06z" />
    </svg>
  );
}

export function ContactModal({
  open,
  onClose,
  title = "Get in touch",
  subtitle = "Reach us on any of these channels — we usually reply within the hour.",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-foreground/40 p-4" onClick={onClose}>
      <div
        className="relative w-full max-w-md border border-border bg-background p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
        <p className="text-[11px] tracking-luxe text-muted-foreground">LLUMI</p>
        <h2 className="mt-2 font-serif text-2xl">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        <ul className="mt-6 grid gap-2">
          {options.map(({ label, href, Icon, hint }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 border border-border px-4 py-3 transition-colors hover:bg-foreground hover:text-background"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-foreground text-background group-hover:bg-background group-hover:text-foreground">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[11px] tracking-luxe">{label}</span>
                  <span className="text-xs opacity-70">{hint}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
