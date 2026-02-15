import React from "react";
import { Link } from "react-router-dom";

export default function Button({
  label = "Button",
  to,
  onClick,
  className = "",
  type,
  disabled,

  // YE Global palette (locked)
  pillBg = "#ff9505",        // orange default bg
  textColor = "#ffffff",     // white default text
  hoverTextColor = "#ff9505",// orange hover text

  height = 52,
  padX = 28,
  radius = 999,
}) {
  const Comp = to ? Link : "button";

  return (
    <Comp
      to={to}
      type={to ? undefined : (type || "button")}
      onClick={onClick}
      disabled={disabled}
      className={[
        "group relative inline-flex items-center justify-center",
        "overflow-hidden select-none",
        "font-semibold uppercase tracking-[0.14em]",
        "transition-transform duration-200 ease-out active:scale-[0.97]",
        className,
      ].join(" ")}
      style={{
        height,
        paddingLeft: padX,
        paddingRight: padX,
        borderRadius: radius,
        backgroundColor: pillBg, // ORANGE base
        color: textColor,
      }}
    >
      {/* ✅ HOVER BACKGROUND — FORCED WHITE */}
      <span
        aria-hidden="true"
        className="
          absolute left-1/2 bottom-0
          -translate-x-1/2
          rounded-full
          pointer-events-none
          will-change-transform
          scale-0
          transition-transform duration-[520ms]
          ease-[cubic-bezier(0.22,1,0.36,1)]
          group-hover:scale-[1.45]
        "
        style={{
          width: "260%",
          height: "260%",
          backgroundColor: "#ffffff", // 🔥 HARD WHITE
          transformOrigin: "50% 85%",
        }}
      />

      {/* LABEL STACK */}
      <span className="relative z-[2] inline-block leading-none overflow-hidden">
        {/* DEFAULT LABEL (slides out completely) */}
        <span
          className="
            block
            transition-transform duration-[520ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:-translate-y-[220%]
          "
        >
          {label}
        </span>

        {/* HOVER LABEL (slides in cleanly) */}
        <span
          aria-hidden="true"
          className="
            absolute left-0 top-0
            block
            translate-y-[220%]
            opacity-0
            transition-all duration-[520ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:translate-y-0
            group-hover:opacity-100
          "
          style={{ color: hoverTextColor }}
        >
          {label}
        </span>
      </span>
    </Comp>
  );
}
