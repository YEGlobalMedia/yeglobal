import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavbarProvider } from "./context/NavContext";
import AppRoutes from "./routes/AppRoutes";
import LoaderOverlay from "./components/ui/LoaderOverlay";

const BOOT_DONE_KEY = "ye_boot_loader_done";
const BOOT_PROGRESS_KEY = "ye_boot_loader_in_progress";
const DESKTOP_QUERY = "(min-width: 1024px)";
const MOBILE_QUERY = "(max-width: 767px)";

function shouldShowBootLoader() {
  if (typeof window === "undefined") return false;

  const isMobile = window.matchMedia(MOBILE_QUERY).matches;
  // Mobile: always show on every reload
  if (isMobile) return true;

  // Desktop: once per session
  const isDesktop = window.matchMedia(DESKTOP_QUERY).matches;
  const done = sessionStorage.getItem(BOOT_DONE_KEY) === "1";
  return isDesktop && !done;
}

export default function App() {
  const isMobileRef = useRef(
    typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches
  );

  // Decide once at boot time whether loader is needed
  const [needBootLoader] = useState(() => shouldShowBootLoader());

  const [showLoader, setShowLoader] = useState(() => {
    if (!needBootLoader) return false;
    // Mobile always shows — skip sessionStorage check
    if (isMobileRef.current) return true;
    const inProgress = sessionStorage.getItem(BOOT_PROGRESS_KEY) === "1";
    const done = sessionStorage.getItem(BOOT_DONE_KEY) === "1";
    return !done || inProgress;
  });

  // ✅ TRUE gate: routes only mount when siteReady is true
  const [siteReady, setSiteReady] = useState(() => !needBootLoader);

  const finishedRef = useRef(false);

  // ✅ Lock boot immediately to survive StrictMode double-mount in dev
  useLayoutEffect(() => {
    if (!needBootLoader) return;

    // Mobile always shows — just gate the site
    if (isMobileRef.current) {
      setShowLoader(true);
      setSiteReady(false);
      return;
    }

    const done = sessionStorage.getItem(BOOT_DONE_KEY) === "1";
    if (!done) {
      sessionStorage.setItem(BOOT_PROGRESS_KEY, "1");
      setShowLoader(true);
      setSiteReady(false);
    }
  }, [needBootLoader]);

  // If user resizes to <1024px during boot, just skip loader and show site
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => {
      if (!mql.matches) {
        // End boot instantly on non-desktop
        sessionStorage.removeItem(BOOT_PROGRESS_KEY);
        setShowLoader(false);
        setSiteReady(true);
      }
    };

    if (mql.addEventListener) {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    }
    mql.addListener(onChange);
    return () => mql.removeListener(onChange);
  }, []);

  const handleLoaderFinish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    // Only persist "done" for desktop (mobile shows every reload)
    if (!isMobileRef.current) {
      sessionStorage.setItem(BOOT_DONE_KEY, "1");
      sessionStorage.removeItem(BOOT_PROGRESS_KEY);
    }

    setShowLoader(false);

    // Mobile: mount site immediately (loader is lightweight, no overlap issues)
    // Desktop: next-tick to ensure video overlay unmounts cleanly
    if (isMobileRef.current) {
      setSiteReady(true);
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event("resize"));
        window.dispatchEvent(new Event("scroll"));
      });
    } else {
      requestAnimationFrame(() => {
        setSiteReady(true);
        requestAnimationFrame(() => {
          window.dispatchEvent(new Event("resize"));
          window.dispatchEvent(new Event("scroll"));
        });
      });
    }
  };

  return (
    <NavbarProvider>
      <LoaderOverlay isVisible={showLoader} onFinish={handleLoaderFinish} />

      {/* ✅ NOTHING mounts behind loader */}
      {siteReady ? <AppRoutes siteReady={siteReady} /> : null}
    </NavbarProvider>
  );
}
