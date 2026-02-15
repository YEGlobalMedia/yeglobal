import React from "react";
import Hero from "../components/sections/landing/Hero";
import BrandCarousel from "../components/sections/landing/BrandCarousel";
import PortfolioPreview from "../components/sections/landing/PortfolioPreview";
import WhatWeDo from "../components/sections/landing/WhatWeDo";
import Contact from "./Contact.jsx";

export default function LandingPage() {
  return (
    <main  className="w-full">
      <section data-scroll-section>
        <Hero />
      </section>

      <section data-scroll-section>
        <WhatWeDo />
      </section>

      <section data-scroll-section>
        <PortfolioPreview />
      </section>

      <section data-scroll-section>
        <BrandCarousel />
      </section>

      <section data-scroll-section>
        <Contact />
      </section>
    </main>
  );
}
