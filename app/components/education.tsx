"use client"

import type React from "react"
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react"
import { motion } from "framer-motion"

interface Education {
  degree: string
  institution: string
  location: string
  period: string
  description: string
  gpa?: string
}

const educationData: Education[] = [
  {
    degree: "DTS Développement Digital",
    institution: "ISMONTIC-OFPPT",
    location: "Tangier, Morocco",
    period: "2023 - 2025",
    description:
      "Comprehensive program in software development, web applications, modern frameworks, and digital technologies.",
  },
  {
    degree: "Biology, Chemistry, Geology (BCG)",
    institution: "FST Tangier, Abdlemalek Essaadi University",
    location: "Tangier, Morocco",
    period: "2022 - 2023",
    description:
      "First year foundation courses in biology, chemistry, geology, mathematics, and scientific fundamentals.",
  },
  {
    degree: "Baccalaureate - Science (SVT)",
    institution: "Lycee Al Jammi",
    location: "Tangier",
    period: "2022",
    description: "High school diploma",
  },
]

const Education: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <motion.section
      id="education"
      className="py-16 px-4"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-light  mb-4 bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent">
            Education
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mx-auto animate-pulse"></div>
        </motion.div>

        {/* Timeline */}
        <motion.div className="relative" variants={fadeInUp}>
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500 via-purple-500 to-violet-500 shadow-lg shadow-violet-500/20"></div>

          {/* Education Items */}
          <motion.div className="space-y-16" variants={staggerContainer}>
            {educationData.map((education, index) => (
              <motion.div
                key={index}
                className="relative flex items-start group animate-slide-in-right"
                variants={fadeInUp}
              >
                <div className="absolute left-6 top-8 w-4 h-4 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full border-4 border-slate-800 z-10 group-hover:scale-150 transition-all duration-500 shadow-lg shadow-violet-500/50 animate-pulse"></div>

                <div className="ml-20 w-full group-hover:translate-x-2 transition-transform duration-300">
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors duration-300">
                      {education.degree}
                    </h3>

                    {/* Date and GPA Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-violet-400 group-hover:rotate-12 transition-transform duration-300" />
                        <span className="text-violet-400 font-semibold">{education.period}</span>
                      </div>
                      {education.gpa && (
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-400 font-semibold">{education.gpa}</span>
                        </div>
                      )}
                    </div>

                    {/* Institution and Location */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-gray-300 mb-4">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-gray-400 group-hover:scale-110 transition-transform duration-300" />
                        <span className="font-semibold">{education.institution}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-gray-400 group-hover:bounce transition-transform duration-300" />
                        <span className="italic text-gray-400">{education.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pl-4 border-l-2 border-violet-500/20 group-hover:border-violet-500/40 transition-colors duration-300">
                    <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      {education.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Education
