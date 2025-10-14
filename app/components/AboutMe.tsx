"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import SplitText from "./SplitText"
import { useEffect, useRef } from "react"

function handleAnimationComplete() {
  // Animation complete logic (optional)
}

export default function Me() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1, rootMargin: "-50px" },
    )

    const elements = containerRef.current?.querySelectorAll(".animate-on-scroll")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <main className="min-h-screen text-white overflow-hidden" id="home">
      <div className="container mx-auto px-6 py-16" ref={containerRef}>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Content Section */}
          <div className="flex-1 max-w-2xl lg:max-w-3xl space-y-6">
            {/* Greeting */}
            <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out delay-100">
              <p className="text-cyan-400 text-lg lg:text-xl mb-2 font-light tracking-wide">Hello! This is</p>
            </div>

            {/* Name */}
            <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out delay-200">
              <div className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 whitespace-nowrap">
                <span className="mr-4">Benjelloul</span>
                <SplitText
                  text="Karim"
                  className="inline-block"
                  delay={80}
                  duration={1.2}
                  ease="cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                  splitType="chars"
                  from={{ opacity: 0, y: 30, rotateX: -45 }}
                  to={{ opacity: 1, y: 0, rotateX: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="left"
                  onLetterAnimationComplete={handleAnimationComplete}
                />
              </div>
            </div>

            {/* Title */}
            <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out delay-400">
              <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-8 font-light text-balance leading-relaxed max-w-2xl">
                Développeur Full-Stack & Ingénieur en Logiciels passionné par linnovation technologique.
              </h2>
            </div>

            {/* Buttons */}
            <div
              ref={buttonsRef}
              className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out delay-500"
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <Button
                  size="lg"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200"><a href="#projects">See My Projects</a></span>
                </Button>
<a href="/My CV.pdf" target="_blank" rel="noopener noreferrer" download>
  <Button
    variant="outline"
    size="lg"
    className="border-2 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-500 px-8 py-4 text-lg font-medium bg-transparent rounded-lg transition-all duration-300 hover:scale-105 group"
  >
    <span className="group-hover:translate-x-1 transition-transform duration-200">
      Get My Resume
    </span>
  </Button>
</a>

              </div>
            </div>
          </div>

          {/* Image Section */}
          <div
            ref={imageRef}
            className="flex-shrink-0 animate-on-scroll opacity-0 translate-x-8 transition-all duration-1000 ease-out delay-600 lg:mr-8"
          >
            {/* Personal Image */}
            <div className="relative group">
              <div className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 transition-all duration-500 group-hover:border-cyan-500/50 group-hover:shadow-2xl group-hover:shadow-cyan-500/20">
                <Image
                  src="/photo1.jpg"
                  alt="Benjelloul Karim - Portrait professionnel"
                  width={384}
                  height={384}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-on-scroll.animate-in {
          opacity: 1 !important;
          transform: translateY(0) translateX(0) !important;
        }
      `}</style>
    </main>
  )
}
