"use client"

import { useEffect, useRef } from "react"

export default function HomePage() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([])
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    const titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-title-in")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (titleRef.current) titleObserver.observe(titleRef.current)
    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      observer.disconnect()
      titleObserver.disconnect()
    }
  }, [])

  return (
    // Keep min-h-screen if you want full-height feel, but ensure enough bottom padding.
    <main className="min-h-screen pb-16 sm:pb-20 md:pb-28" id="Life">
      <div className="container mx-auto px-4 pt-4">
        {/* Main heading */}
        <h1
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl font-light text-center mb-16 sm:mb-20 tracking-wide opacity-0 translate-y-12 bg-gradient-to-r from-foreground via-primary/80 to-foreground bg-clip-text text-transparent"
        >
          About Me
          <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mx-auto mt-4 animate-pulse"></div>
        </h1>

        {/* Three column layout */}
        <div className="grid md:grid-cols-3 gap-10 sm:gap-12 max-w-6xl mx-auto">
          {/* Past Section */}
          <div
            ref={(el) => {
              sectionsRef.current[0] = el
            }}
            className="section-card text-center space-y-6 opacity-0 translate-y-16 transition-all duration-1000 ease-out"
          >
            <h2 className="text-3xl font-light text-primary mb-6 sm:mb-8">Past</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              My first passion began with video games when I was just 9 years old, especially with pixel games that
              sparked my curiosity for technology. At 16, I became interested in web development and started exploring
              how websites are built, which opened the door to my journey as a developer.
            </p>
          </div>

          {/* Present Section */}
          <div
            ref={(el) => {
              sectionsRef.current[1] = el
            }}
            className="section-card text-center space-y-6 opacity-0 translate-y-16 transition-all duration-1000 ease-out delay-200"
          >
            <h2 className="text-3xl font-light text-primary mb-6 sm:mb-8">Present</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Currently, I am a Full-Stack Developer with a diploma in software development. I've gained valuable
              experience working alongside my teacher, who has collaborated with many well-known companies, and I've
              also participated in enriching activities with people that helped me grow both technically and personally.
            </p>
          </div>

          {/* Future Section */}
          <div
            ref={(el) => {
              sectionsRef.current[2] = el
            }}
            className="section-card text-center space-y-6 opacity-0 translate-y-16 transition-all duration-1000 ease-out delay-500"
          >
            <h2 className="text-3xl font-light text-primary mb-6 sm:mb-8">Future</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Looking ahead, I'm excited about the future of programming and the endless opportunities it presents. I'm
              confident that my passion for the field, coupled with my skills, will enable me to make meaningful
              contributions to the industry in the years to come.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Enhanced fade-in-up animations with better easing */
        .animate-title-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-fade-in-up {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        /* Added smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Make hover effect opt-in (was targeting all .text-center globally) */
        .section-card:hover {
          transform: translateY(-4px);
          transition: transform 0.3s ease;
        }
      `}</style>
    </main>
  )
}