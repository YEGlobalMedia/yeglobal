import React from "react";
import { Link } from "react-router-dom";

/**
 * About page — tightened vertical rhythm + consistent spacing
 * - DOES NOT reduce font sizes
 * - Keeps image block structure/position the same
 * - Fixes “too much vertical spacing” across all sections
 * Keep fonts (Inter + Playfair Display) + Material Symbols loaded in index.html
 * Keep .editorial-text in global CSS
 */

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fff0e6] text-[#1d130c] font-sans antialiased selection:bg-[#ff6a00]/20 selection:text-[#ff6a00] transition-colors duration-300">
      {/* Top Navigation */}

      {/* Main Content Wrapper */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-10 md:py-12">
        {/* HERO */}
        <section className="text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="font-['Playfair Display',serif] text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.05] tracking-tight text-[#ff6a00] mt-6 md:mt-0">
            About <span className="whitespace-nowrap">YE Global</span>
          </h1>
          <div className="mt-6 w-full h-px bg-[#ff6a00]/30 mx-auto max-w-[140px]" />
        </section>

        {/* INTRO */}
        <section className="mt-8 md:mt-10 max-w-[820px] mx-auto">
          <p className="text-xl md:text-2xl lg:text-3xl font-serif text-[#1d130c] leading-snug md:leading-relaxed text-center italic">
            YE Global is a leading independent global distributor, showcasing
            remarkable stories and the best of international drama, docuseries,
            and scripted content to audiences worldwide.
          </p>

          <p className="editorial-text text-base md:text-xl lg:text-2xl text-[#1d130c] font-medium mt-6 md:mt-7 text-left md:text-center leading-relaxed">
            We curate and distribute content with strong international
            appeal—stories designed to travel across borders, cultures, and
            platforms, while retaining their regional authenticity.
          </p>
        </section>

        {/* IMAGE BREAK (same structure) */}
        <div className="mt-10 md:mt-12 w-full h-[260px] sm:h-[360px] md:h-[500px] bg-gray-100 overflow-hidden relative group rounded-sm">
          <img
            alt="Abstract minimal architecture representing global connection"
            className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100 grayscale group-hover:grayscale-0"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD33oVF5tkkQFFNv2TD_tEghRcCIJ9AJbwh8wgst-j7ve8NnfuTP2BhxD75fAUwupdU-bgu3-rELXvhPWEdYvVUVd5QBXUNTvJRO7ZnvLvjndOI-n-a51aJSWOYG1EnjgQFBxHTwqgNqdy4dgCwtmNogJus8xjeiDj95K5UryUwIb2Prd1um7oBaUHaKCYlaKjl5B3cHlevqA3kFB7fEwuB45YmcABrdMqo2yWd3SpJUK4jpNOHzWh5oGOsQJiaXNhHx3Rx_Fj-400"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>

        {/* CONTENT SECTIONS (tightened spacing between sections) */}
        <div className="mt-10 md:mt-12 space-y-10 md:space-y-12">
          {/* What We Do */}
          <Section
            title="What We Do"
            body={
              <>
                <p className="leading-snug md:leading-relaxed">
                  We build and manage a carefully curated catalogue drawn from both
                  established and non-traditional geographies.
                </p>

                <div className="pt-4">
                  <p className="text-[#1d130c] font-medium text-base md:text-lg lg:text-xl uppercase tracking-[0.18em] text-center">
                    Our Focus Is On
                  </p>
                </div>

                <BulletList
                  tight
                  items={[
                    "Stories with cross-cultural relevance and global scalability",
                    "International drama and scripted content",
                    "High-impact docuseries",
                  ]}
                />

                <p className="pt-4 leading-snug md:leading-relaxed">
                  Each title is selected for its ability to connect meaningfully
                  with diverse audiences across regions and markets.
                </p>
              </>
            }
          />

          {/* Global Presence */}
          <Section
            title="Global Presence"
            body={
              <>
                <p className="leading-snug md:leading-relaxed">
                  Headquartered in Australia, YE Global is expanding its footprint
                  across India and Africa, strengthening our position as a truly
                  global distribution partner.
                </p>
                <p className="leading-snug md:leading-relaxed">
                  This growing presence allows us to stay closely connected to
                  emerging markets while supporting content that resonates worldwide.
                </p>
              </>
            }
          />

          {/* Our Partnerships */}
          <Section
            title="Our Partnerships"
            body={
              <>
                <p className="leading-snug md:leading-relaxed">
                  We collaborate closely with creators, producers, broadcasters, and
                  digital platforms across:
                </p>

                <BulletList
                  tight
                  items={["Co-production", "Marketing strategy", "Global distribution"]}
                />

                <p className="leading-snug md:leading-relaxed">
                  By building long-term partnerships, we amplify the reach,
                  visibility, and impact of powerful storytelling.
                </p>
              </>
            }
          />

          {/* Our Approach */}
          <Section
            title="Our Approach"
            body={
              <>
                <p className="leading-snug md:leading-relaxed">
                  Positioned at the intersection of creative innovation and market
                  strategy, YE Global enables regional stories to travel beyond
                  borders.
                </p>

                <p className="leading-snug md:leading-relaxed">
                  Through strategic partnerships with broadcasters, networks, and
                  streaming platforms, we ensure:
                </p>

                <BulletList
                  tight
                  items={["Market relevance", "Scalable distribution", "Measurable impact"]}
                />

                <p className="leading-snug md:leading-relaxed">
                  Every release is guided by insight, strategy, and a deep
                  understanding of global audiences.
                </p>
              </>
            }
          />

          {/* Our Vision */}
          <Section
            title="Our Vision"
            body={
              <>
                <p className="leading-snug md:leading-relaxed">
                  Driven by a commitment to storytelling, strategic growth, and
                  global reach, YE Global is building a strong international media
                  network—one that:
                </p>

                <BulletList
                  tight
                  items={[
                    "Supports creators",
                    "Strengthens distribution ecosystems",
                    "Delivers meaningful content experiences worldwide",
                  ]}
                />
              </>
            }
          />
        </div>

        {/* Contact CTA */}
        <section className="text-center py-10 md:py-12">
          <h4 className="font-['Playfair Display',serif] text-2xl md:text-3xl lg:text-4xl mb-5 text-[#1d130c]">
            Ready to tell your story?
          </h4>
          <Link
            className="inline-flex items-center gap-2 text-[#ff6a00] font-medium hover:opacity-80 transition-opacity border-b border-[#ff6a00] pb-0.5"
            to="/contact"
          >
            <span>Get in Touch</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full py-7 text-xs text-gray-400 border-t border-gray-100 bg-[#fff0e6]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <span className="uppercase tracking-widest">
            © 2024 YE Global. All Rights Reserved.
          </span>
          <Link
            to="/privacy-policy"
            className="tracking-wide text-gray-400 hover:text-[#ff6a00] transition-colors duration-200"
          >
            Privacy Policy
          </Link>
        </div>
      </footer>
    </div>
  );
}

/* ---------- Reusable section components (tighter rhythm) ---------- */



function Section({ title, body }) {
  return (
    <section className="max-w-[820px] mx-auto">
      <header className="text-center">
        <h3 className="font-['Playfair Display',serif] text-3xl md:text-4xl lg:text-5xl text-[#1d130c]">
          {title}
        </h3>
        <div className="mt-4 w-12 h-px bg-[#ff6a00] mx-auto" />
      </header>

      <div className="mt-6 space-y-4 md:space-y-5 text-[#6b5e55] text-lg md:text-[20px] lg:text-[22px] xl:text-2xl leading-relaxed font-normal">
        {body}
      </div>
    </section>
  );
}

function BulletList({ items = [], tight = false }) {
  return (
    <ul className={tight ? "pt-3 space-y-2" : "pt-4 space-y-3"}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 items-start">
          <span className="mt-[0.55em] h-1.5 w-1.5 rounded-full bg-[#ff6a00]/80 flex-shrink-0" />
          <span className="leading-snug md:leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}
