"use client";

import HeroExperience from "@/components/HeroExperience";
import ExhibitionGallery from "@/components/ExhibitionGallery";
import AboutSection from "@/components/AboutMe";
import ContactSection from "@/components/ContactSection";

export default function Page() {
  return (
    <main className="relative h-[500vh] overflow-x-hidden bg-[#030303] text-[#eee8de]">
      <section className="relative h-[500vh]">

        <div className="sticky top-0 h-screen">
          <HeroExperience />
        </div>

        <section
          id="concept"
          className="absolute top-[100vh] h-screen w-full z-20 flex items-center"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.35] z-10"
          >
            <source src="/archive/black-hole.mp4" type="video/mp4" />
          </video>

          <img
            src="/archive/alien-1.png"
            className="absolute bottom-0 right-0 w-[38vw] max-w-[520px] opacity-70 mix-blend-screen pointer-events-none z-20"
            style={{
              maskImage: "linear-gradient(to top, black 50%, transparent 90%), linear-gradient(to left, black 60%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to top, black 50%, transparent 90%), linear-gradient(to left, black 60%, transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          />

          <img
            src="/archive/alien-2.jpeg"
            className="absolute top-0 left-0 w-[30vw] max-w-[440px] opacity-50 mix-blend-screen pointer-events-none z-20 animate-float"
            style={{
              maskImage: "linear-gradient(to bottom, black 40%, transparent 85%), linear-gradient(to right, black 55%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 85%), linear-gradient(to right, black 55%, transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          />

          <div className="relative z-20 w-full flex flex-col items-center justify-center text-center px-8">
            <p className="text-xs tracking-[0.3em] opacity-60 mb-6">CONCEPT</p>
            <h2
              style={{ fontFamily: "var(--font-void)" }}
              className="text-8xl font-light tracking-[-0.08em] leading-[0.85] mb-8"
            >
              ARCHIVE ZERO.
            </h2>
            <p className="opacity-70 leading-9 max-w-md">
              Zero is not emptiness — it is infinity.<br />
              This website is not just a portfolio, but a fragment of my larger vision.<br />
              To me fashion is not just clothing, but culture, identity and provocation.<br />
              What you see is the beginning. The archive is infinite.
            </p>
          </div>
        </section>

        <section id="projects" className="absolute top-[200vh] h-screen w-full z-20">
          <ExhibitionGallery />
        </section>

        <section id="about" className="absolute top-[300vh] h-screen w-full z-20">
          <AboutSection />
        </section>

        <section id="contact" className="absolute top-[400vh] h-screen w-full z-20">
          <ContactSection />
        </section>

      </section>

      <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 flex gap-8 z-[100] text-[11px] tracking-[0.35em] text-[#d8cfc4]">
        <button className="hover:opacity-100 opacity-60 transition"
          onClick={() => window.dispatchEvent(new CustomEvent("scrollTo", { detail: 0 }))}>
          HOME
        </button>
        <button className="hover:opacity-100 opacity-60 transition"
          onClick={() => window.dispatchEvent(new CustomEvent("scrollTo", { detail: window.innerHeight }))}>
          CONCEPT
        </button>
        <button className="hover:opacity-100 opacity-60 transition"
          onClick={() => window.dispatchEvent(new CustomEvent("scrollTo", { detail: window.innerHeight * 2 }))}>
          PROJECTS
        </button>
        <button className="hover:opacity-100 opacity-60 transition"
          onClick={() => window.dispatchEvent(new CustomEvent("scrollTo", { detail: window.innerHeight * 3 }))}>
          ABOUT
        </button>
        <button className="hover:opacity-100 opacity-60 transition"
          onClick={() => window.dispatchEvent(new CustomEvent("scrollTo", { detail: window.innerHeight * 4 }))}>
          CONTACT
        </button>
      </nav>

    </main>
  );
}