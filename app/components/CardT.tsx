import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Stepper, { Step } from './Cardcontact';
import ModelDisplay from './CarModel'; // Import your new component
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
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent">
          Get In Touch
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mx-auto animate-pulse"></div>
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
              <h2 className="text-2xl text-white font-bold mb-4">Welcome!</h2>
              <p className="mb-4 text-white">
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
              <h2 className="text-2xl text-white font-bold mb-4">Tell Me About Yourself</h2>
              <div className="flex flex-col gap-4">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="rounded border-b-2 text-white px-3 py-2 bg-transparent"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  type="email"
                  className="rounded border-b-2 px-3 py-2 text-white bg-transparent"
                />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your Message"
                  rows={4}
                  className="rounded border-b-2 text-white px-3 py-2 bg-transparent"
                />
              </div>
            </Step>
            <Step>
              <h2 className="text-2xl font-bold mb-4 text-white">Step 3: Play Around!</h2>
              <p className='text-white'>Explore this interactive 3D model</p>
            </Step>
            <Step>
              <h2 className="text-2xl font-bold mb-4 text-white">Final Step</h2>
              <p className='text-white'>You made it!</p>
            </Step>
          </Stepper>
        </motion.div>
        
        {/* Right Column: 3D Model */}
        <motion.div 
          className='w-full md:w-auto flex justify-center items-center'
          variants={fadeInUp}
        >
          <div className="bg-gradient-to-br from-black-800 to-gray-900 p-6 rounded-xl shadow-lg">
            <Canvas
              style={{ width: '600px', height: '400px' }}
              camera={{ position: [0, 0, 5], fov: 50 }}
              shadows
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
              <pointLight position={[-5, 5, -5]} intensity={0.3} />
              
              {/* Change the modelPath to any .glb or .gltf file */}
              <ModelDisplay
                modelPath="/models/bmw.glb"
                position={[0, 0, 0]}
                scale={2}
              />
              
              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={8}
                maxDistance={10}
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