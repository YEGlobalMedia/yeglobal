import React, { useEffect, useRef, useState } from "react";
import { Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function Contact() {
  const messageRef = useRef(null);
  const [result, setResult] = useState(""); // "" | "sending" | "success" | "error"

  const onSubmit = async (event) => {
    event.preventDefault();

    setResult("sending");

    const formData = new FormData(event.target);
    formData.append("access_key", "3336b876-6c00-4e51-a928-13f6056901fe");
    // Set reply-to as the submitter's email so replies go to them
    formData.append("replyto", formData.get("email"));

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setResult("success");
        event.target.reset();
      } else {
        setResult("error");
      }
    } catch {
      setResult("error");
    }

    setTimeout(() => setResult(""), 5000);
  };

  // Auto-resize textarea (editorial feel)
  useEffect(() => {
    const el = messageRef.current;
    if (!el) return;

    const resize = () => {
      el.style.height = "0px";
      el.style.height = `${el.scrollHeight}px`;
    };

    resize();
    el.addEventListener("input", resize);
    return () => el.removeEventListener("input", resize);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#fff0e6] text-[#1A1A1A] font-sans overflow-x-hidden selection:bg-[#ff6a00]/20 selection:text-[#ff6a00]">
      {/* Navigation */}

      <main className="w-full min-h-screen flex flex-col items-center">
        {/* Hero & Heading */}
        <section className="w-full max-w-4xl px-6 pt-20 pb-12 md:pt-32 md:pb-20 text-center">
          <h1 className="font-['Playfair Display',serif] text-5xl md:text-7xl lg:text-8xl font-medium leading-tight mb-6 text-[#1A1A1A]">
            Connect with YE Global
          </h1>
          <p className="font-serif italic text-xl md:text-2xl lg:text-3xl text-[#6b6b6b] font-light">
            Shaping the future of global narratives.
          </p>
        </section>

        {/* Form Section */}
        <section className="w-full max-w-2xl px-6 md:px-0 mb-16">
          <form onSubmit={onSubmit} className="flex flex-col gap-12">
            {/* Web3Forms hidden fields to avoid spam folder */}
            <input type="hidden" name="from_name" value="YE Global Website Inquiry" />
            <input type="hidden" name="subject" value="New Inquiry — YE Global Media Corp" />
            {/* Honeypot anti-spam (bots fill this, real users don't see it) */}
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

            {/* Full Name */}
            <Field label="Full Name" htmlFor="name">
              <UnderlineInput>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  className={inputBase}
                />
              </UnderlineInput>
            </Field>

            {/* Email */}
            <Field label="Email Address" htmlFor="email">
              <UnderlineInput>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className={inputBase}
                />
              </UnderlineInput>
            </Field>

            {/* Inquiry Type (dropdown) */}
            <Field label="Inquiry Type" htmlFor="inquiryType">
              <UnderlineInput>
                <>
                  <select
                    id="inquiryType"
                    name="inquiry_type"
                    required
                    className={`${inputBase} appearance-none pr-10 cursor-pointer`}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a topic
                    </option>
                    <option value="Television Network Inquiry">Television Network Inquiry</option>
                    <option value="Digital / OTT Platform Inquiry">Digital / OTT Platform Inquiry</option>
                    <option value="Content Acquisition">Content Acquisition</option>
                    <option value="Distribution Partnerships">Distribution Partnerships</option>
                    <option value="Format Licensing">Format Licensing</option>
                    <option value="Co-Production Opportunities">Co-Production Opportunities</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                  <span className="pointer-events-none absolute right-0 bottom-2 text-xs md:text-sm text-gray-400 group-focus-within:text-[#ff6a00]">
                    ▼
                  </span>
                </>
              </UnderlineInput>
            </Field>

            {/* Message */}
            <Field label="Message" htmlFor="message">
              <UnderlineInput>
                <textarea
                  id="message"
                  name="message"
                  ref={messageRef}
                  rows={1}
                  required
                  placeholder="Tell us about your project"
                  className={`${inputBase} resize-none overflow-hidden min-h-[3rem]`}
                />
              </UnderlineInput>
            </Field>

            {/* Submit */}
            {/* Status Message */}
            {result === "success" && (
              <p className="text-green-600 text-sm font-medium tracking-wide animate-fade-in">
                ✓ Your inquiry has been sent successfully. We'll get back to you soon.
              </p>
            )}
            {result === "error" && (
              <p className="text-red-500 text-sm font-medium tracking-wide animate-fade-in">
                Something went wrong. Please try again.
              </p>
            )}

            <div className="mt-10 flex justify-center">
              <Button
                label={result === "sending" ? "Sending…" : "Submit Inquiry"}
                type="submit"
                disabled={result === "sending"}
                className="min-w-[190px]"
                height={54}
                padX={32}
                pillBg="#f48c06"
                hoverTextColor="#f48c06"
              />
            </div>
          </form>
        </section>

        {/* Global Presence / Footer Grid */}
        <section className="w-full border-t border-gray-100 bg-[#fff0e6] pt-8 pb-20">
          <div className="max-w-6xl mx-auto px-6">
            {/* ✅ SINGLE COLUMN + PERFECT CENTER */}
            <div className="grid grid-cols-1 place-items-center">
              <RegionCard
                title="Australia"
                img="https://lh3.googleusercontent.com/aida-public/AB6AXuBZ-uiUfZzn1QytTK2ex2Qr_O1gThWBh3IU9q6aCU7pTI9KifcruOdM133iRn7GNZiqsdk2A8o4iyDYBriwvkllAXHZsy5GWef8H7uIczF01sJso5DR4n_j1TQmxcQwD8DBDMsf2bPG7axLaxziQbB1HJjUPYV5dhTypxt_7Kz6Ygg81T_qFuvasu48KfnVtNA346XAa7u2380AyBhnEqQudhBH8GU7xHWSMA-WY_jWhw0Mfxw5h4A3oJP03WX-QR8__PVJP1DenzA"
                address={[
                  "YE Global Media Corp ",
                  "108-110 Sherlock Rd",
                  "Melbourne, Victoria, Australia",
                ]}
                email="hello@yeglobalmediacorp.com.au"
                socials={[
                  {
                    href: "https://x.com/YE_Globalmedia",
                    label: "X (Twitter)",
                    Icon: Twitter,
                  },
                  {
                    href: "https://www.instagram.com/ye_globalmedia/",
                    label: "Instagram",
                    Icon: Instagram,
                  },
                ]}
              />
            </div>
          </div>
        </section>
{/* YE Global Media Corp 108-110 Sherlock Rd, Melbourne, Victoria, Australia. */}
        {/* Acknowledgement (Refined Premium Version) */}
<section className="w-full bg-[#ff6a00]/10 py-20">
  <div className="max-w-4xl mx-auto px-6 text-center">
    
    <div className="w-12 h-[1px] bg-[#ff6a00]/40 mx-auto mb-10" />

    <p className="text-xl md:text-2xl font-serif italic leading-relaxed text-[#1d130c] text-center">
  YE Global Media Corp acknowledges the Wurundjeri people of the Kulin nation, 
  the traditional custodians of this land, and pay our respect to the 
  Wurundjeri Elders, past and present.
</p>

  </div>
</section>


  <footer className="w-full py-8 text-xs text-gray-400 border-t border-gray-100 bg-[#fff0e6]">
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
      </main>
    </div>
  );
}

