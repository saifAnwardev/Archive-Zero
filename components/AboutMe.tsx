"use client";

import { useEffect, useRef, useState } from "react";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function AboutSection() {
  return (
    <div className="relative w-full h-full flex overflow-hidden">

      {/* ── LEFT: full height image stack ── */}
      <div className="relative w-[52%] h-full flex-shrink-0">

        {/* cathedral bg — bottom layer */}
        <img
          src="/archive/cosmos_433230485.jpeg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ filter: "brightness(0.35) grayscale(0.4)" }}
        />

        {/* second cathedral layered on top for depth */}
        <img
          src="/archive/cosmos_943230348.jpeg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{
            filter: "brightness(0.2) grayscale(0.6)",
            mixBlendMode: "luminosity",
            opacity: 0.5,
          }}
        />

        {/* your photo — centered, desaturated, blended */}
<div className="absolute inset-0 flex items-center justify-center" style={{ height: "100%" }}>
  <img
    src="/archive/saif.png"
    alt="Saif Anwar"
    className="relative z-10"
    style={{
      objectFit: "cover",
      objectPosition: "top",
              width: "72%",
              height: "92%",
              filter: "grayscale(100%) contrast(1.1) brightness(0.75)",
              mixBlendMode: "luminosity",
              maskImage: "linear-gradient(to bottom, black 55%, transparent 100%), linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 100%), linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          />
        </div>

        {/* halo ring behind the figure */}
        <div
          className="absolute z-10 rounded-full pointer-events-none"
          style={{
            width: "55%",
            aspectRatio: "1",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -58%)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 0 80px rgba(255,255,255,0.04), inset 0 0 80px rgba(255,255,255,0.03)",
          }}
        />

        {/* bottom fade into dark */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none z-20"
          style={{ background: "linear-gradient(to top, #030303, transparent)" }}
        />

        {/* left edge fade */}
        <div
          className="absolute inset-y-0 left-0 w-16 pointer-events-none z-20"
          style={{ background: "linear-gradient(to right, #030303, transparent)" }}
        />

        {/* small inset card bottom left — like the reference */}
        <div
          className="absolute bottom-10 left-10 z-30 p-4 max-w-[180px]"
          style={{
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
          }}
        >
          <p
            className="text-[9px] tracking-[0.3em] leading-6 opacity-60"
            style={{ fontFamily: "monospace" }}
          >
            IDENTITY IS<br />
            A CONSTRUCT.<br />
            EXPRESSION IS<br />
            THE FREEDOM.
          </p>
        </div>

        {/* vertical rotated label left edge */}
        <div
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30"
          style={{
            writingMode: "vertical-rl",
            fontFamily: "monospace",
            fontSize: "9px",
            letterSpacing: "0.4em",
            opacity: 0.2,
            transform: "translateY(-50%) rotate(180deg)",
          }}
        >
          CURATOR OF NARRATIVES
        </div>
      </div>

      {/* ── RIGHT: text content ── */}
      <div className="flex-1 flex flex-col justify-center pl-14 pr-16 py-12 overflow-y-auto">

        {/* top label + line */}
        <FadeIn delay={100} className="flex items-center gap-4 mb-8">
          <p
            className="text-[10px] tracking-[0.4em] opacity-40"
            style={{ fontFamily: "monospace" }}
          >
            ABOUT
          </p>
          <div className="flex-1 h-[1px]" style={{ background: "rgba(255,255,255,0.15)" }} />
        </FadeIn>

        {/* big title */}
        <FadeIn delay={200}>
          <h2
            style={{ fontFamily: "var(--font-exhibition)" }}
            className="text-6xl font-light leading-[0.9] mb-10 opacity-90"
          >
            THE<br />ARCHIVIST.
          </h2>
        </FadeIn>

        {/* WHO I AM */}
        <FadeIn delay={350} className="mb-8">
          <p
            className="text-[10px] tracking-[0.4em] opacity-40 mb-3"
            style={{ fontFamily: "monospace" }}
          >
            / WHO I AM
          </p>
          <div className="w-8 h-[1px] mb-4" style={{ background: "rgba(255,255,255,0.2)" }} />
          <p
            className="text-sm leading-7 opacity-65 max-w-sm"
            style={{ fontFamily: "var(--font-editorial)" }}
          >
            My name is Saif Anwar, I'm 21 — a fashion enthusiast with a strong interest in reimagining how brands present themselves within fashion and contemporary culture.
          </p>
        </FadeIn>

        {/* FOCUS */}
        <FadeIn delay={500} className="mb-8">
          <p
            className="text-[10px] tracking-[0.4em] opacity-40 mb-4"
            style={{ fontFamily: "monospace" }}
          >
            / FOCUS
          </p>
          <div className="w-8 h-[1px] mb-4" style={{ background: "rgba(255,255,255,0.2)" }} />
          {["LUXURY FASHION NARRATIVES", "VISUAL IDENTITY", "BRAND POSITIONING", "EXPERIMENTAL CAMPAIGNS"].map((item, i) => (
            <p
              key={item}
              className="text-xs tracking-[0.25em] opacity-50 mb-2"
              style={{ fontFamily: "monospace", transitionDelay: `${500 + i * 80}ms` }}
            >
              {item}
            </p>
          ))}
        </FadeIn>

        {/* PHILOSOPHY */}
        <FadeIn delay={700} className="mb-10">
          <p
            className="text-[10px] tracking-[0.4em] opacity-40 mb-3"
            style={{ fontFamily: "monospace" }}
          >
            / PHILOSOPHY
          </p>
          <div className="w-8 h-[1px] mb-4" style={{ background: "rgba(255,255,255,0.2)" }} />
          <p
            className="text-sm leading-7 opacity-40 max-w-sm"
            style={{ fontFamily: "monospace", fontSize: "11px", letterSpacing: "0.05em" }}
          >
            Campaigns like Jacquemus's viral pop-up vending machines and Bottega Veneta's disappearance from social media fascinate me. Radical moves that worked because they understood their audience deeply.
          </p>
        </FadeIn>

        {/* links */}
        <FadeIn delay={900} className="flex gap-8">
          {["INSTAGRAM", "LINKEDIN", "CONTACT"].map((link) => (
            <button
              key={link}
              className="text-[10px] tracking-[0.3em] opacity-30 hover:opacity-80 transition-opacity duration-300 border-b border-white/10 hover:border-white/40 pb-1"
              style={{ fontFamily: "monospace" }}
            >
              {link}
            </button>
          ))}
        </FadeIn>

      </div>

      {/* corner labels */}
      <div
        className="absolute bottom-5 right-6 text-[9px] tracking-[0.4em] opacity-15 z-30"
        style={{ fontFamily: "monospace" }}
      >
        2025
      </div>
      <div
        className="absolute top-5 right-6 text-[9px] tracking-[0.4em] opacity-15 z-30"
        style={{ fontFamily: "monospace" }}
      >
        AZ
      </div>

    </div>
  );
}