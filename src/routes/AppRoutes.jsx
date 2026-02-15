// src/routes/AppRoutes.jsx
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { lockBodyScroll, unlockBodyScroll } from "../utils/scrollLock";

import LandingPage from "../pages/LandingPage";
import About from "../pages/About";
import Portfolio from "../pages/Portfolio";
import Contact from "../pages/Contact";
import MarketsRegions from "../pages/MarketsRegions";
import PrivacyPolicy from "../pages/legal/PrivacyPolicy";

const WIPE_COVER_DELAY_MS = 620;

export default function AppRoutes({ siteReady }) {
  const location = useLocation();

  const [displayLocation, setDisplayLocation] = useState(location);
  const timerRef = useRef(null);
  const pendingLocationRef = useRef(location);

  // useLayoutEffect fires BEFORE paint → no 1-frame scrollbar flash
  useLayoutEffect(() => {
    if (location.pathname === displayLocation.pathname) return;

    pendingLocationRef.current = location;

    // ✅ Lock scroll for the entire transition window to prevent
    //    scrollbar flicker / layout shift between exit and enter.
    lockBodyScroll();

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      const nextLoc = pendingLocationRef.current;

      // ✅ Reset scroll to top BEFORE the new page mounts
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      setDisplayLocation(nextLoc);

      // ✅ Tell Locomotive/ScrollTrigger a navigation just completed
      window.dispatchEvent(
        new CustomEvent("ye:navigation-complete", {
          detail: { pathname: nextLoc.pathname, key: nextLoc.key },
        })
      );

      // Release the transition lock after the new page has a frame to mount
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          unlockBodyScroll();
        });
      });
    }, WIPE_COVER_DELAY_MS);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        // If effect re-fires before timeout completes, release the lock
        unlockBodyScroll();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Routes location={displayLocation}>
      <Route element={<MainLayout routeKey={location.key} siteReady={siteReady} />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/markets-regions" element={<MarketsRegions />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Route>
    </Routes>
  );
}
