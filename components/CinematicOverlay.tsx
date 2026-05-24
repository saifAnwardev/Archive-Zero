"use client";

import { motion, type Variants } from "framer-motion";

const reveal: Variants = {
  hidden: { opacity: 0, y: 34, filter: "blur(14px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay, duration: 1.7, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function CinematicOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-30">
      <header className="absolute inset-x-0 top-0 flex items-start justify-between px-5 pt-5 sm:px-9 sm:pt-8 lg:px-12">
        <motion.div
          animate="visible"
          custom={0.45}
          initial="hidden"
          variants={reveal}
        >
          <p className="editorial text-3xl leading-none text-[#f4efe8] sm:text-4xl">SA.</p>
          <p className="mt-3 max-w-24 text-[0.62rem] uppercase leading-4 tracking-[0.28em] text-[#bcb3a8]">
            Couture archive
          </p>
        </motion.div>
        <motion.div
          animate="visible"
          className="text-right text-[0.62rem] uppercase leading-5 tracking-[0.32em] text-[#cdc4ba]"
          custom={0.82}
          initial="hidden"
          variants={reveal}
        >
          <p>Page No.</p>
          <p className="text-[#756d66]">01 / Void</p>
        </motion.div>
      </header>

      <div className="absolute inset-x-0 top-[19svh] px-5 sm:px-9 lg:px-12">
        <motion.p
          animate="visible"
          className="mb-5 max-w-72 text-[0.62rem] uppercase leading-5 tracking-[0.34em] text-[#d4c8bc]"
          custom={0.64}
          initial="hidden"
          variants={reveal}
        >
          Digital couture archive
        </motion.p>
        <motion.h1
          animate="visible"
          className="hero-display max-w-[min(48rem,64vw)] uppercase text-[4.3rem] leading-[0.79] text-[#e9e5dd] sm:text-[6.9rem] lg:text-[9.2rem] xl:text-[10.8rem] 2xl:text-[12rem]"
          custom={0.74}
          initial="hidden"
          style={{ fontFamily: "var(--font-exhibition), Didot, 'Times New Roman', serif" }}
          variants={reveal}
        >
          <span className="block">Saif</span>
          <span className="relative block pl-[5vw] text-[#cbc6c0] before:absolute before:left-0 before:top-[0.52em] before:h-px before:w-[3.5vw] before:bg-[#807976]/70">
            Anwar
          </span>
        </motion.h1>
      </div>

      <motion.aside
        animate="visible"
        className="panel-glass absolute right-5 top-[53svh] hidden w-52 p-5 text-[#e6dfd5] sm:block lg:right-12 lg:w-60"
        custom={1.02}
        initial="hidden"
        variants={reveal}
      >
        <p className="editorial text-3xl leading-[0.92]">Archive Zero</p>
        <p className="mt-4 text-[0.62rem] uppercase leading-5 tracking-[0.28em] text-[#b8aca1]">
          My Portfolio, highlighting Brand reimagination, Moodbaord creation, visual identity
        </p>
      </motion.aside>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 px-5 pb-6 sm:px-9 sm:pb-8 lg:px-12 lg:pb-11">
        <motion.div
          animate="visible"
          className="max-w-xs"
          custom={1.16}
          initial="hidden"
          variants={reveal}
        >
          <p className="text-[0.65rem] uppercase leading-5 tracking-[0.3em] text-[#d0c5ba]">
            Reimagination creates Identity
          </p>
          <p className="mt-3 max-w-56 text-sm leading-6 text-[#aaa19a]">
            Move through the chamber and let the silhouette find the light.
          </p>
        </motion.div>
        <motion.div
          animate="visible"
          className="flex items-center gap-4 pb-1 text-[0.62rem] uppercase tracking-[0.36em] text-[#d0c5ba]"
          custom={1.28}
          initial="hidden"
          variants={reveal}
        >
          <span className="hidden sm:inline">Scroll</span>
          <span className="h-20 w-px bg-gradient-to-b from-[#eee8de] to-transparent" />
        </motion.div>
      </div>
    </div>
  );
}
