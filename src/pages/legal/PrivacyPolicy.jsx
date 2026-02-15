import React from "react";
import { Link } from "react-router-dom";

/**
 * Privacy Policy — tightened vertical rhythm + consistent spacing (same as About)
 * - DOES NOT reduce font sizes
 * - Reduces excessive vertical gaps (gap-12/16, space-y-4/8, mt-8, etc.)
 * - Keeps premium serif headings + clean corporate flow
 * Keep fonts (Inter + Playfair Display) + Material Symbols loaded in index.html
 * Keep .editorial-text in global CSS
 */

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fff0e6] text-[#1d130c] font-sans antialiased selection:bg-[#ff6a00]/20 selection:text-[#ff6a00] transition-colors duration-300">
      {/* Main Content Wrapper */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-10 md:py-12">
        {/* HERO */}
        <section className="text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="font-['Playfair Display',serif] text-5xl md:text-7xl font-medium leading-[1.05] tracking-tight text-[#ff6a00] mt-6 md:mt-0">
            Privacy Policy
          </h1>
          <div className="mt-6 w-full h-px bg-[#ff6a00]/30 mx-auto max-w-[140px]" />
        </section>

        {/* INTRO */}
        <section className="mt-8 md:mt-10 max-w-[820px] mx-auto">
          <p className="text-xl md:text-2xl lg:text-3xl font-serif text-[#1d130c] leading-snug md:leading-relaxed text-center italic">
            We&apos;re YE Global Media Corp, and we want to make sure you know what
            happens to your personal information when you hang out with us online.
            So, here are the rules we follow when it comes to handling your data.
          </p>

          <p className="editorial-text text-base md:text-xl lg:text-2xl text-[#1d130c] font-medium mt-6 md:mt-7 text-left md:text-center leading-relaxed">
            This Privacy Policy is our way of letting you know how we handle the
            personal information we collect from you. We&apos;re all about following
            the Australian Privacy Principles and the Privacy Act 1988 (Cth)
            (Privacy Act) because we take privacy seriously.
          </p>

          <div className="mt-7 md:mt-8 space-y-4 md:space-y-5 text-[#6b5e55] text-base md:text-xl lg:text-2xl leading-relaxed font-normal">
            <p>
              When we say &quot;we,&quot; &quot;our,&quot; or &quot;us,&quot; we&apos;re referring to
              YE Global Media Corp (ABN 30 792 917 848).
            </p>
            <p>
              Personal information is any info about you where your identity is
              clear or can be reasonably figured out. It might also include
              Sensitive Information.
            </p>
            <p>
              Sensitive Information covers details like your race, political
              opinions, religious beliefs, or medical info. We promise to handle
              it with care.
            </p>
            <p>
              This policy covers Personal Information that we collect directly
              from you. It&apos;s when you get in touch with us, use our website at
              www.yeglobalmediacorp.com.au (Website), or sign up to our newsletter.
              Sometimes we might need to make changes or add stuff to this policy
              and we&apos;ll let you know where possible.
            </p>
          </div>
        </section>

        {/* POLICY SECTIONS (tightened spacing between sections) */}
        <div className="mt-10 md:mt-12 space-y-10 md:space-y-12">
          {/* Section 1 */}
          <PolicySection title="Collection of Personal Information">
            <p>
              Okay, now let&apos;s talk about when we collect your Personal
              Information. Here are a few examples:
            </p>
            <OrderedList
              items={[
                "When you sign up to our newsletter or reach out to us for our Services, we’ll need some info like your name, address, phone number, domain name, and email address. Trust us, we handle it responsibly.",
                "Sometimes we collect non-personally identifying info for stats and marketing purposes. You know, stuff like server address, top-level domain name (.com, .gov, you get it), date and time of your visit, pages you accessed, documents you downloaded, where you came from, and the type of browser you use.",
                "Just to be clear, we won’t record any identifying details (like your name and IP) or your other browsing activities unless we’re legally obligated to do so. We’re not here to spy on you!",
                "We also collect Personal Information about our awesome staff, contractors, and job applicants. Things like names, addresses, contact details, and work experience. Gotta keep things running smoothly!",
                "Oh, and we gather some demographic info too. You know, to get a better picture of who we’re hanging out with.",
                "By the way, we’re not responsible for the privacy or security practices of other websites you might access through ours. Also, we can’t guarantee our customers’ compliance with our code. So when you do your thing online, be careful and stay smart.",
              ]}
            />
          </PolicySection>

          {/* Section 2 */}
          <PolicySection title="Use of Personal Information">
            <p>Alright, now that we have your info, here&apos;s what we use it for:</p>
            <OrderedList
              items={[
                "We use your Personal Information to provide you with info and top-notch support for our Services.",
                "We’ll keep you in the loop with any services updates, maintenance notices, and other important stuff.",
                "Oh, and we might use your info to measure your experience with our Services and Website. We’re always trying to improve and do better.",
                "From time to time, we might reach out to you about newsletters, surveys, and service audits. Don’t worry, you can always opt-out if it’s not your thing.",
                "If you participate in our surveys or other interactive communications, we’ll collect those responses to make our Services even better.",
                "Identifying the source of new customers is important to us. We like to know how people find us!",
                "If you have any complaints or feedback, we’ll use your info to address them and resolve any disputes.",
                "And of course, we’ll use your info for internal admin stuff. Got to keep things organised!",
              ]}
            />
            <p>
              By the way, when you sign up for our Services or make enquiries, you
              will be added to our general mailing list for industry insights and
              what&apos;s happening at Equality. But if you&apos;re not keen to receive
              this, no worries. You can opt-out anytime by following the
              instructions in the email you receive.
            </p>
          </PolicySection>

          {/* Section 3 */}
          <PolicySection title="Disclosure of Personal Information">
            <p>
              We take your privacy seriously, so we won&apos;t disclose your Personal
              Information without your consent, unless:
            </p>
            <OrderedList
              items={[
                "We’re required by law or believe in good faith that it’s necessary to protect our business interests. Like, if there’s a legal action and we need to disclose info to a court, you know the drill.",
                "We work with trusted contractors who provide licensed collections services, credit card payment processing, and CRM services. Rest assured, they follow our privacy and security policies.",
                "If we sell our business (which would be a big deal!), we might need to disclose your info as part of the deal.",
                "In extreme cases, we might need to disclose your info to protect the safety of our staff, or the public.",
              ]}
            />
            <p>
              Sometimes we might need to share your Personal Information with
              third parties who help us with services like market research,
              distributing marketing info (unless you opt-out), and supporting our
              Services. Don&apos;t worry, we have contracts with them that require them
              to keep your info confidential.
            </p>
            <p>
              Just so you know, some of these third-party service providers might
              be located outside of Australia. But we made sure their privacy and
              confidentiality provisions align with Australian privacy laws.
              We&apos;re all about keeping your info safe.
            </p>
          </PolicySection>

          {/* Section 4 */}
          <PolicySection title="Security of Your Personal Information">
            <p>
              We&apos;ve got your back when it comes to security. We store your data
              on controlled, secure servers in Australia. Sometimes we might
              transfer your data overseas, but only for storage purposes on those
              servers.
            </p>
            <p>
              We take reasonable steps to protect your info from misuse,
              interference, loss, and unauthorized access, modification, or
              disclosure. But, here&apos;s the thing: we can&apos;t control everything. So,
              if there&apos;s an interception over the internet, unpatched
              vulnerabilities, spyware, or if you don&apos;t protect your username or
              password, we can&apos;t be held responsible. Stay vigilant.
            </p>
            <p>
              We&apos;re not liable for any losses, expenses, damages, and costs
              (including legal fees) resulting from third-party access to your
              info. We&apos;re doing our best to keep things secure, but we can&apos;t
              control everything.
            </p>
            <p>
              If we suspect unauthorized access or disclosure of your info
              (eligible data breach), we&apos;ll investigate and assess the situation.
              If it&apos;s serious and likely to harm you, we&apos;ll notify you and the
              Australian Information Commissioner as soon as possible. We take our
              obligations seriously.
            </p>
            <p>
              When we no longer need your info (unless the law says otherwise),
              we&apos;ll destroy it. No unnecessary data hanging around.
            </p>
            <p>
              Oh, and be aware that any info you share publicly through chat
              sessions, email exchanges, or newsgroups accessed via our websites
              might be available to anyone with access to those sites. So, be
              cautious about what you disclose publicly.
            </p>
          </PolicySection>

          {/* Section 5 */}
          <PolicySection title="Accessing Your Personal Information">
            <p>
              You have the right to access and correct your Personal Information
              under the Privacy Act. If you want to access or correct your info,
              just reach out to our team at hello@yeglobalmediacorp.com.au They will help
              you out.
            </p>
            <p>
              To ensure your privacy and protect others&apos; info, you&apos;ll need to
              provide proof of identity when requesting access. Also, be clear
              about the specific info you need. We might need to charge an admin
              fee, but we&apos;ll be reasonable and of course will let you know
              beforehand.
            </p>
            <p>
              If we can&apos;t grant you access or correct your info, we&apos;ll explain
              why in writing and provide details of complaint mechanisms. We want
              to be transparent and fair.
            </p>
          </PolicySection>

          {/* Section 6 */}
          <PolicySection title="Complaints">
            <p>
              If you have any complaints about our privacy procedures, don&apos;t
              hesitate to contact our team. We take privacy complaints seriously
              and will handle them promptly and confidentially.
            </p>
            <p>
              If we can&apos;t resolve your complaint within a reasonable time, you
              can escalate it to the Australian Information Commissioner.
              We&apos;re committed to doing the right thing!
            </p>
            <p className="pt-3">
              So, that&apos;s it! We hope our Privacy Policy makes things clearer for
              you. If you have any questions or need further clarification, feel
              free to reach out. Our team is here to help you!
            </p>
          </PolicySection>

          {/* Last updated */}
          <section className="max-w-[820px] mx-auto border-t border-[#ff6a00]/20 pt-6">
            <p className="text-sm text-[#6b5e55] italic">Last updated: February 2026</p>
          </section>
        </div>
      </main>

      {/* Footer */}
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

/* ----------------- Reusable section helpers (same rhythm as About) ----------------- */

function PolicySection({ title, children }) {
  return (
    <section className="max-w-[820px] mx-auto">
      <header className="text-center">
        <h2 className="font-['Playfair Display',serif] text-2xl md:text-3xl text-[#1d130c]">
          {title}
        </h2>
        <div className="mt-4 w-12 h-px bg-[#ff6a00] mx-auto" />
      </header>

      <div className="mt-6 space-y-4 md:space-y-5 text-[#6b5e55] text-base md:text-xl lg:text-2xl leading-relaxed font-normal">
        {children}
      </div>
    </section>
  );
}

function OrderedList({ items = [] }) {
  return (
    <ol className="list-decimal list-outside ml-6 space-y-2 md:space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="leading-relaxed">
          {item}
        </li>
      ))}
    </ol>
  );
}
