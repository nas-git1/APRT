"use client";

import { useEffect, useRef, useState } from "react";

type MobileCarouselProps = {
  items: React.ReactNode[];
  label: string;
  itemWidthClassName?: string;
};

export function MobileCarousel({ items, label, itemWidthClassName = "w-[86%]" }: MobileCarouselProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const children = Array.from(el.children) as HTMLElement[];
      if (children.length === 0) return;
      const midpoint = el.scrollLeft + el.clientWidth / 2;
      let closest = 0;
      let minDist = Number.POSITIVE_INFINITY;
      children.forEach((child, idx) => {
        const center = child.offsetLeft + child.clientWidth / 2;
        const dist = Math.abs(center - midpoint);
        if (dist < minDist) {
          minDist = dist;
          closest = idx;
        }
      });
      setActiveIndex(closest);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToIndex = (index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    const target = children[index];
    if (!target) return;
    el.scrollTo({ left: target.offsetLeft - 8, behavior: "smooth" });
    setActiveIndex(index);
  };

  return (
    <div className="md:hidden">
      <div
        ref={containerRef}
        aria-label={label}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, idx) => (
          <div key={idx} className={`shrink-0 snap-center ${itemWidthClassName}`}>
            {item}
          </div>
        ))}
      </div>

      <div className="mt-1 flex items-center justify-center gap-2">
        <button
          type="button"
          aria-label="Précédent"
          onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-700"
        >
          ‹
        </button>
        <div className="flex items-center gap-1.5">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Aller à ${idx + 1}`}
              onClick={() => scrollToIndex(idx)}
              className={`h-2.5 rounded-full transition ${idx === activeIndex ? "w-5 bg-brand-500" : "w-2.5 bg-brand-200"}`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Suivant"
          onClick={() => scrollToIndex(Math.min(items.length - 1, activeIndex + 1))}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-700"
        >
          ›
        </button>
      </div>
    </div>
  );
}
