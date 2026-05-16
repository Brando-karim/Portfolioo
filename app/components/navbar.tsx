"use client"

import { useEffect, useState, useCallback } from "react"
import { Moon, Sun, Menu, X } from "lucide-react"

const navItems = [
  { key: "home",      label: "Home",      href: "#home"      },
  { key: "about",     label: "About",     href: "#Life"      },
  { key: "portfolio", label: "Portfolio", href: "#education" },
  { key: "contact",   label: "Contact",   href: "#contact"   },
]

const sectionIds = ["home", "Life", "education", "contact"]

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [mobileOpen, setMobileOpen] = useState(false)

  /* ── Apply theme class to <html> ── */
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(theme)
  }, [theme])

  /* ── Scroll shadow + active section detection ── */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)

      // find which section is closest to top of viewport
      let current = "home"
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120) current = id
        }
      }
      setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = useCallback((href: string) => {
    const id = href.replace("#", "")
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: "smooth" })
    setMobileOpen(false)
  }, [])

  const toggleTheme = () => setTheme((p) => (p === "light" ? "dark" : "light"))

  /* ── Helper: is this nav item active? ── */
  const isActive = (href: string) => {
    const id = href.replace("#", "")
    return activeSection === id
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? "shadow-md shadow-black/10"
            : ""
        }`}
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          background: "var(--nav-bg)",
          borderBottom: scrolled ? "1px solid var(--nav-border)" : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo("#home") }}
            className="text-xl font-bold font-mono text-violet-500 hover:text-violet-400 transition-colors duration-300 hover:scale-105 transform relative group flex-shrink-0"
            aria-label="Home"
          >
            <span className="relative z-10">Karim Benjelloul</span>
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-violet-400 group-hover:w-full transition-all duration-300" />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(item.href) }}
                  className={`
                    relative px-4 py-2 text-sm font-semibold tracking-wide
                    transition-all duration-200 rounded-md group
                    ${active
                      ? "text-violet-400"
                      : theme === "dark"
                        ? "text-gray-300 hover:text-violet-300"
                        : "text-gray-600 hover:text-violet-600"
                    }
                  `}
                >
                  <span className="relative z-10">{item.label}</span>
                  {/* Underline slide-in */}
                  <span
                    className={`absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r from-violet-500 to-purple-400 transition-all duration-300 ${
                      active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                    } group-hover:opacity-100 group-hover:scale-x-100`}
                  />
                  {/* Active glow dot */}
                  {active && (
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                  )}
                </a>
              )
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${
                theme === "dark" ? "bg-violet-900/60" : "bg-gray-300"
              }`}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <span
                className={`inline-flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transform transition-all duration-300 ${
                  theme === "dark" ? "translate-x-7" : "translate-x-0.5"
                }`}
              >
                {theme === "light"
                  ? <Sun className="h-3.5 w-3.5 text-amber-500" />
                  : <Moon className="h-3.5 w-3.5 text-violet-600" />
                }
              </span>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className={`md:hidden p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${
                theme === "dark"
                  ? "text-gray-300 hover:bg-white/10"
                  : "text-gray-700 hover:bg-black/10"
              }`}
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{
            background: "var(--nav-bg)",
          }}
        >
          <div className="px-4 pb-4 pt-2 flex flex-col gap-1 border-t border-border/30">
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(item.href) }}
                  className={`
                    px-4 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200
                    ${active
                      ? "text-violet-400 bg-violet-500/10 border border-violet-500/25"
                      : theme === "dark"
                        ? "text-gray-300 hover:text-violet-300 hover:bg-white/5"
                        : "text-gray-700 hover:text-violet-600 hover:bg-black/5"
                    }
                  `}
                >
                  {item.label}
                  {active && <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-violet-400 align-middle animate-pulse" />}
                </a>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Spacer so content doesn't hide under fixed nav */}
      <div className="h-[56px]" aria-hidden="true" />
    </>
  )
}