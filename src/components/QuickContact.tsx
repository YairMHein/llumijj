import { useState } from "react";
import { MessageCircle, Phone, Send, X } from "lucide-react";

const options = [
  { label: "Phone", href: "tel:+9595093144", Icon: Phone, hint: "+959-5093144" },
  { label: "Messenger", href: "https://m.me/llumijewellery", Icon: MessageCircle, hint: "LLUMI - ယူမီ" },
  { label: "Viber", href: "viber://chat?number=%2B9595093144", Icon: ViberIcon, hint: "+959-5093144" },
  { label: "Telegram", href: "https://t.me/llumijewellery", Icon: Send, hint: "LLUMI - ယူမီ" },
];

function ViberIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.48 2 2 5.7 2 10.27c0 2.62 1.47 4.94 3.76 6.46-.1.84-.6 3-.7 3.49 0 0-.02.15.09.21.1.06.23.01.23.01.34-.05 3.95-2.6 4.57-3.02.66.1 1.34.16 2.05.16 5.52 0 10-3.7 10-8.27S17.52 2 12 2zm5.61 11.34c-.16.47-.95 1-1.4 1.07-.38.06-.86.08-1.39-.09-.32-.1-.74-.24-1.27-.47-2.24-.97-3.7-3.23-3.81-3.38-.11-.15-.92-1.22-.92-2.33s.58-1.66.78-1.88c.2-.22.44-.28.59-.28h.42c.14 0 .33-.05.51.39.19.46.64 1.6.7 1.71.06.11.1.25.02.4-.08.15-.12.24-.24.37-.12.13-.25.3-.36.4-.12.12-.24.25-.1.49.14.24.62 1.03 1.34 1.67.92.82 1.7 1.07 1.94 1.19.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.59-.1 1.06z" />
    </svg>
  );
}

export function QuickContact() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
      {open && (
        <ul className="flex flex-col items-end gap-2">
          {options.map(({ label, href, Icon, hint }, i) => (
            <li
              key={label}
              className="animate-slide-down"
              style={{ animationDelay: `${i * 40}ms`, animationFillMode: "both" }}
            >
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-full border border-border bg-background py-2 pl-4 pr-2 text-xs shadow-md transition hover:bg-foreground hover:text-background"
              >
                <span className="flex flex-col items-end leading-tight">
                  <span className="tracking-luxe text-[10px]">{label}</span>
                  <span className="text-[10px] opacity-70">{hint}</span>
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-foreground text-background group-hover:bg-background group-hover:text-foreground">
                  <Icon className="h-4 w-4" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Quick contact"
        className="group grid h-14 w-14 place-items-center rounded-full bg-foreground text-background shadow-lg transition hover:scale-105"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        {!open && (
          <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-full bg-foreground/90 px-3 py-1 text-[10px] tracking-luxe text-background opacity-0 transition group-hover:opacity-100">
            Quick contact
          </span>
        )}
      </button>
    </div>
  );
}
