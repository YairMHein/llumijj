import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { X } from "lucide-react";
import p1 from "@/assets/catalog-page-1.jpg.asset.json";
import p2 from "@/assets/catalog-page-2.jpg.asset.json";
import p3 from "@/assets/catalog-page-3.jpg.asset.json";
import p4 from "@/assets/catalog-page-4.jpg.asset.json";
import p5 from "@/assets/catalog-page-5.jpg.asset.json";
import p6 from "@/assets/catalog-page-6.jpg.asset.json";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Catalog — LLUMI Jewellery" },
      { name: "description", content: "Browse the LLUMI jewellery catalog as an interactive flip book." },
      { property: "og:title", content: "Catalog — LLUMI Jewellery" },
      { property: "og:description", content: "Browse the LLUMI jewellery catalog as an interactive flip book." },
    ],
  }),
  component: CatalogPage,
});

const pages = [p1.url, p2.url, p3.url, p4.url, p5.url, p6.url];

function CatalogPage() {
  const bookRef = useRef<any>(null);
  const [current, setCurrent] = useState(0);
  const [size, setSize] = useState({ w: 400, h: 517 });

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const pageAspect = 612 / 792; // portrait page width / height
      const controlsH = 72;
      const paddingX = 32;
      const paddingY = 24;
      const maxSpreadW = vw - paddingX;
      const maxPageH = vh - paddingY - controlsH;

      // Fit spread (2 pages side by side) into viewport
      const pageH_from_w = maxSpreadW / (2 * pageAspect);
      let w: number;
      let h: number;
      if (pageH_from_w <= maxPageH) {
        h = pageH_from_w;
        w = h * pageAspect;
      } else {
        h = maxPageH;
        w = h * pageAspect;
      }
      setSize({ w: Math.max(200, Math.floor(w)), h: Math.max(260, Math.floor(h)) });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        bookRef.current?.pageFlip()?.flipNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        bookRef.current?.pageFlip()?.flipPrev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const goPrev = () => bookRef.current?.pageFlip()?.flipPrev();
  const goNext = () => bookRef.current?.pageFlip()?.flipNext();

  const spreadIndex = current === 0 ? 0 : Math.ceil(current / 2);
  const totalSpreads = Math.ceil(pages.length / 2);

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-black">
      {/* Close */}
      <Link
        to="/"
        className="absolute left-4 top-4 z-50 flex items-center gap-2 text-[11px] tracking-luxe text-white/60 transition hover:text-white"
      >
        <X className="h-4 w-4" />
        CLOSE
      </Link>

      {/* Logo */}
      <div className="absolute left-1/2 top-4 z-50 -translate-x-1/2 text-[11px] tracking-[0.3em] text-white/60">
        LLUMI
      </div>

      {/* Book */}
      <div className="flex items-center justify-center">
        <HTMLFlipBook
          ref={bookRef}
          width={size.w}
          height={size.h}
          size="stretch"
          minWidth={200}
          maxWidth={600}
          minHeight={260}
          maxHeight={900}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          drawShadow={true}
          flippingTime={800}
          usePortrait={false}
          startZIndex={0}
          autoSize={false}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
          className=""
          style={{}}
          startPage={0}
          onFlip={(e: any) => setCurrent(e.data)}
        >
          {pages.map((src, i) => (
            <div key={i} className="bg-white">
              <img
                src={src}
                alt={`Catalog page ${i + 1}`}
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 z-50 flex items-center gap-6 text-white">
        <button
          onClick={goPrev}
          className="rounded-full border border-white/20 px-4 py-2 text-[11px] tracking-luxe transition hover:bg-white hover:text-black"
        >
          ← PREV
        </button>
        <span className="text-[11px] tracking-luxe text-white/50">
          {spreadIndex + 1} / {totalSpreads}
        </span>
        <button
          onClick={goNext}
          className="rounded-full border border-white/20 px-4 py-2 text-[11px] tracking-luxe transition hover:bg-white hover:text-black"
        >
          NEXT →
        </button>
      </div>
    </div>
  );
}
