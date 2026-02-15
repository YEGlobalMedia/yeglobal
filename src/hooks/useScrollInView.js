import { useEffect, useRef, useState } from "react";

/**
 * Detects when an element enters the viewport.
 *
 * • Mobile / native-scroll → IntersectionObserver (reliable, battery-friendly)
 * • Desktop with Locomotive  → manual getBoundingClientRect on scroll events
 *   (Locomotive uses CSS transforms, which IO can't track)
 *
 * @param {object}  options
 * @param {boolean} options.once      - Stop checking after first trigger (default: true)
 * @param {number}  options.amount    - Fraction of element that must be visible (0–1, default: 0.2)
 * @param {number}  options.margin    - Shrink viewport bottom by this many px (default: 0)
 * @returns {{ ref: React.RefObject, inView: boolean }}
 */

const IS_MOBILE =
  typeof window !== "undefined" && window.innerWidth < 768;

export default function useScrollInView({
  once = true,
  amount = 0.2,
  margin = 0,
} = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const firedRef = useRef(false);

  // ─── IntersectionObserver path (mobile / native scroll) ───
  useEffect(() => {
    if (!IS_MOBILE) return;
    if (once && firedRef.current) return;

    const el = ref.current;
    if (!el) return;

    const threshold = Math.min(amount, 0.99); // IO clamps at 1.0

    const io = new IntersectionObserver(
      ([entry]) => {
        if (once && firedRef.current) return;

        if (entry.isIntersecting) {
          setInView(true);
          firedRef.current = true;
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      {
        threshold,
        // margin is ignored for IO path — the threshold alone is enough
        // on small screens; rootMargin can optionally be used instead
        rootMargin: margin ? `0px 0px -${margin}px 0px` : undefined,
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once, amount, margin]);

  // ─── Manual getBoundingClientRect path (desktop / Locomotive) ───
  useEffect(() => {
    if (IS_MOBILE) return;
    if (once && firedRef.current) return;

    const check = () => {
      if (once && firedRef.current) return;
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight - margin;

      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(vh, rect.bottom);
      const visibleH = Math.max(0, visibleBottom - visibleTop);
      const elH = rect.height || 1;

      if (visibleH / elH >= amount) {
        setInView(true);
        firedRef.current = true;
      } else if (!once) {
        setInView(false);
      }
    };

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("ye:loco-scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(check);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", check);
      window.removeEventListener("ye:loco-scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [once, amount, margin]);

  return { ref, inView };
}
