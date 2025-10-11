"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  ease?: string
  splitType?: "chars" | "words"
  from?: {
    opacity?: number
    y?: number
    rotateX?: number
  }
  to?: {
    opacity?: number
    y?: number
    rotateX?: number
  }
  threshold?: number
  rootMargin?: string
  textAlign?: "left" | "center" | "right"
  onLetterAnimationComplete?: () => void
}

export default function SplitText({
  text,
  className,
  delay = 50,
  duration = 1,
  ease = "ease-out",
  splitType = "chars",
  from = { opacity: 0, y: 20, rotateX: 0 },
  to = { opacity: 1, y: 0, rotateX: 0 },
  threshold = 0.1,
  rootMargin = "0px",
  textAlign = "left",
  onLetterAnimationComplete,
}: SplitTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  const splitText = splitType === "chars" ? text.split("") : text.split(" ")

  useEffect(() => {
    if (isVisible && onLetterAnimationComplete) {
      const timer = setTimeout(
        () => {
          onLetterAnimationComplete()
        },
        delay * splitText.length + duration * 1000,
      )

      return () => clearTimeout(timer)
    }
  }, [isVisible, delay, splitText.length, duration, onLetterAnimationComplete])

  return (
    <span ref={containerRef} className={cn("inline-flex", className)} style={{ textAlign }}>
      {splitText.map((char, index) => (
        <span
          key={index}
          className="inline-block"
          style={{
            opacity: isVisible ? to.opacity : from.opacity,
            transform: isVisible
              ? `translateY(${to.y}px) rotateX(${to.rotateX}deg)`
              : `translateY(${from.y}px) rotateX(${from.rotateX}deg)`,
            transition: `all ${duration}s ${ease}`,
            transitionDelay: `${index * delay}ms`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  )
}
