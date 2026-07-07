"use client";

import { useEffect, useRef, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  origin: string;
  date: string;
};

export default function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    function updateState() {
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(el.scrollLeft < maxScroll - 4);

      const progress = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
      setActiveIndex(Math.round(progress * (testimonials.length - 1)));
    }

    updateState();
    el.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);
    return () => {
      el.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
    };
  }, [testimonials.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let dragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    function onPointerDown(e: PointerEvent) {
      if (e.pointerType !== "mouse" || !el) return;
      dragging = true;
      startX = e.clientX;
      startScrollLeft = el.scrollLeft;
      el.style.cursor = "grabbing";
      setIsDragging(true);
      el.setPointerCapture(e.pointerId);
      e.preventDefault();
    }

    function onPointerMove(e: PointerEvent) {
      if (!dragging || !el) return;
      el.scrollLeft = startScrollLeft - (e.clientX - startX);
    }

    function onPointerUp() {
      if (!dragging || !el) return;
      dragging = false;
      el.style.cursor = "grab";
      setIsDragging(false);

      const maxScroll = el.scrollWidth - el.clientWidth;
      const progress = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
      const nearest = Math.round(progress * (testimonials.length - 1));
      const target =
        maxScroll > 0 ? (nearest / (testimonials.length - 1)) * maxScroll : 0;
      requestAnimationFrame(() => {
        el.scrollTo({ left: target, behavior: "smooth" });
      });
    }

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [testimonials.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || testimonials.length < 2) return;

    let timer: ReturnType<typeof setInterval>;

    function startTimer() {
      clearInterval(timer);
      timer = setInterval(() => {
        if (!el) return;
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll <= 0) return;
        const progress = el.scrollLeft / maxScroll;
        const current = Math.round(progress * (testimonials.length - 1));
        const next = (current + 1) % testimonials.length;
        const target = (next / (testimonials.length - 1)) * maxScroll;
        el.scrollTo({ left: target, behavior: "smooth" });
      }, 10000);
    }

    startTimer();
    el.addEventListener("scroll", startTimer, { passive: true });
    return () => {
      clearInterval(timer);
      el.removeEventListener("scroll", startTimer);
    };
  }, [testimonials.length]);

  return (
    <div>
      <div className="relative">
        {canScrollLeft && (
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-neutral-50 to-transparent sm:w-16" />
        )}
        {canScrollRight && (
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-neutral-50 to-transparent sm:w-16" />
        )}
        <div
          ref={scrollRef}
          className={`no-scrollbar flex cursor-grab gap-6 overflow-x-auto px-[calc(50%-9rem)] pb-2 md:px-[calc(50%-12rem)] ${
            isDragging ? "" : "snap-x snap-mandatory scroll-smooth"
          }`}
        >
          {testimonials.map((item) => (
            <figure
              key={`${item.name}-${item.date}`}
              className="flex w-72 shrink-0 snap-center flex-col rounded-2xl bg-white p-6 shadow-sm md:w-96"
            >
              <blockquote className="flex-1 text-sm leading-relaxed text-neutral-600">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 flex items-center justify-between gap-2 text-sm">
                <span className="font-semibold text-neutral-900">
                  {item.name}
                  <span className="ml-1 font-normal text-neutral-400">
                    · {item.origin}
                  </span>
                </span>
                <span className="shrink-0 text-xs text-neutral-400">
                  {item.date.replaceAll("-", ".")}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {testimonials.map((item, index) => (
          <span
            key={`${item.name}-${item.date}-dot`}
            className={`h-1.5 rounded-full transition-all ${
              index === activeIndex
                ? "w-4 bg-rose-600"
                : "w-1.5 bg-neutral-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
