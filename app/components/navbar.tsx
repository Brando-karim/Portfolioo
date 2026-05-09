"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export default function ProjectsShowcase() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(theme)
  }, [theme])

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"))

  const navItems = [
    { key: "home", label: "Home", link: "#home" },
    { key: "about", label: "About", link: "#Life" },
    { key: "portfolio", label: "Portfolio", link: "#education" },
    { key: "contact", label: "Contact", link: "#contact" },
  ]

  const linkColorClass = theme === "light" ? "text-gray-300" : "text-gray-300"

  return (
    <nav className=" top-0 w-full z-50 py-2 px-4 flex items-center justify-between bg-transparent relative">
      {/* Logo */}
      <div className="flex-shrink-0 mr-6">
        <a
          href="#"
          className="text-2xl font-bold font-mono text-violet-600 hover:text-violet-400 transition-all duration-300 transform hover:scale-105 animate-pulse hover:animate-none relative group"
        >
          <span className="relative z-10">Karim Benjelloul</span>
        </a>
      </div>

      {/* Centered links (desktop only) */}
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-x-10">
        {navItems.map((item, index) => (
          <a
            key={item.key}
            onClick={(e) => {
              e.preventDefault()
              const section = document.querySelector(item.link)
              section?.scrollIntoView({ behavior: "smooth" })
            }}
            className={`text-lg font-medium hover:text-violet-400 transition-all duration-300 p-2 relative group transform hover:scale-110 ${linkColorClass}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="relative z-10 animate-fadeInUp">{item.label}</span>
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-purple-400 group-hover:w-full transition-all duration-300 ease-out"></div>
          </a>
        ))}
      </div>

      {/* Theme toggle */}
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleTheme}
          className={`relative inline-flex h-7 w-14 items-center rounded-full transition-all duration-300 transform hover:scale-105 ${
            theme === "dark" ? "bg-black" : "bg-gray-300"
          }`}
          aria-label="Toggle dark/light mode"
        >
          <span
            className={`inline-flex h-6 w-6 items-center justify-center rounded-full bg-white shadow transform transition-all duration-300 ${
              theme === "dark" ? "translate-x-7" : "translate-x-0"
            }`}
          >
            {theme === "light" ? <Sun className="h-4 w-4 text-black" /> : <Moon className="h-4 w-4 text-black" />}
          </span>
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </nav>
  )
}