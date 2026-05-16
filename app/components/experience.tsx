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
  stack?: string[]
}

const workExperiences: WorkExperience[] = [
  {
    role: "Freelance Full-Stack Developer",
    company: "Elyassini Exchange App",
    location: "Tangier, Morocco",
    period: "December 2025 – January 2026",
    logo: "/elyassini.png",
    achievements: [
      "Designed and developed a web-based exchange management application for currency and transaction operations.",
      "Handled full-stack development including backend implementation and a mobile frontend built with React Native Expo.",
      "Built a responsive and intuitive mobile user interface for a smooth user experience.",
      "Managed data architecture and integrated the database system efficiently.",
      "Implemented core features including operations management, user management, and transaction tracking.",
      "Optimized application performance and fixed bugs to improve stability and usability.",
      "Communicated directly with the client to gather requirements and deliver the requested features.",
    ],
    stack: ["React Native", "Expo", "Laravel", "PHP", "MySQL", "REST APIs", "Git"],
  },
  {
    role: "Full-Stack Developer Intern",
    company: "ENT.com — School Management Platform",
    location: "Tangier, Morocco",
    period: "April 2025 – May 2025",
    logo: "/ent-logo.png",
    achievements: [
      "Developed a school management and communication platform for staff and students.",
      "Built responsive frontend interfaces with React and CSS, ensuring cross-browser compatibility.",
      "Implemented backend logic in Laravel with MySQL for records, scheduling, and announcements.",
      "Worked efficiently using PhpStorm for development and debugging.",
      "Optimized application performance and ensured cross-browser compatibility.",
      "Delivered successfully within a 4-week sprint.",
    ],
    stack: ["Laravel", "React", "JavaScript", "CSS", "MySQL", "Git"],
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
          className={`text-center mb-16 transition-all duration-1000 ${visibleElements.has("header") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <h2 className="text-4xl md:text-5xl font-light mb-4 bg-gradient-to-r from-foreground via-primary/80 to-foreground bg-clip-text text-transparent">
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
                className={`relative flex items-start group transition-all duration-1000 ${visibleElements.has(`experience-${index}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
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

                      <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {experience.role}
                      </h3>
                    </div>

                    {/* Date Range */}
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-5 h-5 text-violet-400 group-hover:rotate-12 transition-transform duration-300" />
                      <span className="text-violet-400 font-semibold text-lg">{experience.period}</span>
                    </div>

                    {/* Company and Location */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-muted-foreground mb-6">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-gray-400 group-hover:scale-110 transition-transform duration-300" />
                        <span className="font-semibold text-lg">{experience.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-gray-400 group-hover:bounce transition-transform duration-300" />
                        <span className="italic text-muted-foreground">{experience.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pl-4 border-l-2 border-violet-500/20 group-hover:border-violet-500/40 transition-colors duration-300">
                    {experience.achievements.map((achievement, achievementIndex) => (
                      <div
                        key={achievementIndex}
                        id={`achievement-${index}-${achievementIndex}`}
                        data-animate
                        className={`flex items-start gap-4 group-hover:translate-x-1 transition-all duration-1000 ${visibleElements.has(`achievement-${index}-${achievementIndex}`)
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
                        <p className="text-muted-foreground leading-relaxed text-base group-hover:text-foreground transition-colors duration-300">
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
