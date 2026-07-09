import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function Preloader() {
  const isLoading = useRouterState({
    select: (s) => {
      const pending = (s.isLoading || s.isTransitioning) && s.location.pathname !== "/login";
      return pending;
    },
  });
  const [visible, setVisible] = useState(true);
  const [initial, setInitial] = useState(true);

  // Initial mount: show briefly, then fade out.
  useEffect(() => {
    const t = setTimeout(() => {
      setInitial(false);
      setVisible(false);
    }, 700);
    return () => clearTimeout(t);
  }, []);

  // Show on subsequent route transitions.
  useEffect(() => {
    if (initial) return;
    if (isLoading) {
      setVisible(true);
    } else {
      const t = setTimeout(() => setVisible(false), 250);
      return () => clearTimeout(t);
    }
  }, [isLoading, initial]);

  return (
    <div
      aria-hidden={!visible}
      className={`pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="flex items-end gap-1 font-serif text-5xl tracking-[0.2em] text-foreground md:text-6xl">
        {"LLUMI".split("").map((l, i) => (
          <span
            key={i}
            className="preloader-letter inline-block"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
