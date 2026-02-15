import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import loaderVideo from "../../assets/Loader/Loader2.webm";
import { lockBodyScroll, unlockBodyScroll } from "../../utils/scrollLock";

const FALLBACK_HIDE_MS = 4300;
const FADE_OUT_MS = 700;

/* ── mobile split-panel constants ── */
const MOBILE_BP = 768;          // px – anything below is "mobile"
const SPLIT_EASE = [0.83, 0, 0.17, 1];
const TEXT_HOLD_MS = 1000;      // how long "YE GLOBAL" stays visible
const SPLIT_DURATION = 1.0;     // seconds for words to fly apart
const MOBILE_TOTAL_MS = TEXT_HOLD_MS + SPLIT_DURATION * 700; // fire onFinish at ~70% of anim (words already off-screen)

/* ── Mobile split-panel loader ── */
function MobileLoader({ onFinish }) {
  const [visible, setVisible] = useState(true);
  const [splitting, setSplitting] = useState(false);

  useEffect(() => {
    const holdTimer = setTimeout(() => setSplitting(true), TEXT_HOLD_MS);
    const doneTimer = setTimeout(() => {
      setVisible(false);
      onFinish?.();
    }, MOBILE_TOTAL_MS);
    return () => {
      clearTimeout(holdTimer);
      clearTimeout(doneTimer);
    };
  }, [onFinish]);

  if (!visible) return null;

  const textClass =
    "text-[#ff6a00] font-['Playfair_Display'] font-bold tracking-[0.04em] text-[clamp(2.4rem,10vw,5rem)] leading-none whitespace-nowrap";

  return (
    <div className="fixed inset-0 z-[9999999] pointer-events-none bg-[#fff0e6]">
      {/* Centered row: "YE" + gap + "GLOBAL" — words fly apart on split */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="flex items-baseline gap-[0.35em]">
          {/* "YE" — slides left */}
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={
              splitting
                ? { x: "-100vw", y: 0, opacity: 0 }
                : { opacity: 1, y: 0, x: 0 }
            }
            transition={
              splitting
                ? { duration: SPLIT_DURATION, ease: SPLIT_EASE }
                : { duration: 0.6, ease: SPLIT_EASE, delay: 0.08 }
            }
            className={textClass}
          >
            YE
          </motion.span>

          {/* "GLOBAL" — slides right */}
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={
              splitting
                ? { x: "100vw", y: 0, opacity: 0 }
                : { opacity: 1, y: 0, x: 0 }
            }
            transition={
              splitting
                ? { duration: SPLIT_DURATION, ease: SPLIT_EASE }
                : { duration: 0.6, ease: SPLIT_EASE, delay: 0.08 }
            }
            className={textClass}
          >
            GLOBAL
          </motion.span>
        </div>
      </div>
    </div>
  );
}

/* ── Desktop video loader (unchanged) ── */
function DesktopLoader({ isVisible, onFinish }) {
  const [isFading, setIsFading] = useState(false);
  const finishTimerRef = useRef(null);

  const requestClose = () => {
    if (finishTimerRef.current) return;
    setIsFading(true);
    finishTimerRef.current = setTimeout(() => {
      onFinish?.();
    }, FADE_OUT_MS);
  };

  useEffect(() => {
    if (!isVisible) return undefined;

    setIsFading(false);

    lockBodyScroll();

    const timer = setTimeout(() => {
      requestClose();
    }, FALLBACK_HIDE_MS);

    return () => {
      unlockBodyScroll();
      clearTimeout(timer);
    };
  }, [isVisible]);

  useEffect(() => {
    return () => {
      if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={[
        "fixed inset-0 z-[9999999] bg-[#fff4eb]",
        "transition-opacity duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        isFading ? "opacity-0" : "opacity-100",
      ].join(" ")}
      role="status"
      aria-live="polite"
    >
      <button
        type="button"
        onClick={requestClose}
        aria-label="Skip intro"
        className="absolute inset-0 cursor-pointer"
      />
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={loaderVideo}
        autoPlay
        muted
        playsInline
        onEnded={requestClose}
      />
    </div>
  );
}

/* ── Exported wrapper – picks desktop vs mobile ── */
export default function LoaderOverlay({ isVisible, onFinish }) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < MOBILE_BP
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BP - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    setIsMobile(mq.matches);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (!isVisible) return null;

  if (isMobile) {
    // lock scroll for mobile loader too
    lockBodyScroll();
    return (
      <MobileLoader
        onFinish={() => {
          unlockBodyScroll();
          onFinish?.();
        }}
      />
    );
  }

  return <DesktopLoader isVisible={isVisible} onFinish={onFinish} />;
}
