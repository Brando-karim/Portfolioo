"use client"

import type React from "react"
import { Calendar, MapPin, Building2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface WorkExperience {
  role: string
  company: string
  location: string
  period: string
  logo?: string
  achievements: string[]
}

const workExperiences: WorkExperience[] = [
  {
    role: "Full Stack Developer",
    company: "ENT.com",
    location: "Tangier, Morocco",
    period: " April 2025 - May 2025",
    logo: "/ent-logo.png", // ✅ Put your uploaded logo in the /public folder
    achievements: [
      "Completed a one-month internship project: Developed a school management and communication website",
      "Built responsive and interactive pages using Laravel, React, JavaScript, and CSS",
      "Integrated MySQL database for efficient data management and retrieval",
      "Worked efficiently using PhpStorm for development and debugging",
      "Optimized application performance, ensuring cross-browser compatibility",
      "Project delivered successfully within the given timeframe",
    ],
  },
]

const WorkExperienceCard: React.FC = () => {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    // Observe all elements with data-animate attribute
    const elementsToObserve = document.querySelectorAll("[data-animate]")
    elementsToObserve.forEach((el) => {
      if (observerRef.current) {
        observerRef.current.observe(el)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return (
    <section id="work-experience" className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div
          id="header"
          data-animate
          className={`text-center mb-16 transition-all duration-1000 ${
            visibleElements.has("header") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-light mb-4 bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mx-auto animate-pulse"></div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500 via-purple-500 to-violet-500 shadow-lg shadow-violet-500/20"></div>

          {/* Experience Items */}
          <div className="space-y-16">
            {workExperiences.map((experience, index) => (
              <div
                key={index}
                id={`experience-${index}`}
                data-animate
                className={`relative flex items-start group transition-all duration-1000 ${
                  visibleElements.has(`experience-${index}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{
                  transitionDelay: visibleElements.has(`experience-${index}`) ? `${index * 200}ms` : "0ms",
                }}
              >
                <div className="absolute left-6 top-8 w-4 h-4 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full border-4 border-slate-900 z-10 group-hover:scale-150 transition-all duration-500 shadow-lg shadow-violet-500/50 animate-pulse"></div>

                <div className="ml-20 w-full group-hover:translate-x-2 transition-transform duration-300">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      {/* ✅ Logo if exists */}
                      {experience.logo && (
                        <img
                          src={experience.logo || "/placeholder.svg"}
                          alt={`${experience.company} logo`}
                          className="w-16 h-16 rounded-full shadow-lg border-2 border-slate-700 object-cover"
                        />
                      )}

                      <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-violet-300 transition-colors duration-300">
                        {experience.role}
                      </h3>
                    </div>

                    {/* Date Range */}
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-5 h-5 text-violet-400 group-hover:rotate-12 transition-transform duration-300" />
                      <span className="text-violet-400 font-semibold text-lg">{experience.period}</span>
                    </div>

                    {/* Company and Location */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-gray-300 mb-6">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-gray-400 group-hover:scale-110 transition-transform duration-300" />
                        <span className="font-semibold text-lg">{experience.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-gray-400 group-hover:bounce transition-transform duration-300" />
                        <span className="italic text-gray-400">{experience.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pl-4 border-l-2 border-violet-500/20 group-hover:border-violet-500/40 transition-colors duration-300">
                    {experience.achievements.map((achievement, achievementIndex) => (
                      <div
                        key={achievementIndex}
                        id={`achievement-${index}-${achievementIndex}`}
                        data-animate
                        className={`flex items-start gap-4 group-hover:translate-x-1 transition-all duration-1000 ${
                          visibleElements.has(`achievement-${index}-${achievementIndex}`)
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-6"
                        }`}
                        style={{
                          transitionDelay: visibleElements.has(`achievement-${index}-${achievementIndex}`)
                            ? `${index * 200 + achievementIndex * 150}ms`
                            : "0ms",
                        }}
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full mt-3 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                        <p className="text-gray-300 leading-relaxed text-base group-hover:text-gray-200 transition-colors duration-300">
                          {achievement}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WorkExperienceCard
