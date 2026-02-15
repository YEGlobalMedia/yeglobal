import React, { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "locomotive-scroll/dist/locomotive-scroll.css";

export default function LocomotiveProvider({ children }) {
  const containerRef = useRef(null);
  const locoRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // Premium rule: respect reduced motion + keep mobile native for stability
    if (reduceMotion || isMobile) return;

    let rafId = null;
    let t1 = null;
    let t2 = null;
    let t3 = null;

    const syncIO = () => {
      // keep Framer / IntersectionObserver in sync with transform scroll
      window.dispatchEvent(new Event("scroll"));
      window.dispatchEvent(new Event("resize"));
    };

    try {
      locoRef.current = new LocomotiveScroll({
        el: containerRef.current,
        smooth: true,

        // Premium feel tuning
        lerp: 0.055,
        multiplier: 0.7,

        getDirection: true,
        getSpeed: true,

        smartphone: { smooth: false },
        tablet: { smooth: false },
      });

      const scroll = locoRef.current;
      if (!scroll || typeof scroll.update !== "function") return;

      const onLocoScroll = (args) => {
        window.dispatchEvent(
          new CustomEvent("ye:loco-scroll", { detail: { y: args?.scroll?.y ?? 0 } })
        );
        syncIO();
      };

      scroll.on("scroll", onLocoScroll);

      // ✅ hard reset helper (used for logo nav)
      const hardResetToTop = () => {
        // native fallback
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        // locomotive hard jump
        scroll.scrollTo(0, { duration: 0, disableLerp: true });

        requestAnimationFrame(() => {
          scroll.update();
          syncIO();
          ScrollTrigger.refresh(true);
        });
      };

      // ✅ listen specifically for logo-home reset
      const onLogoHome = () => hardResetToTop();
      window.addEventListener("ye:logo-home", onLogoHome);

      // ✅ Reset to top on any page navigation
      const onNavComplete = () => hardResetToTop();
      window.addEventListener("ye:navigation-complete", onNavComplete);

      // Initial settle
      requestAnimationFrame(() => {
        scroll.update();
        syncIO();
        ScrollTrigger.refresh(true);
      });

      // Delayed settles (fonts/images/layout)
      t1 = setTimeout(() => {
        scroll.update();
        syncIO();
        ScrollTrigger.refresh(true);
      }, 60);

      t2 = setTimeout(() => {
        scroll.update();
        syncIO();
        ScrollTrigger.refresh(true);
      }, 450);

      t3 = setTimeout(() => {
        scroll.update();
        syncIO();
        ScrollTrigger.refresh(true);
      }, 1200);

      const onResize = () => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          scroll.update();
          syncIO();
          ScrollTrigger.refresh(true);
        });
      };
      window.addEventListener("resize", onResize);

      const onLoad = () => {
        scroll.update();
        syncIO();
        ScrollTrigger.refresh(true);
      };
      window.addEventListener("load", onLoad);

      return () => {
        if (t1) clearTimeout(t1);
        if (t2) clearTimeout(t2);
        if (t3) clearTimeout(t3);

        window.removeEventListener("resize", onResize);
        window.removeEventListener("load", onLoad);
        window.removeEventListener("ye:logo-home", onLogoHome);
        window.removeEventListener("ye:navigation-complete", onNavComplete);

        if (rafId) cancelAnimationFrame(rafId);

        scroll.off("scroll", onLocoScroll);
        scroll.destroy();
        locoRef.current = null;
      };
    } catch (error) {
      console.error("Error initializing Locomotive Scroll:", error);
      return () => {
        if (t1) clearTimeout(t1);
        if (t2) clearTimeout(t2);
        if (t3) clearTimeout(t3);
        if (rafId) cancelAnimationFrame(rafId);

        if (locoRef.current && typeof locoRef.current.destroy === "function") {
          locoRef.current.destroy();
          locoRef.current = null;
        }
      };
    }
  }, []);

  return (
    <div ref={containerRef} data-scroll-container className="min-h-screen">
      {children}
    </div>
  );
}
