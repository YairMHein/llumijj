import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "llumi-cookie-consent";

type Consent = "accepted" | "declined";

export function getCookieConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "accepted" || v === "declined" ? v : null;
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getCookieConsent() === null) setVisible(true);
  }, []);

  function set(value: Consent) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-background/95 shadow-lg backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="pr-6 text-sm text-foreground/80">
          <p className="font-serif text-lg text-foreground">We use cookies</p>
          <p className="mt-1 text-[13px] text-muted-foreground">
            We use cookies to enhance your browsing, remember your cart, and analyze site traffic. See our{" "}
            <a href="/privacy" className="underline hover:text-foreground">privacy policy</a> for details.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => set("declined")}
            className="border border-border px-4 py-2.5 text-[11px] tracking-luxe text-foreground/80 hover:text-foreground"
          >
            Decline
          </button>
          <button
            onClick={() => set("accepted")}
            className="bg-foreground px-5 py-2.5 text-[11px] tracking-luxe text-background hover:opacity-90"
          >
            Allow cookies
          </button>
          <button
            onClick={() => set("declined")}
            aria-label="Dismiss"
            className="ml-1 inline-flex h-8 w-8 items-center justify-center text-foreground/60 hover:text-foreground md:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
