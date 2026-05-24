"use client";

import Lenis from "lenis";
import { useEffect, useRef } from "react";
import CinematicOverlay from "@/components/CinematicOverlay";
import HeroScene from "@/components/HeroScene";
import IntroSequence from "@/components/IntroSequence";

export default function HeroExperience() {
  const scrollProgress = useRef(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.7,
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.72,
    });
    let frame = 0;

    lenis.on("scroll", ({ scroll, limit }: { scroll: number; limit: number }) => {
      scrollProgress.current = limit ? Math.min(scroll / limit, 1) : 0;
    });

    const handleScrollTo = (e: CustomEvent) => {
      lenis.scrollTo(e.detail, { duration: 1.8 });
    };
    window.addEventListener("scrollTo", handleScrollTo as EventListener);

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      window.removeEventListener("scrollTo", handleScrollTo as EventListener);
    };
  }, []);

  return (
    <section className="sticky top-0 isolate h-svh overflow-hidden">
      <HeroScene scrollProgress={scrollProgress} />
      <div className="vignette pointer-events-none absolute inset-0 z-10" />
      <div className="film-grain pointer-events-none absolute inset-0 z-20" />
      <CinematicOverlay />
      <IntroSequence />
    </section>
  );
}