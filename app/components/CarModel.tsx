import React, { useRef, useEffect, useState } from "react";
import { useGLTF, Html } from "@react-three/drei";
import * as THREE from "three";

interface ModelDisplayProps {
  modelPath: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
}

const ModelDisplay: React.FC<ModelDisplayProps> = ({
  modelPath,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}) => {
  const group = useRef<THREE.Group | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const gltf = useGLTF(modelPath) as any;
  const { scene } = gltf;

  // Simulate progressive loading - only when model is in view
  useEffect(() => {
    if (isLoaded) return; // Don't run if already loaded
    
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isLoaded]);

  // Fix materials and colors
  useEffect(() => {
    if (scene) {
      scene.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          if (child.material) {
            if (child.material.map) {
              child.material.map.colorSpace = THREE.SRGBColorSpace;
            }
            child.material.needsUpdate = true;
          }
        }
      });
      
      setLoadingProgress(100);
    }
  }, [scene]);

  useEffect(() => {
    if (loadingProgress >= 100) {
      const timeout = setTimeout(() => setIsLoaded(true), 300);
      return () => clearTimeout(timeout);
    }
  }, [loadingProgress]);

  return (
    <>
      {/* Loading Animation */}
      {!isLoaded && (
        <Html center>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div className="loader" />
            <span style={{ 
              color: 'white', 
              fontSize: '24px', 
              fontWeight: 'bold',
              textShadow: '0 2px 10px rgba(139, 92, 246, 0.5)'
            }}>
              {Math.round(loadingProgress)}%
            </span>
          </div>
          <style>{`
            .loader {
              width: 60px;
              aspect-ratio: 1;
              --c: no-repeat linear-gradient(#046D8B 0 0);
              background: var(--c), var(--c), var(--c), var(--c);
              animation: 
                l9-1 1.5s infinite,
                l9-2 1.5s infinite;
            }
            @keyframes l9-1 {
              0%   { background-size: 0 4px, 4px 0; }
              25%  { background-size: 40px 4px, 4px 0; }
              45%,
              55%  { background-size: 40px 4px, 4px 42px; }
              75%  { background-size: 0 4px, 4px 42px; }
              100% { background-size: 0 4px, 4px 0; }
            }
            @keyframes l9-2 {
              0%, 49.9% { 
                background-position: 0 38px, 18px 18px, 100% 18px, right 18px bottom 18px; 
              }
              50%, 100% { 
                background-position: right 20px bottom 18px, 18px 100%, 20px 18px, right 18px top 0; 
              }
            }
          `}</style>
        </Html>
      )}

      {/* Model with fade-in */}
      <group 
        ref={group} 
        position={position} 
        rotation={rotation} 
        scale={scale}
        visible={isLoaded}
      >
        <primitive object={scene} />
      </group>
    </>
  );
};

export default ModelDisplay;