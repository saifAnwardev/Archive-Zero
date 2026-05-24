"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function IntroSequence() {
  const curtain = useRef<HTMLDivElement>(null);
  const flare = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    timeline
      .fromTo(curtain.current, { opacity: 1 }, { opacity: 0, duration: 2.4, delay: 0.08 })
      .fromTo(
        flare.current,
        { opacity: 0, scaleY: 0.2 },
        { opacity: 0.72, scaleY: 1, duration: 1.4 },
        0.34,
      )
      .to(flare.current, { opacity: 0.16, duration: 2.2 }, 1.18);

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <>
      <div
        ref={curtain}
        className="pointer-events-none absolute inset-0 z-50 bg-black"
      />
      <div
        ref={flare}
        className="pointer-events-none absolute left-[57%] top-[-8svh] z-20 h-[86svh] w-px origin-top bg-gradient-to-b from-transparent via-[#f1e8db] to-transparent blur-[0.2px]"
      />
    </>
  );
}
