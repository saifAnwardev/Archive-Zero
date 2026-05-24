"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  {
    id: "01",
    title: "PERSONAL PORTFOLIO",
    tags: ["VISUAL IDENTITY", "CAMPAIGN SYSTEM"],
    pdf: "/archive/saif-portfolio.pdf",
    img: "/archive/project-file1.png",
  },
  {
    id: "02",
    title: "SACRED MAXIMALISM",
    tags: ["BRAND REIMAGINATION", "EDITORIAL DIRECTION"],
    pdf: "/archive/sacred-maximalism.pdf",
    img: "/archive/project-file3.png",
  },
  {
    id: "03",
    title: "VISUAL RESEARCH",
    tags: ["MARKET TRENDS", "LUXURY FASHION"],
    pdf: "/archive/visual-research.pdf",
    img: "/archive/project-file5.png",
  },
];

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
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export default function ExhibitionGallery() {
  return (
    <div className="relative w-full h-full flex overflow-hidden">

      {/* bg image — the monolith */}
      <img
        src="/archive/monolith.png"
        alt=""
        className="absolute pointer-events-none"
        style={{
          top: "50%", left: "38%",
          transform: "translate(-50%, -50%)",
          height: "95%",
          width: "auto",
          opacity: 0.28,
          filter: "brightness(0.9) sepia(0.3)",
          mixBlendMode: "screen",
        }}
      />

      {/* vertical glow line */}
      <div className="absolute pointer-events-none" style={{
        top: 0, bottom: 0,
        left: "38%",
        transform: "translateX(-50%)",
        width: "1px",
        background: "linear-gradient(to bottom, transparent 0%, rgba(200,170,120,0.15) 30%, rgba(200,170,120,0.08) 70%, transparent 100%)",
      }} />

      {/* vertical rotated label */}
      <div className="absolute left-6 top-1/2 z-20" style={{
        writingMode: "vertical-rl",
        fontFamily: "monospace", fontSize: "9px",
        letterSpacing: "0.4em", opacity: 0.2,
        transform: "translateY(-50%) rotate(180deg)",
      }}>
        CURATOR OF NARRATIVES
      </div>

      {/* ── LEFT: title block ── */}
      <div className="relative z-10 w-[44%] flex flex-col justify-center pl-20 pr-8">

        <FadeIn delay={100}>
          <p className="text-[10px] tracking-[0.5em] mb-6" style={{ fontFamily: "monospace", opacity: 0.4 }}>
            DIGITAL COUTURE ARCHIVE
          </p>
        </FadeIn>

        <FadeIn delay={200}>
          <h2 style={{ fontFamily: "var(--font-exhibition)" }}
            className="font-light leading-[0.88] mb-10 opacity-95">
            <span className="block" style={{ fontSize: "clamp(4.5rem, 9vw, 8rem)" }}>SELECTED</span>
            <span className="block" style={{ fontSize: "clamp(4.5rem, 9vw, 8rem)" }}>WORKS.</span>
          </h2>
        </FadeIn>

        {/* divider */}
        <FadeIn delay={350}>
          <div className="w-12 h-[1px] mb-8" style={{ background: "rgba(255,255,255,0.2)" }} />
        </FadeIn>

        <FadeIn delay={450}>
          <div className="space-y-1 mb-12 max-w-xs">
            {[
              "A CURATED SELECTION OF PROJECTS",
              "EXPLORING THE INTERSECTION OF",
              "FASHION, IDENTITY AND FUTURE.",
              "EACH PROJECT IS AN ARCHIVE—",
              "A STORY, A VISION, A WORLD.",
            ].map((line) => (
              <p key={line} className="text-[11px] tracking-[0.18em]"
                style={{ fontFamily: "monospace", opacity: 0.35 }}>
                {line}
              </p>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={600}>
          <div className="flex items-start gap-3">
            <span className="text-white/20 mt-1">+</span>
            <div>
              <p className="text-[10px] tracking-[0.2em]" style={{ fontFamily: "monospace", opacity: 0.3 }}>
                CLICK ON A PROJECT
              </p>
              <p className="text-[10px] tracking-[0.2em]" style={{ fontFamily: "monospace", opacity: 0.3 }}>
                TO OPEN THE PDF DOCUMENT.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* AZ corner */}
        <div className="absolute bottom-8 left-20 text-xs tracking-[0.3em] opacity-15"
          style={{ fontFamily: "monospace" }}>AZ</div>

        {/* copyright */}
        <div className="absolute bottom-8 left-8 text-[9px] tracking-[0.2em] opacity-15"
          style={{ fontFamily: "monospace" }}>© ARCHIVE ZERO. 2025</div>

      </div>

      {/* ── RIGHT: project list ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center py-12 pr-16 pl-8">

        <div className="space-y-0">
          {projects.map((project, i) => (
            <FadeIn key={project.id} delay={300 + i * 150}>
              <a
                href={project.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-8 py-8 border-b transition-all duration-500 hover:pl-3"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
              >
                {/* number */}
                <div className="flex-shrink-0 w-16">
                  <span className="text-4xl font-light opacity-30 group-hover:opacity-60 transition-opacity"
                    style={{ fontFamily: "var(--font-exhibition)" }}>
                    {project.id}
                  </span>
                  <div className="w-8 h-[1px] mt-1 transition-all duration-500 group-hover:w-14"
                    style={{ background: "rgba(255,255,255,0.2)" }} />
                </div>

                {/* title + tags */}
                <div className="flex-1">
                  <h3
                    className="text-3xl font-light mb-3 opacity-80 group-hover:opacity-100 transition-opacity tracking-wide"
                    style={{ fontFamily: "var(--font-exhibition)" }}
                  >
                    {project.title}
                  </h3>
                  <div className="flex gap-4">
                    {project.tags.map((tag) => (
                      <p key={tag} className="text-[10px] tracking-[0.25em] opacity-35"
                        style={{ fontFamily: "monospace" }}>
                        {tag}
                      </p>
                    ))}
                  </div>
                  <p className="text-[10px] tracking-[0.3em] mt-4 opacity-30 group-hover:opacity-70 transition-opacity"
                    style={{ fontFamily: "monospace" }}>
                    OPEN PDF ↗
                  </p>
                </div>

                {/* thumbnail */}
                <div className="flex-shrink-0 relative overflow-hidden"
                  style={{ width: "160px", height: "110px", border: "1px solid rgba(255,255,255,0.08)" }}>
                  {/* corner marks */}
                  {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos) => (
                    <div key={pos} className={`absolute ${pos} w-3 h-3 pointer-events-none z-10`}
                      style={{
                        borderTop: pos.includes("top") ? "1px solid rgba(255,255,255,0.25)" : "none",
                        borderBottom: pos.includes("bottom") ? "1px solid rgba(255,255,255,0.25)" : "none",
                        borderLeft: pos.includes("left") ? "1px solid rgba(255,255,255,0.25)" : "none",
                        borderRight: pos.includes("right") ? "1px solid rgba(255,255,255,0.25)" : "none",
                      }}
                    />
                  ))}
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "brightness(0.7) grayscale(0.3)" }}
                  />
                  {/* plus */}
                  <div className="absolute top-2 right-2 text-white/30 group-hover:text-white/60 transition-colors text-xs"
                    style={{ fontFamily: "monospace" }}>+</div>
                </div>

              </a>
            </FadeIn>
          ))}
        </div>

      </div>

    </div>
  );
}