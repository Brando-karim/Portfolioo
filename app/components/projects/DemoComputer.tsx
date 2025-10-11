import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useVideoTexture } from "@react-three/drei";
import * as THREE from "three";

interface DemoComputerProps {
  texture?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  videoPosition?: { x: number; y: number; z: number };
  videoScale?: { x: number; y: number };
  videoRotation?: { x: number; y: number; z: number };
  onDebugInfo?: (info: string) => void;
  screenMeshName?: string;
}

const DemoComputer: React.FC<DemoComputerProps> = ({
  texture,
  position = [0, 0, -1.10], // Fixed Z position
  rotation = [0, 0, 0],
  scale = 2.2,
  videoPosition = { x: -0.150, y: 0.190, z: -0.230 },
  videoScale = { x: 1.40, y: 0.85 },
  videoRotation = { x: 0, y: 0, z: 0 },
  onDebugInfo,
  screenMeshName,
}) => {
  const group = useRef<THREE.Group | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Load GLTF model
  const gltf = useGLTF("/models/desktop_computer.glb") as any;
  const { nodes = {}, materials = {} } = gltf || {};

  // Load video texture if provided
  const videoTexture = texture ? useVideoTexture(texture) : null;

  // Play video
  useEffect(() => {
    if (videoTexture && (videoTexture as any).image) {
      const video = (videoTexture as any).image as HTMLVideoElement;
      try {
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.currentTime = 0;
        const p = video.play();
        if (p && typeof p.then === "function") p.catch(() => {});
      } catch {
        // ignore playback errors
      }
    }
  }, [videoTexture, texture]);

  // Mobile detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Fix materials
  useEffect(() => {
    if (!materials) return;
    Object.values(materials).forEach((mat: any) => {
      if (!mat) return;
      try {
        if (mat.emissive && typeof mat.emissive.setHex === "function") {
          mat.emissive.setHex(0x000000);
        }
        if (mat.map) {
          mat.map.colorSpace = THREE.SRGBColorSpace;
        }
        mat.needsUpdate = true;
      } catch {
        // ignore per-material problems
      }
    });
  }, [materials]);

  // Filter nodes that have geometry
  const nodeEntries = Object.entries(nodes).filter(([, n]: any) => n?.geometry);

  // Create debug info and send to parent
  useEffect(() => {
    if (onDebugInfo && nodeEntries.length > 0) {
      const nodeNames = nodeEntries.map(([name]) => name).join(", ");
      const materialNames = Object.keys(materials).join(", ");
      
      const info = `Nodes (${nodeEntries.length}): ${nodeNames}\n\nMaterials (${Object.keys(materials).length}): ${materialNames}\n\nVideo: ${videoTexture ? "✓ Loaded" : "✗ Not loaded"}\n\nScreen Mesh: ${screenMeshName || "None (using plane)"}`;
      
      onDebugInfo(info);
      
      console.log("=== MODEL DEBUG INFO ===");
      console.log("Node names:", nodeNames);
      console.log("Materials:", materialNames);
      console.log("Screen Mesh:", screenMeshName || "None");
      console.log("========================");
    }
  }, [nodeEntries, materials, videoTexture, onDebugInfo, screenMeshName]);

  return (
    <group ref={group} dispose={null} position={position} rotation={rotation} scale={scale}>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[0, 2, 0]} intensity={0.5} />
      
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          {/* Render 3D model */}
          {nodeEntries.length > 0 ? (
            nodeEntries.map(([name, node]: any) => {
              // Find appropriate material
              let mat = null;
              try {
                if (node.material && typeof node.material === "string" && materials[node.material]) {
                  mat = materials[node.material];
                } else if (node.material && node.material.name && materials[node.material.name]) {
                  mat = materials[node.material.name];
                } else {
                  mat = materials["01___Default"] || Object.values(materials)[0] || null;
                }
              } catch {
                mat = Object.values(materials)[0] || null;
              }

              // If this is the selected screen mesh and we have a video, use video texture
              const isScreenMesh = screenMeshName === name;
              
              if (isScreenMesh && videoTexture) {
                // Clone the material and replace with video texture
                const videoMat = mat ? mat.clone() : new THREE.MeshBasicMaterial();
                videoMat.map = videoTexture;
                videoMat.needsUpdate = true;
                
                return (
                  <mesh
                    key={name}
                    geometry={node.geometry}
                    material={videoMat}
                    castShadow
                    receiveShadow
                  />
                );
              }

              return (
                <mesh
                  key={name}
                  geometry={node.geometry}
                  material={mat || undefined}
                  castShadow
                  receiveShadow
                />
              );
            })
          ) : (
            // Fallback cube if no model loaded
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="hotpink" />
            </mesh>
          )}

          {/* Backup: Video screen overlay (only show if no screen mesh selected) */}
          {videoTexture && !screenMeshName && (
            <mesh
              position={[videoPosition.x, videoPosition.y, videoPosition.z]}
              rotation={[videoRotation.x, videoRotation.y, videoRotation.z]}
              scale={[videoScale.x, videoScale.y, 1]}
            >
              <planeGeometry args={[1, 1]} />
              <meshBasicMaterial map={videoTexture as any} toneMapped={false} />
            </mesh>
          )}
        </group>
      </group>
    </group>
  );
};

// Preload the GLTF file
useGLTF.preload("/models/desktop_computer.glb");

export default DemoComputer;