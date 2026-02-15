import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { Link } from "react-router-dom";
import { NavbarContext } from "../../context/NavContext";
import YELogo from "../../assets/Favicon/Favicon.png";

const ROUTE_LOCK_MS = 900;
const SCROLL_THRESHOLD = 6;

const MenuTrigger = ({ siteReady = true }) => {
  const { navOpen, setNavOpen } = useContext(NavbarContext);

  const [entered, setEntered] = useState(false);

  const routeLockRef = useRef(false);
  const lockTimerRef = useRef(null);

  const navOpenRef = useRef(navOpen);
  useEffect(() => {
    navOpenRef.current = navOpen;
  }, [navOpen]);

  const barRef = useRef(null);
  const shownRef = useRef(true);

  /* ─────────────────────────────
     SHOW / HIDE (Mobile Safe)
  ───────────────────────────── */
  const show = useCallback(() => {
    if (shownRef.current) return;
    shownRef.current = true;
    const el = barRef.current;
    if (el) {
      el.style.transform = "translate3d(0,0,0)";
      el.style.opacity = "1";
    }
  }, []);

  const hide = useCallback(() => {
    if (!shownRef.current) return;
    shownRef.current = false;
    const el = barRef.current;
    if (el) {
      el.style.transform = "translate3d(0,-110%,0)";
      el.style.opacity = "0";
    }
  }, []);

  /* ─────────────────────────────
     Entrance Animation
  ───────────────────────────── */
  useEffect(() => {
    if (siteReady && !entered) {
      const t = setTimeout(() => setEntered(true), 120);
      return () => clearTimeout(t);
    }
  }, [siteReady, entered]);

  /* ─────────────────────────────
     Route Lock
  ───────────────────────────── */
  useEffect(() => {
    const onRouteStart = () => {
      routeLockRef.current = true;
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
      lockTimerRef.current = setTimeout(() => {
        routeLockRef.current = false;
      }, ROUTE_LOCK_MS);
    };

    window.addEventListener("ye:route-start", onRouteStart);
    return () => {
      window.removeEventListener("ye:route-start", onRouteStart);
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    };
  }, []);

  /* ─────────────────────────────
     Scroll Direction Detection
     (Works Desktop + Mobile)
  ───────────────────────────── */
  useEffect(() => {
    let lastScrollY = 0;
    let accDelta = 0;
    let rafId = 0;

    // ✅ Auto-detect the real scrollTop — works on every mobile browser
    const getScrollY = () => {
      const a = window.scrollY;
      const b = document.documentElement.scrollTop;
      const c = document.body.scrollTop;
      // On most browsers one of these is non-zero; take the max
      return Math.max(a || 0, b || 0, c || 0);
    };

    lastScrollY = getScrollY();

    const tick = () => {
      const y = getScrollY();

      if (navOpenRef.current) {
        show();
        lastScrollY = y;
        accDelta = 0;
        rafId = requestAnimationFrame(tick);
        return;
      }

      if (y <= 10) {
        show();
        lastScrollY = y;
        accDelta = 0;
        rafId = requestAnimationFrame(tick);
        return;
      }

      const delta = y - lastScrollY;
      lastScrollY = y;
      accDelta += delta;

      if (accDelta > SCROLL_THRESHOLD) {
        hide();
        accDelta = 0;
      } else if (accDelta < -SCROLL_THRESHOLD) {
        show();
        accDelta = 0;
      }

      rafId = requestAnimationFrame(tick);
    };

    // Locomotive custom event (desktop smooth scroll)
    const onLocoScroll = (e) => {
      const y = e.detail?.y ?? 0;

      if (navOpenRef.current) {
        show();
        return;
      }

      if (y <= 10) {
        show();
        return;
      }

      const delta = y - lastScrollY;
      lastScrollY = y;
      accDelta += delta;

      if (accDelta > SCROLL_THRESHOLD) {
        hide();
        accDelta = 0;
      } else if (accDelta < -SCROLL_THRESHOLD) {
        show();
        accDelta = 0;
      }
    };

    rafId = requestAnimationFrame(tick);
    window.addEventListener("ye:loco-scroll", onLocoScroll, {
      passive: true,
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("ye:loco-scroll", onLocoScroll);
    };
  }, [show, hide]);

  /* ─────────────────────────────
     Handlers
  ───────────────────────────── */
  const handleHamburger = () => {
    if (routeLockRef.current) return;
    setNavOpen((v) => !v);
  };

  const handleLogoClick = () => {
    if (navOpen) setNavOpen(false);
    window.dispatchEvent(new CustomEvent("ye:logo-home"));
  };

  /* ─────────────────────────────
     Render
  ───────────────────────────── */
  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 w-full z-[100002] pointer-events-none"
      style={{
        transform: entered
          ? "translate3d(0,0,0)"
          : "translate3d(0,-110%,0)",
        opacity: entered ? 1 : 0,
        transition:
          "transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.55s cubic-bezier(0.22,1,0.36,1)",
        willChange: "transform, opacity",
        pointerEvents: entered && siteReady ? undefined : "none",
      }}
    >
      <div
        className="
          w-full max-w-[100vw]
          flex items-center justify-between
          px-4 sm:px-6 lg:px-12
          py-4
          bg-transparent
          pointer-events-auto
        "
      >
        {/* Logo */}
        <div className="flex items-center min-w-0">
          <Link
            to="/"
            onClick={handleLogoClick}
            aria-label="Go to home"
            className="
              flex items-center gap-2 select-none
              transition-opacity duration-300 hover:opacity-70
              min-w-0
            "
          >
            <img
              src={YELogo}
              alt="YE Global Logo"
              className="
                h-[clamp(44px,6vw,72px)]
                w-auto
                max-w-[140px] sm:max-w-[170px]
                object-contain
              "
            />
          </Link>
        </div>

        {/* Hamburger */}
        <button
          type="button"
          onClick={handleHamburger}
          aria-label={navOpen ? "Close menu" : "Open menu"}
          className="
            pointer-events-auto shrink-0
            relative
            px-2 py-1.5 sm:px-5 sm:py-3
            rounded-md sm:rounded-xl
            bg-[#ff9505]
            backdrop-blur-xl
            shadow-[0_10px_24px_rgba(255,149,5,0.28)]
            ring-1 ring-white/30
            transition-all duration-300 ease-out
            hover:brightness-105
            active:scale-95
          "
        >
          <div className="relative h-5 w-7 sm:h-6 sm:w-10">
            <span
              className={[
                "absolute left-0 top-1 h-0.5 w-7 sm:w-10 bg-white transition-transform duration-200",
                navOpen
                  ? "translate-y-[6px] sm:translate-y-2 rotate-45"
                  : "",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 top-[14px] sm:top-5 h-0.5 w-4 sm:w-6 bg-white transition-all duration-200",
                navOpen
                  ? "top-[10px] sm:top-3 w-7 sm:w-10 -rotate-45"
                  : "",
              ].join(" ")}
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default MenuTrigger;
