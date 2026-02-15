// src/components/sections/landing/WhatWeDo.jsx
import React, { useEffect, useMemo, useRef } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import useScrollInView from "../../../hooks/useScrollInView";

import globalDistribution from "../../../assets/WhatWeDo/globaldistribution.jpeg";
import contentProduction from "../../../assets/WhatWeDo/contentProduction.jpeg";
import storytelling from "../../../assets/WhatWeDo/storytelling.jpeg";
import strategicPartner from "../../../assets/WhatWeDo/strategicPartner.jpeg";

const SERVICES = [
  {
    title: "Global Distribution",
    desc: "Delivering international drama, docuseries, and scripted content to broadcasters, networks, and digital platforms worldwide.",
    image: globalDistribution,
  },
  {
    title: "Content Production",
    desc: "Developing and co-producing high-quality content that resonates with audiences across cultures and platforms.",
    image: contentProduction,
  },
  {
    title: "Curated Storytelling",
    desc: "Sourcing and representing exceptional stories from both established and non-traditional geographies.",
    image: storytelling,
  },
  {
    title: "Strategic Partnerships",
    desc: "Collaborating across co-production, marketing, and distribution to maximize reach, impact, and audience engagement.",
    image: strategicPartner,
  },
];

const EASE = [0.16, 1, 0.3, 1];
const PREMIUM_EASE_CLASS =
  "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]";

const rowReveal = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, ease: EASE },
  },
};

const titleSeq = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, ease: EASE, delay: 0.06 },
  },
};

const descSeq = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.12, ease: EASE, delay: 0.18 },
  },
};

function ZigZagRow({ service, index, reduceMotion }) {
  const isEven = index % 2 === 0;
  const wrapRef = useRef(null);

  // ✅ Custom scroll-in-view (works with Locomotive + native scroll)
  // Lower margin on mobile so rows trigger sooner on small screens
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const { ref: rowRef, inView } = useScrollInView({
    once: true,
    amount: isMobile ? 0.15 : 0.28,
    margin: isMobile ? 40 : 140,
  });

  const onImgLoad = () => {
    if (wrapRef.current) wrapRef.current.dataset.loaded = "true";
  };

  return (
    <motion.div
      ref={rowRef}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={rowReveal}
      className="w-full flex justify-center"
    >
      <div
        className={[
          "w-full max-w-[90vw] xl:max-w-[85vw]",
          "min-h-[46vh] lg:min-h-[42vh]",
          "flex flex-col lg:flex-row items-center",
          isEven ? "lg:flex-row" : "lg:flex-row-reverse",
        ].join(" ")}
      >
        {/* IMAGE */}
        <div className="flex-shrink-0">
          <div
            ref={wrapRef}
            data-loaded="false"
            className={[
              "group relative rounded-full overflow-hidden",
              // ✅ smaller image sizes (premium balance)
              "h-[260px] w-[260px] sm:h-[320px] sm:w-[320px] lg:h-[360px] lg:w-[360px]",
              "transform-gpu will-change-transform",
              reduceMotion
                ? ""
                : [
                    "transition-transform duration-[1400ms]",
                    PREMIUM_EASE_CLASS,
                    // ✅ softer hover scale for smaller size
                    "hover:scale-[1.03] hover:-translate-y-[4px]",
                  ].join(" "),
            ].join(" ")}
            style={{
              backgroundImage: `url(${service.image})`,
              backgroundSize: service.title === "Content Production" ? "contain" : "cover",
              backgroundPosition: "center",
              backgroundColor: service.title === "Content Production" ? "#f5f5f5" : "transparent",
            }}
          >
            <img
              src={service.image}
              alt={service.title}
              onLoad={onImgLoad}
              className={[
                `absolute inset-0 h-full w-full ${service.title === "Content Production" ? "object-contain" : "object-cover"}`,
                "opacity-0 transition-opacity duration-500",
                "group-[data-loaded=true]:opacity-100",
              ].join(" ")}
            />
          </div>
        </div>

        {/* ✅ reduced spacing to match smaller images */}
        <div className="hidden lg:block w-[96px]" />

        {/* TEXT */}
        <div className="mt-10 sm:mt-14 lg:mt-0 max-w-[650px] text-center lg:text-left mx-auto lg:mx-0">
          {/* ✅ Playfair Display */}
          <motion.h3
            variants={titleSeq}
            className="font-['Playfair Display',serif] tracking-tight text-black leading-[1.04] text-[clamp(1.9rem,2.8vw,2.8rem)]"
          >
            {service.title}
          </motion.h3>

          <motion.p
            variants={descSeq}
            className="mt-5 text-black/65 leading-relaxed text-[1.05rem] sm:text-lg"
          >
            {service.desc}
          </motion.p>

          <div className="mt-10 h-px w-14 bg-black/20 mx-auto lg:mx-0" />
        </div>
      </div>
    </motion.div>
  );
}

