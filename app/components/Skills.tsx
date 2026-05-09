"use client"

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiPython,
  SiPhp,
  SiWordpress,
  SiNodedotjs,
  SiExpress,
  SiFigma,
  SiGit,
  SiPostman,
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiDocker,
} from "react-icons/si"
import LogoLoop from "./SkillsPro"
import { motion, Variants } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiLaravel />, title: "Laravel", href: "https://laravel.com" },
  { node: <SiMysql />, title: "MySQL", href: "https://www.mysql.com" },
  { node: <SiMongodb />, title: "MongoDB", href: "https://www.mongodb.com" },
  { node: <SiJavascript />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { node: <SiHtml5 />, title: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { node: <SiCss3 />, title: "CSS3", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { node: <SiPython />, title: "Python", href: "https://www.python.org" },
  { node: <SiPhp />, title: "PHP", href: "https://www.php.net" },
  { node: <SiAdobephotoshop />, title: "Adobe Photoshop", href: "https://www.adobe.com/products/photoshop.html" },
  { node: <SiAdobeillustrator />, title: "Adobe Illustrator", href: "https://www.adobe.com/products/illustrator.html" },
  { node: <SiWordpress />, title: "WordPress", href: "https://wordpress.org" },
  { node: <SiExpress />, title: "Express.js", href: "https://expressjs.com" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiFigma />, title: "Figma", href: "https://figma.com" },
  { node: <SiGit />, title: "Git", href: "https://git-scm.com" },
  { node: <SiPostman />, title: "Postman", href: "https://www.postman.com" },
  { node: <SiDocker />, title: "Docker", href: "https://www.docker.com" },
]

const fadeInUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40, // smaller distance → smoother
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5, // faster, less laggy
      ease: "easeOut",
    },
  },
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2, // slightly faster staggering
    },
  },
}

export default function Myskills() {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const logoRef = useRef(null)

  const isContainerInView = useInView(containerRef, { once: true, margin: "-100px" })
  const isTitleInView = useInView(titleRef, { once: true, margin: "-50px" })
  const isLogoInView = useInView(logoRef, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={containerRef}
      className="container mx-auto px-4 py-4"
      variants={containerVariants}
      initial="hidden"
      animate={isContainerInView ? "visible" : "hidden"}
    >
<motion.h1
  ref={titleRef}
  className="text-4xl md:text-5xl font-light text-center mb-12 bg-gradient-to-r from-foreground via-primary/80 to-foreground bg-clip-text text-transparent will-change-transform will-change-opacity"
  variants={fadeInUpVariants}
  initial="hidden"
  animate={isTitleInView ? "visible" : "hidden"}
>
  My Key Skills
  <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mx-auto mt-4 animate-pulse"></div>
</motion.h1>


      <motion.div
        ref={logoRef}
        className="text-foreground will-change-transform will-change-opacity"
        variants={fadeInUpVariants}
        initial="hidden"
        animate={isLogoInView ? "visible" : "hidden"}
      >
        <LogoLoop
          logos={techLogos}
          speed={70}
          direction="left"
          logoHeight={60}
          gap={120}
          pauseOnHover
          scaleOnHover
          fadeOut={false}
          ariaLabel="Technology partners"
        />
      </motion.div>
    </motion.div>
  )
}
