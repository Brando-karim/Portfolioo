"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { MapPin } from "lucide-react"
import "./projects/projects.css"

const techStack = [
  { name: "React",       color: "#61DAFB", angle: 0   },
  { name: "Laravel",     color: "#FF2D20", angle: 40  },
  { name: "JavaScript",  color: "#F7DF1E", angle: 80  },
  { name: "TypeScript",  color: "#3178C6", angle: 120 },
  { name: "Node.js",     color: "#68A063", angle: 160 },
  { name: "Express",     color: "#94a3b8", angle: 200 },
  { name: "MySQL",       color: "#00758F", angle: 240 },
  { name: "Docker",      color: "#2496ED", angle: 280 },
  { name: "Git",         color: "#F05032", angle: 320 },
]

export default function AboutSection() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([])
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [locationPulsing, setLocationPulsing] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("abt-card-in")
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
    )
    const titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("abt-title-in")
        })
      },
      { threshold: 0.1 },
    )

    if (titleRef.current) titleObserver.observe(titleRef.current)
    sectionsRef.current.forEach((s) => { if (s) observer.observe(s) })

    return () => { observer.disconnect(); titleObserver.disconnect() }
  }, [])

  const handleLocation = () => {
    setLocationPulsing(true)
    setTimeout(() => setLocationPulsing(false), 2000)
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
    angle = (angle + 360) % 360;
    card.style.setProperty("--start", `${angle + 60}`);
  };

  return (
    <section id="Life" className="pb-16 sm:pb-20 md:pb-28">
      <div className="container mx-auto px-4 pt-4">

        {/* Section heading */}
        <h2
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl font-light text-center mb-16 sm:mb-20 tracking-wide opacity-0 translate-y-12 bg-gradient-to-r from-foreground via-primary/80 to-foreground bg-clip-text text-transparent abt-heading"
        >
          About Me
          <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mx-auto mt-4 animate-pulse" />
        </h2>

        {/* Three-card grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

          {/* ── Card 1: Profile ── */}
          <div
            ref={(el) => { sectionsRef.current[0] = el }}
            onMouseMove={handleCardMouseMove}
            className="card card-border abt-card opacity-0 translate-y-16 flex flex-col gap-5 p-7 rounded-2xl w-full h-full relative"
            style={{ transitionDelay: "0ms" }}
          >
            <div className="glow pointer-events-none z-0"></div>
            
            {/* Content Container (z-10 to stay above glow/bg) */}
            <div className="relative z-10 flex flex-col h-full gap-5">
              {/* Headshot */}


              {/* Title block */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-white leading-tight">Hi, I&apos;m Karim Benjelloul</h3>
                <p className="text-sm text-cyan-400 mt-1 font-medium tracking-wide">
                  Full-Stack Developer &amp; Computer Engineering Student
                </p>
              </div>

              {/* Bio */}
              <p className="text-gray-400 leading-relaxed text-sm flex-1">
                I&apos;m a full-stack developer based in{" "}
                <span className="text-white font-medium">Tangier, Morocco</span>, specializing in React, Laravel, and
                MySQL. I&apos;m currently studying Computer Engineering at ENSI, where I focus on algorithms, databases,
                and cloud computing. My recent work includes{" "}
                <span className="text-white font-medium">Elyassini Exchange App</span> — a freelance exchange management
                application — along with other full-stack and mobile projects built using React, Laravel, and React Native
                Expo. I focus on shipping clean, maintainable code that solves real problems.
              </p>
            </div>
          </div>

          {/* ── Card 2: Tech Stack ── */}
          <div
            ref={(el) => { sectionsRef.current[1] = el }}
            onMouseMove={handleCardMouseMove}
            className="card card-border abt-card opacity-0 translate-y-16 flex flex-col gap-5 p-7 rounded-2xl w-full h-full relative"
            style={{ transitionDelay: "120ms" }}
          >
            <div className="glow pointer-events-none z-0"></div>

            <div className="relative z-10 flex flex-col h-full gap-5">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white">Tech Stack</h3>
              </div>

              {/* Orbital network */}
              <div className="relative flex items-center justify-center" style={{ height: 220 }}>
                {/* Center node */}
                <div
                  className="absolute w-14 h-14 rounded-full flex items-center justify-center z-10 text-xs font-bold text-white"
                  style={{ background: "linear-gradient(135deg,#7c3aed,#06b6d4)", boxShadow: "0 0 24px rgba(124,58,237,0.5)" }}
                >
                  &lt;/&gt;
                </div>
                {/* Orbit ring */}
                <div
                  className="absolute rounded-full border"
                  style={{ width: 190, height: 190, borderColor: "rgba(139,92,246,0.12)" }}
                />
                {/* Tech nodes */}
                {techStack.map((tech) => {
                  const rad = (tech.angle * Math.PI) / 180
                  const r = 95
                  const x = Math.cos(rad) * r
                  const y = Math.sin(rad) * r
                  return (
                    <div
                      key={tech.name}
                      className="absolute flex flex-col items-center gap-0.5 group cursor-default"
                      style={{ transform: `translate(${x}px, ${y}px)` }}
                    >
                      {/* Connection line */}
                      <svg
                        className="absolute pointer-events-none"
                        style={{
                          width: Math.abs(x) * 2 + 2,
                          height: Math.abs(y) * 2 + 2,
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%,-50%)",
                          opacity: 0.12,
                        }}
                      />
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-transform duration-200 group-hover:scale-125"
                        style={{
                          background: `${tech.color}1a`,
                          border: `1.5px solid ${tech.color}55`,
                          color: tech.color,
                          boxShadow: `0 0 10px ${tech.color}22`,
                          fontSize: "9px",
                        }}
                      >
                        {tech.name.slice(0, 2)}
                      </div>
                      <span
                        className="text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
                        style={{ color: tech.color }}
                      >
                        {tech.name}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed text-sm text-center">
                I build complete, end-to-end web solutions using React, Laravel, and Node.js to deliver powerful and
                modern applications.
              </p>

              {/* Badge row */}
              <div className="flex flex-wrap gap-1.5 justify-center mt-auto">
                {techStack.map((t) => (
                  <span
                    key={t.name}
                    className="px-2 py-0.5 rounded-full text-[11px] font-medium backdrop-blur-sm"
                    style={{
                      background: `${t.color}15`,
                      border: `1px solid ${t.color}40`,
                      color: t.color,
                    }}
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Card 3: Global Opportunities ── */}
          <div
            ref={(el) => { sectionsRef.current[2] = el }}
            onMouseMove={handleCardMouseMove}
            className="card card-border abt-card opacity-0 translate-y-16 flex flex-col gap-5 p-7 rounded-2xl w-full h-full relative"
            style={{ transitionDelay: "240ms" }}
          >
            <div className="glow pointer-events-none z-0"></div>

            <div className="relative z-10 flex flex-col h-full gap-5">
              {/* Globe visual */}
              <div className="flex justify-center">
                <div className="relative w-28 h-28">
                  {/* Outer ring */}
                  <div
                    className="absolute inset-0 rounded-full animate-spin"
                    style={{
                      border: "1.5px dashed rgba(6,182,212,0.3)",
                      animationDuration: "18s",
                    }}
                  />
                  {/* Middle ring */}
                  <div
                    className="absolute inset-3 rounded-full animate-spin"
                    style={{
                      border: "1.5px dashed rgba(139,92,246,0.25)",
                      animationDuration: "12s",
                      animationDirection: "reverse",
                    }}
                  />
                  {/* Globe core */}
                  <div
                    className="absolute inset-6 rounded-full flex items-center justify-center text-2xl"
                    style={{
                      background: "radial-gradient(circle at 35% 35%, #1e3a5f, #0b0f19)",
                      border: "1.5px solid rgba(6,182,212,0.35)",
                      boxShadow: "0 0 20px rgba(6,182,212,0.12)",
                    }}
                  >
                    🌍
                  </div>
                  {/* Orbit dots */}
                  {[0, 120, 240].map((deg, i) => {
                    const r = (deg * Math.PI) / 180
                    return (
                      <div
                        key={i}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                          background: i === 0 ? "#06b6d4" : i === 1 ? "#8b5cf6" : "#10b981",
                          top: "50%",
                          left: "50%",
                          transform: `translate(-50%,-50%) translate(${Math.cos(r) * 44}px, ${Math.sin(r) * 44}px)`,
                          boxShadow: `0 0 6px ${i === 0 ? "#06b6d4" : i === 1 ? "#8b5cf6" : "#10b981"}`,
                        }}
                      />
                    )
                  })}
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold text-white">Open to Global Opportunities</h3>
              </div>

              <p className="text-gray-400 leading-relaxed text-sm flex-1">
                I&apos;m trilingual (English, French, Arabic) and comfortable collaborating across borders. I&apos;m open
                to on-site roles in Morocco, remote positions from Tangier, and opportunities with EU teams. I work with
                Node.js, Express, and Mongoose for backend API development and I&apos;m currently expanding into{" "}
                <span className="text-white font-medium">TypeScript and Next.js</span>.
              </p>

              {/* Location button */}
              <button
                onClick={handleLocation}
                className="mt-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 group backdrop-blur-sm cursor-pointer z-10"
                style={{
                  background: "rgba(6,182,212,0.08)",
                  border: "1px solid rgba(6,182,212,0.3)",
                  color: "#06b6d4",
                }}
              >
                <span
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${locationPulsing ? "animate-ping" : "animate-pulse"}`}
                  style={{ background: "#22c55e", boxShadow: "0 0 8px #22c55e" }}
                />
                <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                Check my location — Tangier, Morocco
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .abt-heading {
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .abt-title-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .abt-card {
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), border-color 1s ease-in-out;
        }
        .abt-card-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .abt-card:hover {
          transform: translateY(-4px);
          transition: transform 0.3s ease, opacity 0.8s ease, border-color 1s ease-in-out;
        }
      `}</style>
    </section>
  )
}