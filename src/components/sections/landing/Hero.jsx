// src/components/sections/landing/Hero.jsx
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const stickyRef = useRef(null);

  const canvasRef = useRef(null);
  const bgRef = useRef(null);

  const line1Ref = useRef(null);
  const line2Ref = useRef(null);

  // animation refs
  const tRef = useRef(0);
  const morphRef = useRef(0);       // scroll target (set instantly)
  const scaleRef = useRef(1);       // scroll target (set instantly)
  const visualMorphRef = useRef(0); // smoothed for rendering
  const visualScaleRef = useRef(1); // smoothed for rendering
  const rafRef = useRef(null);

  // cursor refs
  const cursorTargetRef = useRef({ x: 0, y: 0 });
  const cursorPosRef = useRef({ x: 0, y: 0 });

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const sticky = stickyRef.current;
    const canvas = canvasRef.current;
    const bg = bgRef.current;

    if (!hero || !sticky || !canvas || !bg) return;
    if (!line1Ref.current || !line2Ref.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile =
      window.matchMedia && window.matchMedia("(max-width: 640px)").matches;

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
    const clamp01 = gsap.utils.clamp(0, 1);
    const lerp = gsap.utils.interpolate;

    const smoothstep = (x) => {
      const t = clamp01(x);
      return t * t * (3 - 2 * t);
    };

    const gsapCtx = gsap.context(() => {
      // ✅ Start in a clean “ready” state (no white flash, no late content)
      gsap.set(bg, { background: "#ffffff", opacity: 1 });
      gsap.set(canvas, { opacity: 0 }); // blob fades in after text
      gsap.set([line1Ref.current, line2Ref.current], {
        yPercent: 125,
        filter: "blur(10px)",
        opacity: 1,
        willChange: "transform, filter",
      });

      // ✅ Cohesive entrance: text first, blob supports it
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro
        // quick crisp text reveal (premium)
        .to(line1Ref.current, { yPercent: 0, filter: "blur(0px)", duration: 0.95 }, 0.05)
        .to(line2Ref.current, { yPercent: 0, filter: "blur(0px)", duration: 0.95 }, 0.14)
        // blob fades in *under* text
        .to(canvas, { opacity: 1, duration: 0.9, ease: "power2.out" }, 0.28);

      // ---------- Resize ----------
      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = sticky.clientWidth;
        const h = sticky.clientHeight;

        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };

      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(sticky);

      // ---------- Cursor tracking ----------
      const isCoarsePointer =
        window.matchMedia && window.matchMedia("(pointer: coarse)").matches;

      const MAX_OFFSET = isMobile ? 28 : 48;
      const EDGE_PAD = 16;
      const TOP_DEADZONE = 14;

      const onPointerMove = (e) => {
        if (isCoarsePointer) return;

        const rect = sticky.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        if (y < TOP_DEADZONE) y = TOP_DEADZONE;

        x = clamp(x, EDGE_PAD, rect.width - EDGE_PAD);
        y = clamp(y, EDGE_PAD, rect.height - EDGE_PAD);

        const nx = (x / rect.width) * 2 - 1;
        const ny = (y / rect.height) * 2 - 1;

        const r = Math.min(1, Math.sqrt(nx * nx + ny * ny));
        const falloff = 1 - r * 0.7;

        cursorTargetRef.current.x = nx * MAX_OFFSET * falloff;
        cursorTargetRef.current.y = ny * MAX_OFFSET * falloff;
      };

      const onPointerLeave = () => {
        cursorTargetRef.current.x = 0;
        cursorTargetRef.current.y = 0;
      };

      sticky.addEventListener("pointermove", onPointerMove, { passive: true });
      sticky.addEventListener("pointerleave", onPointerLeave, { passive: true });

      // ---------- Draw Blob ----------
      const drawBlob = () => {
        const w = sticky.clientWidth;
        const h = sticky.clientHeight;

        // Smooth visual values toward scroll targets (fast lerp, snaps when close)
        const SMOOTH = 0.18;
        const SNAP = 0.001;

        let vm = visualMorphRef.current + (morphRef.current - visualMorphRef.current) * SMOOTH;
        if (Math.abs(morphRef.current - vm) < SNAP) vm = morphRef.current;
        visualMorphRef.current = vm;

        let vs = visualScaleRef.current + (scaleRef.current - visualScaleRef.current) * SMOOTH;
        if (Math.abs(scaleRef.current - vs) < SNAP) vs = scaleRef.current;
        visualScaleRef.current = vs;

        const morph = vm;
        const scale = isMobile ? Math.min(vs, 2.15) : vs;

        const FOLLOW = isMobile ? 0.025 : 0.035;

        cursorPosRef.current.x +=
          (cursorTargetRef.current.x - cursorPosRef.current.x) * FOLLOW;
        cursorPosRef.current.y +=
          (cursorTargetRef.current.y - cursorPosRef.current.y) * FOLLOW;

        cursorPosRef.current.x *= 0.995;
        cursorPosRef.current.y *= 0.995;

        ctx.clearRect(0, 0, w, h);
        ctx.save();

        ctx.translate(w / 2 + cursorPosRef.current.x, h / 2 + cursorPosRef.current.y);
        ctx.scale(scale, scale);

        ctx.beginPath();
        const points = 80;

        const minDim = Math.min(w, h);
        const baseRadiusRaw = minDim * 0.34 + morph * (minDim * 0.22);
        const baseRadius = isMobile ? Math.min(baseRadiusRaw, minDim * 0.46) : baseRadiusRaw;

        for (let i = 0; i <= points; i++) {
          const angle = ((Math.PI * 2) / points) * i;

          const noise =
            Math.sin(angle * 3 + tRef.current) * 18 +
            Math.sin(angle * 6 - tRef.current * 1.2) * 10;

          const rBlob = baseRadius + noise;
          const x = Math.cos(angle) * rBlob;
          const y = Math.sin(angle) * rBlob;

          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }

        ctx.closePath();
        ctx.fillStyle = "#ff6a00";
        ctx.globalAlpha = 0.28; // ✅ slightly softer so it feels premium
        ctx.fill();

        ctx.restore();

        tRef.current += 0.006;
        rafRef.current = requestAnimationFrame(drawBlob);
      };

      rafRef.current = requestAnimationFrame(drawBlob);

      // ---------- Scroll control ----------
      const st = ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate(self) {
          const p = self.progress;

          morphRef.current = p;

          // ✅ Set scale directly from scroll progress — no lerp drift
          const targetScale = 1 + p * 5;
          scaleRef.current = isMobile ? Math.min(targetScale, 2.15) : targetScale;

          // tint bg: white → peach in middle → white
          let tintT;
          if (p < 0.65) tintT = smoothstep(p / 0.65);
          else tintT = 1 - smoothstep((p - 0.65) / 0.35);

          bg.style.background = lerp("#ffffff", "#ffe1cf", tintT);

          const damp = 1 - smoothstep((p - 0.75) / 0.25);
          cursorTargetRef.current.x *= damp;
          cursorTargetRef.current.y *= damp;
        },
      });

      return () => {
        ro.disconnect();
        sticky.removeEventListener("pointermove", onPointerMove);
        sticky.removeEventListener("pointerleave", onPointerLeave);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        st.kill();
        intro.kill();
      };
    }, heroRef);

    return () => gsapCtx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      data-scroll
      className="relative h-[140vh] sm:h-[148vh] lg:h-[155vh] w-full bg-white z-0 overflow-x-hidden"
    >
      <div ref={stickyRef} className="sticky top-0 h-[100svh] overflow-hidden">
        <div ref={bgRef} className="absolute inset-0 z-0" />

        {/* ✅ Canvas BEHIND text now */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-[5] pointer-events-none"
        />

        {/* Content ABOVE blob */}
        <div className="relative z-10 h-full">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 h-full">
            <div className="h-full flex flex-col justify-center py-[8vw]">
              <h1 className="font-['Playfair Display',serif] text-[clamp(3.5rem,9vw,9rem)] leading-[1.02] text-[#111] font-bold">
                <span className="block overflow-hidden pb-[0.12em]">
                  <span ref={line1Ref} className="block">
                    Taking <span className="text-[#ff6a00]">Stories </span>
                  </span>
                </span>

                <span className="block overflow-hidden pb-[0.12em]">
                  <span ref={line2Ref} className="block">
                    Beyond Borders
                  </span>
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
