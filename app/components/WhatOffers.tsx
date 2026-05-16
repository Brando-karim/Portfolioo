"use client"

// CREDIT
// Component inspired by @BalintFerenczy on X
// https://codepen.io/BalintFerenczy/pen/KwdoyEN

import { FaLightbulb, FaRocket, FaSyncAlt, FaBook, FaPalette, FaSearch } from "react-icons/fa"
import { motion } from "framer-motion"

export default function Home() {
  const offers = [
    {
      title: "FRONTEND DEVELOPMENT",
      description:
        "Responsive UIs built with React, JavaScript, and CSS. I prioritize accessible, pixel-perfect interfaces that work seamlessly across devices and browsers.",
      icon: <FaLightbulb className="text-blue-400 w-8 h-8 mb-4" />,
    },
    {
      title: "BACKEND & APIs",
      description:
        "RESTful API design and database architecture with Laravel and MySQL. I build clean, maintainable server-side logic that powers reliable web applications.",
      icon: <FaRocket className="text-blue-400 w-8 h-8 mb-4" />,
    },
    {
      title: "MOBILE DEVELOPMENT",
      description:
        "Cross-platform mobile apps with React Native and Expo. From UI to API integration, I deliver smooth native experiences for both iOS and Android.",
      icon: <FaSyncAlt className="text-blue-400 w-8 h-8 mb-4" />,
    },
    {
      title: "AI INTEGRATION",
      description:
        "LLM-powered features and intelligent chatbots — such as the Deepseek R1-based assistant in Console Verse — that enhance user experience and automate workflows.",
      icon: <FaBook className="text-blue-400 w-8 h-8 mb-4" />,
    },
    {
      title: "DATABASE DESIGN",
      description:
        "Relational schema design, query optimization, and data modeling with PostgreSQL and MySQL. I structure data for performance, clarity, and long-term scalability.",
      icon: <FaPalette className="text-blue-400 w-8 h-8 mb-4" />,
    },
    {
      title: "VERSION CONTROL & COLLABORATION",
      description:
        "Git, GitHub, and Jira for structured workflows. I communicate directly with clients to gather requirements and deliver iteratively, on time and on spec.",
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
    angle = (angle + 360) % 360;
    card.style.setProperty("--start", `${angle + 60}`);
  };

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
            <motion.div key={index} variants={fadeInUp} className="h-full">
              <div 
                className="card bg-card/60 border border-border/50 p-8 rounded-xl hover:-translate-y-2 transform transition-transform duration-300 flex flex-col h-full"
                onMouseMove={handleMouseMove}
              >
                <div className="glow"></div>
                <div className="card-content relative z-10">
                  {offer.icon}
                  <h3 className="text-xl font-bold text-foreground mb-4 tracking-wide">{offer.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{offer.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
