import React from "react";
import { Outlet } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

import MenuTrigger from "../components/nav/MenuTrigger";
import FullScreenNav from "../components/nav/FullScreenNav";
import LocomotiveProvider from "../components/LocomotiveProvider";
import PageStackTransition from "../components/motion/PageStackTransition";

function MainLayout({ routeKey, siteReady }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative w-full min-h-screen bg-[#fff4eb] text-black overflow-x-hidden">
      {/* MenuTrigger OUTSIDE the motion.div so `fixed` isn't broken by parent transform */}
      <MenuTrigger siteReady={siteReady} />

      {/* FIXED UI (gate until boot is ready) */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: -10 }}
        animate={
          reduce
            ? {}
            : siteReady
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: -10 }
        }
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        style={{ pointerEvents: siteReady ? "auto" : "none" }}
      >
        <FullScreenNav />
      </motion.div>

      {/* ROUTED PAGES */}
      {/* IMPORTANT: do NOT key LocomotiveProvider by pathname, it kills exit animations */}
      <div className="relative">
        <PageStackTransition routeKey={routeKey}>
          <LocomotiveProvider>
            <Outlet />
          </LocomotiveProvider>
        </PageStackTransition>
      </div>
    </div>
  );
}

export default MainLayout;
