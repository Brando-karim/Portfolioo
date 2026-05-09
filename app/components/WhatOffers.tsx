"use client"

// CREDIT
// Component inspired by @BalintFerenczy on X
// https://codepen.io/BalintFerenczy/pen/KwdoyEN

import { FaLightbulb, FaRocket, FaSyncAlt, FaBook, FaPalette, FaSearch } from "react-icons/fa"
import ElectricBorder from "./Card"
import { motion } from "framer-motion"

export default function Home() {
  const offers = [
    {
      title: "PROBLEM-SOLVING MINDSET",
      description:
        "I don’t just write code — I analyze challenges and find the most efficient solutions. Whether it’s debugging complex issues or designing scalable systems, I focus on creating results that truly solve problems.",
      link: "Learn More",
      icon: <FaLightbulb className="text-blue-400 w-8 h-8 mb-4" />,
    },
    {
      title: "SPEED & EFFICIENCY",
      description:
        "I value both speed and quality. My workflow is optimized to deliver projects quickly while keeping the code clean and maintainable, ensuring faster turnaround without compromising performance.",
      link: "See How",
      icon: <FaRocket className="text-blue-400 w-8 h-8 mb-4" />,
    },
    {
      title: "ADAPTABILITY",
      description:
        "Technology evolves fast, and I evolve with it. I can quickly learn new tools, frameworks, or processes, making me flexible in any environment — from startups to large-scale projects.",
      link: "Explore More",
      icon: <FaSyncAlt className="text-blue-400 w-8 h-8 mb-4" />,
    },
    {
      title: "CONTINUOUS LEARNING",
      description:
        "I sharpen my skills by actively exploring new technologies, learning best practices, and experimenting with innovative approaches. This ensures I consistently bring fresh and creative ideas. ",
      link: "View My Journey",
      icon: <FaBook className="text-blue-400 w-8 h-8 mb-4" />,
    },
    {
      title: "CREATIVITY",
      description:
        "Beyond functionality, I bring originality to my work. From UI/UX design ideas to innovative problem-solving approaches, I aim to make projects not just work well, but also stand out exceptionally.",
      link: "Discover More",
      icon: <FaPalette className="text-blue-400 w-8 h-8 mb-4" />,
    },
    {
      title: "ATTENTION TO DETAIL",
      description:
        "I believe small details make a big difference. From clean code structure to pixel-perfect designs, I ensure every element contributes to a polished and professional final product consistently. ",
      link: "See My Work",
      icon: <FaSearch className="text-blue-400 w-8 h-8 mb-4" />,
    },
  ]

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
    <motion.div
      className="min-h-screen py-16 px-4"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div className="text-center mb-16" variants={fadeInUp}>
  <h1 className="text-4xl md:text-5xl font-light mb-4 bg-gradient-to-r from-foreground via-primary/80 to-foreground bg-clip-text text-transparent">
    What I Offer
  </h1>
  <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mx-auto animate-pulse mb-6"></div>
  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
    Discover the skills and qualities I bring to every project
  </p>
</motion.div>


        {/* Cards Grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={staggerContainer}>
          {offers.map((offer, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <ElectricBorder
                color="#7df9ff" // no green shadow
                speed={1}
                chaos={0.5}
                thickness={2}
                style={{ borderRadius: 16 }}
              >
                <div className="bg-card/60 backdrop-blur-sm border border-border/50 p-8 rounded-xl hover:scale-105 hover:shadow-lg transform transition-all duration-300 flex flex-col">
                  {offer.icon}
                  <h3 className="text-xl font-bold text-foreground mb-4 tracking-wide">{offer.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{offer.description}</p>
                </div>
              </ElectricBorder>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
