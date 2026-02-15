import React from "react";
import { Link } from "react-router-dom";

/**
 * About page — same styling, updated content
 * Keep fonts (Inter + Playfair Display) + Material Symbols loaded in index.html
 * Keep .editorial-text in global CSS
 */

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fff0e6] text-[#1d130c] font-sans antialiased selection:bg-[#ff6a00]/20 selection:text-[#ff6a00] transition-colors duration-300">
      {/* Top Navigation */}

      {/* Main Content Wrapper */}
      <main className="flex-1 w-full max-w-[900px] mx-auto px-6 py-12 md:py-16 flex flex-col gap-12 md:gap-16">
        {/* Hero Heading Section */}
        <section className="flex flex-col gap-4 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="font-['Playfair Display',serif] text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.1] tracking-tight text-[#ff6a00]">
            About YE Global
          </h1>
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-[#ff6a00]/30 mx-auto max-w-[120px]" />

        {/* Intro */}
        <section className="max-w-[680px] mx-auto">
          <p className="text-xl md:text-2xl lg:text-3xl font-serif text-[#1d130c] leading-relaxed text-center italic">
            YE Global is a leading independent global distributor, showcasing
            remarkable stories and the best of international drama, docuseries,
            and scripted content to audiences worldwide.
          </p>

          <p className="editorial-text text-base md:text-xl lg:text-2xl text-[#1d130c] font-medium mt-8 text-justify md:text-center">
            We curate and distribute content with strong international
            appeal—stories designed to travel across borders, cultures, and
            platforms, while retaining their regional authenticity.
          </p>
        </section>

        {/* Image Break */}
        <div className="w-full h-[260px] sm:h-[360px] md:h-[500px] bg-gray-100 overflow-hidden relative group rounded-sm">
          <img
            alt="Abstract minimal architecture representing global connection"
            className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100 grayscale group-hover:grayscale-0"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD33oVF5tkkQFFNv2TD_tEghRcCIJ9AJbwh8wgst-j7ve8NnfuTP2BhxD75fAUwupdU-bgu3-rELXvhPWEdYvVUVd5QBXUNTvJRO7ZnvLvjndOI-n-a51aJSWOYG1EnjgQFBxHTwqgNqdy4dgCwtmNogJus8xjeiDj95K5UryUwIb2Prd1um7oBaUHaKCYlaKjl5B3cHlevqA3kFB7fEwuB45YmcABrdMqo2yWd3SpJUK4jpNOHzWh5oGOsQJiaXNhHx3Rx_Fj-400"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>

        {/* What We Do */}
        <section className="max-w-[680px] mx-auto flex flex-col gap-8">
          <header className="text-center">
            <h3 className="font-['Playfair Display',serif] text-3xl md:text-4xl lg:text-5xl text-[#1d130c] mb-6">
              What We Do
            </h3>
            <div className="w-12 h-px bg-[#ff6a00] mx-auto" />
          </header>

          <div className="space-y-6 text-[#6b5e55] text-lg md:text-[20px] lg:text-[22px] xl:text-2xl leading-relaxed font-normal">
            <p>
              We build and manage a carefully curated catalogue drawn from both
              established and non-traditional geographies.
            </p>

            <p className="text-[#1d130c] font-medium text-base md:text-lg lg:text-xl uppercase tracking-widest text-center">
              Our focus is on:
            </p>

            <ul className="space-y-3 text-[#6b5e55] text-lg md:text-[20px] lg:text-[22px] xl:text-2xl">
              <li>International drama and scripted content</li>
              <li>High-impact docuseries</li>
              <li>Stories with cross-cultural relevance and global scalability</li>
            </ul>

            <p>
              Each title is selected for its ability to connect meaningfully
              with diverse audiences across regions and markets.
            </p>
          </div>
        </section>

        {/* Global Presence */}
        <section className="max-w-[680px] mx-auto flex flex-col gap-8">
          <header className="text-center">
            <h3 className="font-['Playfair Display',serif] text-3xl md:text-4xl lg:text-5xl text-[#1d130c] mb-6">
              Global Presence
            </h3>
            <div className="w-12 h-px bg-[#ff6a00] mx-auto" />
          </header>

          <div className="space-y-6 text-[#6b5e55] text-lg md:text-xl lg:text-2xl leading-relaxed font-normal">
            <p>
              Headquartered in Australia, YE Global is expanding its footprint
              across India and Africa, strengthening our position as a truly
              global distribution partner.
            </p>
            <p>
              This growing presence allows us to stay closely connected to
              emerging markets while supporting content that resonates worldwide.
            </p>
          </div>
        </section>

        {/* Our Partnerships */}
        <section className="max-w-[680px] mx-auto flex flex-col gap-8">
          <header className="text-center">
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1d130c] mb-6">
              Our Partnerships
            </h3>
            <div className="w-12 h-px bg-[#ff6a00] mx-auto" />
          </header>

          <div className="space-y-6 text-[#6b5e55] text-lg md:text-xl lg:text-2xl leading-relaxed font-normal">
            <p>
              We collaborate closely with creators, producers, broadcasters, and
              digital platforms across:
            </p>

            <ul className="space-y-3 text-[#6b5e55] text-lg">
              <li>Co-production</li>
              <li>Marketing strategy</li>
              <li>Global distribution</li>
            </ul>

            <p>
              By building long-term partnerships, we amplify the reach,
              visibility, and impact of powerful storytelling.
            </p>
          </div>
        </section>

        {/* Our Approach */}
        <section className="max-w-[680px] mx-auto flex flex-col gap-8">
          <header className="text-center">
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1d130c] mb-6">
              Our Approach
            </h3>
            <div className="w-12 h-px bg-[#ff6a00] mx-auto" />
          </header>

          <div className="space-y-6 text-[#6b5e55] text-lg md:text-xl lg:text-2xl leading-relaxed font-normal">
            <p>
              Positioned at the intersection of creative innovation and market
              strategy, YE Global enables regional stories to travel beyond
              borders.
            </p>

            <p>
              Through strategic partnerships with broadcasters, networks, and
              streaming platforms, we ensure:
            </p>

            <ul className="space-y-3 text-[#6b5e55] text-lg">
              <li>Market relevance</li>
              <li>Scalable distribution</li>
              <li>Measurable impact</li>
            </ul>

            <p>
              Every release is guided by insight, strategy, and a deep
              understanding of global audiences.
            </p>
          </div>
        </section>

        {/* Our Vision */}
        <section className="max-w-[680px] mx-auto flex flex-col gap-8">
          <header className="text-center">
            <h3 className="font-serif text-3xl md:text-4xl text-[#1d130c] mb-6">
              Our Vision
            </h3>
            <div className="w-12 h-px bg-[#ff6a00] mx-auto" />
          </header>

          <div className="space-y-6 text-[#6b5e55] text-lg md:text-xl lg:text-2xl leading-relaxed font-normal">
            <p>
              Driven by a commitment to storytelling, strategic growth, and
              global reach, YE Global is building a strong international media
              network—one that:
            </p>

            <ul className="space-y-3 text-[#6b5e55] text-lg">
              <li>Supports creators</li>
              <li>Strengthens distribution ecosystems</li>
              <li>Delivers meaningful content experiences worldwide</li>
            </ul>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center py-10">
          <h4 className="font-['Playfair Display',serif] text-2xl md:text-3xl lg:text-4xl mb-6 text-[#1d130c]">
            Ready to tell your story?
          </h4>
          <Link
            className="inline-flex items-center gap-2 text-[#ff6a00] font-medium hover:opacity-80 transition-opacity border-b border-[#ff6a00] pb-0.5"
            to="/contact"
          >
            <span>Get in Touch</span>
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </Link>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full py-8 text-xs text-gray-400 border-t border-gray-100 bg-[#fff0e6]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <span className="uppercase tracking-widest">© 2024 YE Global. All Rights Reserved.</span>
          <Link to="/privacy-policy" className="tracking-wide text-gray-400 hover:text-[#ff6a00] transition-colors duration-200">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
}
