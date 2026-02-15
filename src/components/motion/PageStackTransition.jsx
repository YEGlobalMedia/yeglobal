import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1]; // premium

export default function PageStackTransition({ children, routeKey }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={routeKey}
        className="relative isolate"
        initial={{
          y: 70,
          opacity: 0.001,
          scale: 0.985,
          filter: "blur(12px)",
        }}
        animate={{
          y: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration: 1.55, ease }, // ⬅️ slower
        }}
        exit={{
          y: -20,
          opacity: 0.001,
          scale: 0.995,
          filter: "blur(8px)",
          transition: { duration: 0.95, ease }, // ⬅️ slower exit
        }}
        style={{ willChange: "transform, filter, opacity" }}
      >
        {/* Soft sheet shadow so it feels like this page sits above */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 shadow-[0_-40px_110px_rgba(0,0,0,0.16)]"
        />

        {/* tiny orange edge (luxury detail) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] bg-[#ff6a00] opacity-60"
        />

        {children}
      </motion.div>
    </AnimatePresence>
  );
}
