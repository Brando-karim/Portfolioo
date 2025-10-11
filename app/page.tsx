"use client";
import Me from "./components/AboutMe";
import Life from "./components/AboutMylife";
import Plasma from "./components/background";
import ElectricBorder from "./components/Card";
import CardT from "./components/CardT";
import CertAct from "./components/certificates";
import Education from "./components/education";
import WorkExperienceCard from "./components/experience";
import Footer from "./components/Footer";
import Navbar from "./components/navbar";
import Projects from "./components/projects/Projects";
import Myskills from "./components/Skills";
import Offers from "./components/WhatOffers";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Plasma background covers full screen */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <Plasma
          color="#6a329f"
          speed={0.6}
          direction="forward"
          scale={1.1}
          opacity={0.8}
          mouseInteractive={true}
        />
      </div>

      {/* Navbar always on top */}
      <nav className="relative z-50">
        <Navbar />
      </nav>

      <main className="relative z-10">
        <Me />
        <Life />
        <Offers />
        <Myskills />
        <Education />
        <WorkExperienceCard />
        <CertAct />
        <Projects/>
        <CardT />
        
      </main>
    </div>
  );
}
