"use client"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Carousel from "./certicards"
import { certificationsData, activitiesData } from "../DataActCer"

export default function CertAct() {
  const cardWidth = 400 // consistent width for all cards
  const certRef = useRef<HTMLDivElement>(null)
  const actRef = useRef<HTMLDivElement>(null)
  const [maxHeight, setMaxHeight] = useState<number | undefined>()

  useEffect(() => {
    if (certRef.current && actRef.current) {
      const certHeight = certRef.current.offsetHeight
      const actHeight = actRef.current.offsetHeight
      setMaxHeight(Math.max(certHeight, actHeight))
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="w-full flex flex-col items-center py-10 px-4">
      {/* Title */}
<motion.h1
  className="text-3xl sm:text-4xl md:text-5xl font-light text-center mb-10 bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent"
  initial={{ opacity: 0, y: -20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  Certifications & Activités
  <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mx-auto mt-4 animate-pulse"></div>
</motion.h1>


      {/* Cards */}
      <motion.div
        className="flex flex-col lg:flex-row justify-center gap-8 w-full max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Certifications */}
        <motion.div
          className="flex-1 flex justify-center"
          variants={itemVariants}
        >
          <div
            ref={certRef}
            className="w-full"
            style={{
              maxWidth: `${cardWidth}px`,
              minWidth: `${cardWidth}px`,
              height: maxHeight ? `${maxHeight}px` : "auto",
            }}
          >
            <Carousel
              items={certificationsData}
              baseWidth={cardWidth}
              autoplay={false}
              loop={false}
              round={false}
              pauseOnHover={true}
            />
          </div>
        </motion.div>

        {/* Activities */}
        <motion.div
          className="flex-1 flex justify-center"
          variants={itemVariants}
        >
          <div
            ref={actRef}
            className="w-full"
            style={{
              maxWidth: `${cardWidth}px`,
              minWidth: `${cardWidth}px`,
              height: maxHeight ? `${maxHeight}px` : "auto",
            }}
          >
            <Carousel
              items={activitiesData}
              baseWidth={cardWidth}
              autoplay={false}
              loop={false}
              round={false}
              pauseOnHover={true}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
