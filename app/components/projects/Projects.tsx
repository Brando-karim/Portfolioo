import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "./projects.css";
import { myProjects } from './Data';
import DemoComputer from "./DemoComputer";
import ComputerWithControls from "./ComputerWithControls";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

interface ProjectTag {
  path: string;
  name: string;
}

interface Project {
  spotlight: string;
  logo: string;
  logoStyle?: React.CSSProperties;
  title: string;
  desc: string;
  subdesc: string;
  tags: ProjectTag[];
  HasUrl?: boolean;
  href?: string;
  linkLabel?: string;
  texture?: string;
}

const projectCount = myProjects.length;

const Projects: React.FC = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(0);
  const [isInView, setIsInView] = useState(false);
  const leftCardRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  
  // Toggle between control mode and production mode
  const [useControls, setUseControls] = useState(false);

  // Intersection Observer to detect when canvas is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const currentCanvas = canvasRef.current;
    if (currentCanvas) {
      observer.observe(currentCanvas);
    }

    return () => {
      if (currentCanvas) {
        observer.unobserve(currentCanvas);
      }
    };
  }, []);

  const handleLeftCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = leftCardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
    angle = (angle + 360) % 360;
    card.style.setProperty("--start", `${angle + 60}`);
  };

  const handleRightCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = canvasRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
    angle = (angle + 360) % 360;
    card.style.setProperty("--start", `${angle + 60}`);
  };

  const handleNavigation = (direction: "previous" | "next") => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === "previous") {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  useGSAP(
    () => {
      gsap.fromTo(
        `.animatedText`,
        { opacity: 0 },
        { opacity: 1, duration: 1, stagger: 0.2, ease: "power2.inOut" }
      );
    },
    [selectedProjectIndex]
  );

  const currentProject = myProjects[selectedProjectIndex] as Project;

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.section 
      id="projects" 
      className="c-space my-10 md:my-30"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <motion.h1 
        className="text-5xl font-light text-center mb-20 tracking-wide bg-gradient-to-r from-foreground via-primary/80 to-foreground bg-clip-text text-transparent"
        variants={fadeInUp}
      >
        What I've Built
        <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mx-auto mt-4 animate-pulse"></div>
      </motion.h1>

      <motion.div 
        className="grid lg:grid-cols-2 grid-cols-1 gap-5 w-full"
        variants={staggerContainer}
      >
        {/* Left Card - Project Details */}
        <motion.div
          ref={leftCardRef}
          onMouseMove={handleLeftCardMouseMove}
          className="card card-border rounded-lg sm:p-7 p-4 flex flex-col gap-5 w-full h-full relative"
          variants={fadeInUp}
        >
          <div className="glow pointer-events-none"></div>
          <div className="absolute top-0 right-0 pointer-events-none z-0">
            <img
              src={currentProject.spotlight}
              alt="spotlight"
              className="w-full h-96 object-cover rounded-xl pointer-events-none"
            />
          </div>

          <div
            className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg"
            style={currentProject.logoStyle}
          >
            <img
              className="w-12 h-11 shadow-sm"
              src={currentProject.logo}
              alt="logo"
            />
          </div>

          <div className="flex flex-col gap-5 text-white-600 my-5">
            <p className="text-white text-2xl font-semibold animatedText">
              {currentProject.title}
            </p>

            <p className="animatedText">{currentProject.desc}</p>
            <p className="animatedText">{currentProject.subdesc}</p>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="flex items-center gap-3">
              {currentProject.tags.map((tag, index) => (
                <div key={index} className="tech-logo">
                  <img src={tag.path} alt={tag.name} />
                </div>
              ))}
            </div>

            {currentProject.HasUrl && (
              <a
                className="flex items-center gap-2 cursor-pointer text-white-600 z-10"
                href={currentProject.href}
                target="_blank"
                rel="noreferrer"
              >
                <p>{currentProject.linkLabel || "Check Live Site"}</p>
                <img
                  src="/assets/arrow-up.png"
                  alt="arrow"
                  className="w-3 h-3"
                />
              </a>
            )}
          </div>

          <div className="flex justify-between items-center mt-7 z-10">
            <button
              className="arrow-btn z-10"
              onClick={() => handleNavigation("previous")}
            >
              <img src="/assets/left-arrow.png" alt="left arrow" />
            </button>

            <button
              className="arrow-btn z-10"
              onClick={() => handleNavigation("next")}
            >
              <img
                src="/assets/right-arrow.png"
                alt="right arrow"
                className="w-4 h-4"
              />
            </button>
          </div>
        </motion.div>

        {/* Right Card - 3D Computer Display */}
        <motion.div 
          ref={canvasRef}
          onMouseMove={handleRightCardMouseMove}
          className="card card-border rounded-lg h-96 md:h-full relative"
          variants={fadeInUp}
        >
          <div className="glow pointer-events-none"></div>
          {useControls ? (
            // CONTROLS MODE - Use this to adjust positions
            <ComputerWithControls texture={currentProject.texture || ''} />
          ) : (
            // PRODUCTION MODE - Final version with set values
            <Canvas frameloop="demand" camera={{ position: [0, 0, 5], fov: 45 }}>
              
              <OrbitControls 
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                minDistance={1}
                maxDistance={6}
                target={[0, 0, 0]}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2}
                maxAzimuthAngle={Math.PI / 2}
                minAzimuthAngle={-Math.PI / 2}
              />
              
              <DemoComputer 
                texture={currentProject.texture || ''} 
                position={[0, 0, -1.10]}
                scale={2.2}
                videoPosition={{ x: -0.150, y: 0.190, z: -0.233 }}
                videoScale={{ x: 1.40, y: 0.87 }}
                isInView={isInView}
              />
            </Canvas>
          )}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Projects;