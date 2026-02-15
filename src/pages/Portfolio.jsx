import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DomeGallery from "../components/Portfolio/DomeGallery.jsx";

/* ===== YOUR IMAGES ===== */
import img1 from "../assets/Projects/abcd-2.avif";
import img2 from "../assets/Projects/Al hayba.jpg";
import img3 from "../assets/Projects/ALADIN.webp";
import img4 from "../assets/Projects/BALVEER.jpg";
import img5 from "../assets/Projects/BOND_OF_HATRED-thai.jpg";
import img6 from "../assets/Projects/Flower_of_lust.jpg";
import img7 from "../assets/Projects/GAUNA.avif";
import img8 from "../assets/Projects/INVENTION_STORY.avif";
import img9 from "../assets/Projects/KICKO_AUR_SPEEDO_India.avif";
import img10 from "../assets/Projects/Kismat_Ki_Lakiro_Se.avif";
import img11 from "../assets/Projects/KYUNKI_TUM_HI_HO.jpg";
import img12 from "../assets/Projects/LADYS_VENDETTA_Thai.avif";
import img13 from "../assets/Projects/MEKONG_RIVER_thai.avif";
import img14 from "../assets/Projects/Mere_Dad_Ki_Dulhan.avif";
import img15 from "../assets/Projects/MONGKUT_KARMA_Thai.avif";
import img16 from "../assets/Projects/MUBARAKAN.avif";
import img17 from "../assets/Projects/MY_NAME_IS_REYA_Thai.avif";
import img18 from "../assets/Projects/Poster_Boys_poster.avif";
import img19 from "../assets/Projects/THE_RETRIBUTION-Thai.jpg";
import img20 from "../assets/Projects/THE_REVENGE_Thai.avif";
import img21 from "../assets/Projects/THE_DEMON_KING_Thai.avif";
import img22 from "../assets/Projects/THE_JUNGLE_BOOK.avif";
import img23 from "../assets/Projects/VAMPIRE_SPIRIT_Thai.avif";

const IMAGES = [
  { src: img1, alt: "Portfolio image 1" },
  { src: img2, alt: "Portfolio image 2" },
  { src: img3, alt: "Portfolio image 3" },
  { src: img4, alt: "Portfolio image 4" },
  { src: img5, alt: "Portfolio image 5" },
  { src: img6, alt: "Portfolio image 6" },
  { src: img7, alt: "Portfolio image 7" },
  { src: img8, alt: "Portfolio image 8" },
  { src: img9, alt: "Portfolio image 9" },
  { src: img10, alt: "Portfolio image 10" },
  { src: img11, alt: "Portfolio image 11" },
  { src: img12, alt: "Portfolio image 12" },
  { src: img13, alt: "Portfolio image 13" },
  { src: img14, alt: "Portfolio image 14" },
  { src: img15, alt: "Portfolio image 15" },
  { src: img16, alt: "Portfolio image 16" },
  { src: img17, alt: "Portfolio image 17" },
  { src: img18, alt: "Portfolio image 18" },
  { src: img19, alt: "Portfolio image 19" },
  { src: img20, alt: "Portfolio image 20" },
  { src: img21, alt: "Portfolio image 21" },
  { src: img22, alt: "Portfolio image 22" },
  { src: img23, alt: "Portfolio image 23" },
];

export default function Portfolio() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");

    const sync = () => setIsDesktop(mql.matches);
    sync();

    if (mql.addEventListener) {
      mql.addEventListener("change", sync);
      return () => mql.removeEventListener("change", sync);
    }

    mql.addListener(sync);
    return () => mql.removeListener(sync);
  }, []);

  const openedSize = isDesktop ? "520px" : "min(72vw, 360px)";

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full h-[100svh] overflow-hidden bg-white"
      >
        <DomeGallery
          images={IMAGES}
          grayscale={false}
          fit={isDesktop ? 0.92 : 0.78}
          minRadius={isDesktop ? 640 : 360}
          maxVerticalRotationDeg={0}
          segments={isDesktop ? 34 : 24}
          dragSensitivity={isDesktop ? 22 : 14}
          dragDampening={2}
          overlayBlurColor="#0b0b10"
          openedImageWidth={openedSize}
          openedImageHeight={openedSize}
          imageBorderRadius="24px"
          openedImageBorderRadius="26px"
        />
      </motion.section>

      {/* Footer */}
      <footer className="w-full py-8 text-xs text-gray-400 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <span className="uppercase tracking-widest">© 2024 YE Global. All Rights Reserved.</span>
          <Link to="/privacy-policy" className="tracking-wide text-gray-400 hover:text-[#ff6a00] transition-colors duration-200">Privacy Policy</Link>
        </div>
      </footer>
    </>
  );
}
