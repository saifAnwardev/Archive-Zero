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
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export default function ContactSection() {
  return (
    <div className="relative w-full h-full flex overflow-hidden">

      {/* ── BG diamond ── */}
      <img
        src="/archive/diamond.png"
        alt=""
        className="absolute pointer-events-none"
        style={{
          top: "50%", left: "38%",
          transform: "translate(-50%, -50%)",
          width: "62vw",
          opacity: 0.22,
          filter: "brightness(1.6) saturate(1.3)",
          mixBlendMode: "screen",
        }}
      />

      {/* glow */}
      <div className="absolute pointer-events-none" style={{
        top: "50%", left: "38%",
        transform: "translate(-50%, -50%)",
        width: "50vw", height: "50vw",
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(100,80,200,0.14) 0%, transparent 70%)",
      }} />

      {/* rings */}
      {["48vw", "32vw"].map((size, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none" style={{
          top: "50%", left: "38%",
          transform: "translate(-50%, -50%)",
          width: size, height: size,
          border: `1px solid rgba(255,255,255,${i === 0 ? 0.04 : 0.07})`,
        }} />
      ))}

      {/* vertical label */}
      <div className="absolute left-6 top-1/2 z-30" style={{
        writingMode: "vertical-rl",
        fontFamily: "monospace", fontSize: "9px",
        letterSpacing: "0.4em", opacity: 0.2,
        transform: "translateY(-50%) rotate(180deg)",
      }}>
        FINAL NODE
      </div>

      {/* ── LEFT ── */}
      <div className="relative z-10 w-[44%] flex flex-col justify-center pl-20 pr-6">

        <FadeIn delay={100}>
          <p className="text-xs tracking-[0.45em] mb-6" style={{ fontFamily: "monospace", opacity: 0.5, color: "#a090ff" }}>
            05. FINAL NODE
          </p>
        </FadeIn>

        <FadeIn delay={200}>
          <h2 style={{ fontFamily: "var(--font-exhibition)" }}
            className="font-light leading-[0.88] mb-12 opacity-95"
          >
            <span className="block text-[clamp(4rem,8vw,7rem)]">LET'S</span>
            <span className="block text-[clamp(4rem,8vw,7rem)]">CONNECT.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={400}>
          <div className="space-y-2 mb-12">
            {[
              "COLLABORATIONS. OPPORTUNITIES.",
              "IDEAS THAT BUILD NEW WORLDS.",
              "I'M ALWAYS OPEN TO CREATING",
              "SOMETHING IMPACTFUL TOGETHER.",
            ].map((line) => (
              <p key={line} className="text-sm tracking-[0.2em]" style={{ fontFamily: "monospace", opacity: 0.45 }}>
                {line}
              </p>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={650}>
          <div className="space-y-1">
            {[
              "> INITIATING CONNECTION PROTOCOL...",
              "> SCANNING INTENT...",
              "> ALIGNING FREQUENCIES...",
              "> READY",
            ].map((line, i) => (
              <p key={i} className="text-[11px] tracking-[0.15em]" style={{
                fontFamily: "monospace",
                opacity: 0.12 + i * 0.06,
                color: i === 3 ? "#a090ff" : "inherit",
              }}>
                {line}
              </p>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* ── RIGHT: form panel ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center py-10 pr-14 pl-4">

        <FadeIn delay={250}>
          <div className="p-8 mb-5" style={{
            border: "1px solid rgba(255,255,255,0.1)",
            background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
            backdropFilter: "blur(16px)",
          }}>
            {/* header */}
            <div className="flex items-center justify-between mb-7">
              <p className="text-xs tracking-[0.4em]" style={{ fontFamily: "monospace", opacity: 0.4 }}>
                / SEND A MESSAGE
              </p>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: "rgba(160,144,255,0.5)" }} />
                <div className="w-2 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
              </div>
            </div>

            {/* name + email */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              {[["NAME", "text"], ["EMAIL", "email"]].map(([ph, type]) => (
                <input key={ph} type={type} placeholder={ph}
                  className="w-full bg-transparent text-xs tracking-[0.2em] py-4 px-5 outline-none text-white/60"
                  style={{
                    fontFamily: "monospace",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: "2px",
                  }}
                />
              ))}
            </div>

            {/* subject */}
            <input type="text" placeholder="SUBJECT"
              className="w-full bg-transparent text-xs tracking-[0.2em] py-4 px-5 outline-none text-white/60 mb-3"
              style={{ fontFamily: "monospace", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "2px" }}
            />

            {/* message */}
            <textarea placeholder="MESSAGE" rows={5}
              className="w-full bg-transparent text-xs tracking-[0.2em] py-4 px-5 outline-none text-white/60 mb-3 resize-none"
              style={{ fontFamily: "monospace", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "2px" }}
            />

            {/* transmit */}
            <a href="mailto:saif.anwar40@gmail.com"
              className="flex items-center justify-between w-full py-4 px-5 transition-all duration-300 group"
              style={{ border: "1px solid rgba(160,144,255,0.35)", background: "rgba(100,80,200,0.1)" }}
            >
              <span className="text-xs tracking-[0.35em] transition-opacity group-hover:opacity-100"
                style={{ fontFamily: "monospace", opacity: 0.65 }}>
                TRANSMIT MESSAGE
              </span>
              <span className="text-base transition-colors group-hover:text-white" style={{ color: "rgba(160,144,255,0.7)" }}>↗</span>
            </a>
          </div>
        </FadeIn>

        {/* channels */}
        <FadeIn delay={450}>
          <p className="text-[10px] tracking-[0.45em] mb-4" style={{ fontFamily: "monospace", opacity: 0.3 }}>
            / OTHER CHANNELS
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "EMAIL", sub: "saif.anwar40@gmail.com", href: "mailto:saif.anwar40@gmail.com" },
              { label: "INSTAGRAM", sub: "@saif_anwar04", href: "https://instagram.com/saif_anwar04" },
              { label: "COLLABORATE", sub: "Open for Projects", href: "mailto:saif.anwar40@gmail.com?subject=Collaboration" },
            ].map((ch) => (
              <a key={ch.label} href={ch.href} target="_blank" rel="noopener noreferrer"
                className="p-5 transition-all duration-300 group hover:border-white/20"
                style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
              >
                <p className="text-xs tracking-[0.3em] mb-2 transition-opacity group-hover:opacity-90"
                  style={{ fontFamily: "monospace", opacity: 0.5 }}>
                  {ch.label}
                </p>
                <p className="text-[10px] tracking-[0.1em] transition-opacity group-hover:opacity-60"
                  style={{ fontFamily: "monospace", opacity: 0.3 }}>
                  {ch.sub}
                </p>
              </a>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={700} className="mt-5 text-right">
          <p className="text-[9px] tracking-[0.3em]" style={{ fontFamily: "monospace", opacity: 0.15 }}>
            THANK YOU FOR VISITING THE ARCHIVE.
          </p>
        </FadeIn>

      </div>

      {/* AZ */}
      <div className="absolute bottom-6 left-14 text-[10px] tracking-[0.3em] opacity-15 z-30"
        style={{ fontFamily: "monospace" }}>AZ</div>
      <div className="absolute bottom-6 left-6 z-30" style={{
        writingMode: "vertical-rl", fontFamily: "monospace",
        fontSize: "9px", letterSpacing: "0.3em", opacity: 0.15,
        transform: "rotate(180deg)",
      }}>EST. 2025</div>

    </div>
  );
}