/* ---------- Small helper components (keeps JSX clean) ---------- */

function Field({ label, htmlFor, children }) {
  return (
    <div className="group relative w-full">
      <label
        htmlFor={htmlFor}
        className="block text-xs sm:text-sm md:text-base lg:text-lg uppercase tracking-[0.2em] font-semibold text-[#4a4a4a] mb-3 transition-colors duration-200 group-hover:text-[#ff6a00] group-focus-within:text-[#ff6a00]"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

// Underline animation using Tailwind only (no global CSS)
function UnderlineInput({ children }) {
  return (
    <div className="relative w-full pb-1 border-b border-gray-200">
      {/* underline anim */}
      <span className="pointer-events-none absolute left-0 -bottom-[1px] h-[1px] w-0 bg-[#ff6a00] transition-all duration-400 ease-out group-focus-within:w-full" />
      {children}
    </div>
  );
}

function RegionCard({ title, img, address, phone, email, socials = [], className = "" }) {
  return (
    <div
      className={`flex flex-col items-center text-center gap-6 relative w-full max-w-md ${className}`}
    >
      <div className="size-20 bg-gray-50 rounded-full flex items-center justify-center mb-2 overflow-hidden">
        <img
          alt={`${title} location`}
          src={img}
          className="w-full h-full object-cover opacity-80"
          draggable={false}
        />
      </div>

      <h3 className="font-['Playfair Display',serif] text-2xl text-[#1A1A1A]">
        {title}
      </h3>

      <div className="space-y-2 text-sm text-[#6b6b6b] leading-relaxed font-light">
        {address?.map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>

      <div className="pt-4 flex flex-col gap-2 items-center">
        {phone ? (
          <a
            className="text-sm font-medium hover:text-[#ff6a00] transition-colors"
            href={`tel:${phone}`}
          >
            {phone}
          </a>
        ) : null}
        {email ? (
          <a
            className="text-sm font-medium hover:text-[#ff6a00] transition-colors"
            href={`mailto:${email}`}
          >
            {email}
          </a>
        ) : null}
        {socials.length ? (
          <div className="flex items-center gap-4 pt-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="text-[#6b6b6b] hover:text-[#ff6a00] transition-colors"
              >
                <Icon size={20} strokeWidth={1.6} />
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ---------- Tailwind-friendly input class ---------- */
const inputBase =
  "w-full bg-transparent border-none p-0 text-xl md:text-2xl font-serif text-[#1A1A1A] placeholder:text-gray-400 md:placeholder:text-gray-500 focus:ring-0 focus:outline-none h-12";
