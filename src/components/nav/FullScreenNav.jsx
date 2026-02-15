import React, { useContext, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { NavbarContext } from "../../context/NavContext";
import { lockBodyScroll, unlockBodyScroll } from "../../utils/scrollLock";

const MENU = [
  { title: "About Us", href: "/about" },
  { title: "Portfolio", href: "/portfolio" },
  { title: "Markets & Regions", href: "/markets-regions" },
  { title: "Contact", href: "/contact" },
];

const COVER_MS = 610;

export default function FullScreenNav() {
  const { navOpen, setNavOpen } = useContext(NavbarContext);
  const navigate = useNavigate();
  const location = useLocation();

  const closeTimerRef = useRef(null);

  const rootRef = useRef(null);
  const panelRef = useRef(null);
  const backdropRef = useRef(null);

  const tlRef = useRef(null);
  const mountedRef = useRef(false);

  /* ✅ BODY SCROLL LOCK (gap-safe + ref-counted) */
  useEffect(() => {
    if (navOpen) lockBodyScroll();
    else unlockBodyScroll();

    return () => {
      // ensures lock is released if component unmounts mid-open
      if (navOpen) unlockBodyScroll();
    };
  }, [navOpen]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      if (tlRef.current) tlRef.current.kill();
    };
  }, []);

  /* ✅ close nav on route change */
  useEffect(() => {
    if (!navOpen) return;

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    setNavOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleNavigate = (href) => {
    window.dispatchEvent(new CustomEvent("ye:route-start"));

    if (href === location.pathname) {
      setNavOpen(false);
      return;
    }

    navigate(href);

    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setNavOpen(false), COVER_MS);
  };

  /* ───────── ENTRANCE / EXIT (INTERRUPTIBLE) ───────── */
  useEffect(() => {
    const root = rootRef.current;
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    if (!root || !panel || !backdrop) return;

    if (!mountedRef.current) {
      mountedRef.current = true;

      gsap.set(root, { pointerEvents: "none" });
      gsap.set(backdrop, { opacity: 0 });
      gsap.set(panel, { yPercent: -8, opacity: 0, filter: "blur(6px)" });
    }

    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }

    if (navOpen) {
      gsap.set(root, { pointerEvents: "auto" });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.to(backdrop, { opacity: 1, duration: 0.35, overwrite: "auto" }, 0);
      tl.to(
        panel,
        {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.7,
          overwrite: "auto",
        },
        0
      );

      tlRef.current = tl;
    } else {
      gsap.set(root, { pointerEvents: "auto" });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => {
          gsap.set(root, { pointerEvents: "none" });
        },
      });

      tl.to(
        panel,
        {
          yPercent: -6,
          opacity: 0,
          filter: "blur(6px)",
          duration: 0.35,
          overwrite: "auto",
        },
        0
      );
      tl.to(backdrop, { opacity: 0, duration: 0.25, overwrite: "auto" }, 0.05);

      tlRef.current = tl;
    }
  }, [navOpen]);

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100001]">
      <button
        ref={backdropRef}
        aria-label="Close menu"
        onClick={() => setNavOpen(false)}
        className="absolute inset-0 bg-black/35"
        type="button"
      />

      <div
        ref={panelRef}
        className="
          absolute top-0 left-0 right-0
          h-[60vh] min-h-[480px] max-h-[640px]
          bg-white
          border-b border-black/10
          shadow-[0_30px_80px_rgba(0,0,0,0.18)]
          overflow-hidden
          flex items-center justify-center
        "
      >
        <nav className="w-full pt-28 sm:pt-32 pb-12 relative z-10">
          <ul className="flex flex-col items-center justify-center gap-6 sm:gap-8 text-center">
            {MENU.map((item) => (
              <li key={item.href}>
                <button
                  type="button"
                  onClick={() => handleNavigate(item.href)}
                  className="
                    uppercase
                    tracking-[0.22em]
                    text-[#0b0b10]
                    text-[clamp(22px,3vw,36px)]
                    font-medium
                    transition-all duration-300 ease-out
                    hover:text-[#ff6a00]
                    hover:font-bold
                    focus:outline-none
                  "
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="pointer-events-none absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </div>
    </div>
  );
}