export default function WhatWeDo() {
  const reduceMotion = useReducedMotion();

  const headerSpring = useMemo(
    () => ({ stiffness: 70, damping: 18, mass: 1.1 }),
    []
  );
  const labelScale = useSpring(reduceMotion ? 1 : 1.65, headerSpring);
  const labelY = useSpring(reduceMotion ? 0 : 28, headerSpring);

  // ✅ Custom scroll-in-view for the header label
  const { ref: headerRef, inView: headerInView } = useScrollInView({ once: true, amount: 0.3 });

  useEffect(() => {
    if (headerInView) {
      labelScale.set(1);
      labelY.set(0);
    }
  }, [headerInView, labelScale, labelY]);

  return (
    <section className="relative w-full bg-white z-20 -mt-[40vh] sm:-mt-[48vh] lg:-mt-[55vh] pt-6 pb-20 sm:pb-24 lg:pt-10 lg:pb-32">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
        {/* HEADER - centered with content below */}
        <div className="grid lg:grid-cols-12 gap-14 items-start text-center">
          <motion.div className="lg:col-span-12 flex justify-center">
            <motion.p
              ref={headerRef}
              style={{ scale: labelScale, y: labelY, transformOrigin: "center top" }}
              className="text-orange-400 font-['Playfair Display',serif] leading-[0.85] select-none font-extrabold text-center"
              // larger, more prominent sizes for the new component
            >
              <span className="whitespace-nowrap text-[clamp(2.6rem,9vw,7.6rem)]">What We Do</span>
            </motion.p>
          </motion.div>

          <div className="lg:col-span-12 lg:pt-6">
            <h2 className="font-['Playfair Display',serif] tracking-normal text-black leading-[1.05] flex items-baseline justify-center gap-2 whitespace-nowrap">
              <span className="text-[clamp(1.6rem,5.2vw,2.8rem)] md:text-[clamp(2.2rem,3.8vw,3.6rem)] font-medium tracking-normal">Content</span>
              <span className="text-[clamp(0.98rem,3.2vw,1.3rem)] md:text-[clamp(1.45rem,2.8vw,1.85rem)] text-black font-semibold tracking-normal">Beyond</span>
              <span className="text-[clamp(1.6rem,5.2vw,2.8rem)] md:text-[clamp(2.2rem,3.8vw,3.6rem)] font-medium tracking-normal">Borders</span>
            </h2>

            <p className="mt-6 text-black/65 leading-relaxed text-[1.05rem] sm:text-lg max-w-[60ch] mx-auto">
              Broadcast-ready content delivered through international networks to audiences worldwide.
            </p>

            <div className="mt-9 h-px w-14 bg-black/15 mx-auto" />
          </div>
        </div>

        {/* ROWS */}
        <div className="mt-16 sm:mt-20 space-y-16 sm:space-y-24">
          {SERVICES.map((s, i) => (
            <ZigZagRow
              key={s.title}
              service={s}
              index={i}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
