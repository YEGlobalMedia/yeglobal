import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CircularGallery from "../../Portfolio/CircularGallery";
import Button from "../../ui/Button";
import useScrollInView from "../../../hooks/useScrollInView";

// Images
import FIRST_IMAGE from "../../../assets/Projects/abcd-2.avif";
import SECOND_IMAGE from "../../../assets/Projects/GAUNA.avif";
import THIRD_IMAGE from "../../../assets/Projects/INVENTION_STORY.avif";
import FOURTH_IMAGE from "../../../assets/Projects/THE_JUNGLE_BOOK.avif";
import FIFTH_IMAGE from "../../../assets/Projects/LADYS_VENDETTA_Thai.avif";
import SIXTH_IMAGE from "../../../assets/Projects/MUBARAKAN.avif";
import SEVENTH_IMAGE from "../../../assets/Projects/ALADIN.webp";
import EIGHTH_IMAGE from "../../../assets/Projects/MONGKUT_KARMA_Thai.avif";
import NINTH_IMAGE from "../../../assets/Projects/Poster_Boys_poster.avif";
import TENTH_IMAGE from "../../../assets/Projects/THE_DEMON_KING_Thai.avif";

const items = [
  { image: FIRST_IMAGE, text: "Project 01" },
  { image: SECOND_IMAGE, text: "Project 02" },
  { image: THIRD_IMAGE, text: "Project 03" },
  { image: FOURTH_IMAGE, text: "Project 04" },
  { image: FIFTH_IMAGE, text: "Project 05" },
  { image: SIXTH_IMAGE, text: "Project 06" },
  { image: SEVENTH_IMAGE, text: "Project 07" },
  { image: EIGHTH_IMAGE, text: "Project 08" },
  { image: NINTH_IMAGE, text: "Project 09" },
  { image: TENTH_IMAGE, text: "Project 10" },
];

export default function PortfolioPreviewCircular() {
  // ✅ Custom scroll-in-view (works with Locomotive)
  const { ref: lineRef, inView: lineInView } = useScrollInView({ once: true, amount: 0.6 });

  return (
    <section className="w-full py-24 lg:py-28 bg-[#ffc971]">
      
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pb-10 text-center">
        <h2
          className="
            font-['Inter'] font-bold
            uppercase
            tracking-[-0.02em]
            text-black
            leading-[0.95]
            text-[clamp(2.6rem,4.6vw,4.6rem)]
          "
        >
          Featured Projects
        </h2>

        {/* Animated White Line */}
        <div className="relative mt-6 h-[1.5px] w-full max-w-md mx-auto overflow-hidden">
          <motion.div
            ref={lineRef}
            className="absolute left-0 top-0 h-full bg-white"
            initial={{ width: 0 }}
            animate={lineInView ? { width: "100%" } : { width: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.33, 1, 0.68, 1],
            }}
          />
        </div>
      </div>

      {/* Gallery frame */}
      <div className="mx-auto max-w-[92rem] px-3 sm:px-4 lg:px-6 mt-10">
        <div
          className="
            relative w-full
            h-[320px] sm:h-[420px] lg:h-[600px]
            overflow-hidden
            rounded-[24px] sm:rounded-[28px]
            bg-black/[0.02]
            ring-1 ring-black/10
            shadow-[0_18px_60px_rgba(0,0,0,0.10)]
          "
        >
          {/* soft edge fades */}
          <div className="pointer-events-none absolute inset-0 z-10">
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
          </div>

          <CircularGallery
            items={items}
            bend={3.2}
            textColor="#111111"
            borderRadius={0.065}
            font={'600 20px "Neue Montreal", ui-sans-serif, system-ui'}
            scrollSpeed={1.2}
            scrollEase={0.06}
            wheelWarp={0.005}
          />
        </div>

        {/* CTA */}
        <div className="pt-14 flex justify-center">
          <Link to="/portfolio" className="inline-block">
            <Button
              label="View More"
              height={54}
              padX={32}
              className="min-w-[180px]"
              pillBg="#f48c06"
              circleColor="#0b0b10"
              hoverTextColor="#f48c06"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
