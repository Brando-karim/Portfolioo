import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Stepper, { Step } from './Cardcontact';
import ModelDisplay from './CarModel';
import Footer from './Footer';

const CardT = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

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
    <motion.div 
      className="min-h-screen p-4" 
      id='contact'
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      {/* Centered H1 */}
      <motion.div className="text-center mb-12" variants={fadeInUp}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 bg-gradient-to-r from-foreground via-primary/80 to-foreground bg-clip-text text-transparent">
          Let&apos;s Work Together
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mx-auto animate-pulse mb-6"></div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          I&apos;m open to junior full-stack and frontend developer roles — on-site in Morocco, remote from Tangier, or with teams in the EU.
        </p>
      </motion.div>

      <motion.div 
        className='flex flex-col md:flex-row justify-center items-center gap-4'
        variants={staggerContainer}
      >
        {/* Left Column: Stepper */}
        <motion.div 
          className='w-full md:w-1/3 flex flex-col justify-center'
          variants={fadeInUp}
        >
          <Stepper
            initialStep={1}
            onStepChange={(step) => console.log('Current Step:', step)}
            onFinalStepCompleted={() => console.log('All steps completed!')}
            backButtonText="Previous"
            nextButtonText="Next"
          >
            <Step>
              <h2 className="text-2xl text-foreground font-bold mb-4">Welcome!</h2>
              <p className="mb-4 text-foreground">
                Navigate the form and explore the 3D model in the next step!
              </p>
              <img
                style={{
                  height: '100px',
                  width: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center -70px',
                  borderRadius: '15px',
                  marginTop: '1em'
                }}
                src="./wallP.jpg"
                alt="Welcome"
              />
            </Step>
            <Step>
              <h2 className="text-2xl text-foreground font-bold mb-4">Tell Me About Yourself</h2>
              <div className="flex flex-col gap-4">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="rounded border-b-2 border-border text-foreground px-3 py-2 bg-transparent"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  type="email"
                  className="rounded border-b-2 border-border px-3 py-2 text-foreground bg-transparent"
                />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your Message"
                  rows={4}
                  className="rounded border-b-2 border-border text-foreground px-3 py-2 bg-transparent"
                />
              </div>
            </Step>
            <Step>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Step 3: Play Around!</h2>
              <p className='text-foreground'>Explore this interactive 3D model</p>
            </Step>
            <Step>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Final Step</h2>
              <p className='text-foreground'>You made it!</p>
            </Step>
          </Stepper>
        </motion.div>
        
        {/* Right Column: 3D Model */}
        <motion.div 
          className='w-full md:w-auto flex justify-center items-center'
          variants={fadeInUp}
        >
          <div className="bg-card/60 backdrop-blur-sm border border-border/50 p-6 rounded-xl shadow-lg">
            <Canvas
              frameloop="demand"
              style={{ width: '600px', height: '400px' }}
              camera={{ position: [0, 0, 25], fov: 50 }}
              shadows
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
              <pointLight position={[-5, 5, -5]} intensity={0.3} />
              
              <Suspense fallback={null}>
                <ModelDisplay
                  modelPath="/models/gaming.glb"
                  position={[1, 0, 0]}
                  scale={2}
                />
              </Suspense>
              
              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={10}
                maxDistance={30}
              />
            </Canvas>
          </div>
        </motion.div>
      </motion.div>
      <Footer />
    </motion.div>
  );
};

export default CardT;