import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import styles from "../../../styles/BrandCarousel.module.css";

// brand logos
import logo1 from "../../../assets/BrandLogos/Jio.avif";
import logo2 from "../../../assets/BrandLogos/SET_India_Logo.avif";
import logo3 from "../../../assets/BrandLogos/Shemaroo-me.avif";
import logo4 from "../../../assets/BrandLogos/Ultra-Media-Entertainment-Logo.avif";
import logo5 from "../../../assets/BrandLogos/ZDF_logo.avif";

const logos = [
  { src: logo1, alt: "Jio" },
  { src: logo2, alt: "SET India" },
  { src: logo3, alt: "Shemaroo" },
  { src: logo4, alt: "Ultra Media Entertainment" },
  { src: logo5, alt: "ZDF" },
];

export default function BrandCarousel({ items = logos }) {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  // duplicate once for seamless loop
  const reel = useMemo(() => [...items, ...items], [items]);

  useEffect(() => {
    if (!trackRef.current || !items?.length) return;

    // 🔥 Faster, clean brand energy speed
    tweenRef.current = gsap.to(trackRef.current, {
      xPercent: -50,
      repeat: -1,
      ease: "linear",
      duration: 28, // ✅ FIXED: no longer sluggish
      force3D: true,
    });

    return () => tweenRef.current?.kill();
  }, [items]);

  // subtle slowdown on hover (not pause)
  const onEnter = () => tweenRef.current?.timeScale(0.6);
  const onLeave = () => tweenRef.current?.timeScale(1);

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div
          ref={trackRef}
          className={styles.track}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          aria-label="Brand carousel"
        >
          {reel.map((b, idx) => (
            <div className={styles.item} key={idx}>
              <img
                className={styles.logo}
                src={b.src}
                alt={b.alt || `Brand ${idx + 1}`}
                loading={idx < 2 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
