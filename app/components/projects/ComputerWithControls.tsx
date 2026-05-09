import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import DemoComputer from "./DemoComputer";

interface ComputerWithControlsProps {
  texture?: string;
}

const ComputerWithControls: React.FC<ComputerWithControlsProps> = ({ texture }) => {
  const [showControls, setShowControls] = useState(true);
  const [debugInfo, setDebugInfo] = useState<string>("");
  const [screenMesh, setScreenMesh] = useState<string>("");
  
  // Video position controls - ONLY THESE NOW
  const [videoPos, setVideoPos] = useState({ x: -0.150, y: 0.190, z: -0.230 });
  const [videoScale, setVideoScale] = useState({ x: 1.40, y: 0.85 });
  const [videoRotation, setVideoRotation] = useState({ x: 0, y: 0, z: 0 });

  // Available mesh names from your model
  const availableMeshes = [
    "None (Plane overlay)",
    "Object_4",
    "Object_5", 
    "Object_6",
    "Object_8",
    "Object_9",
    "Object_11",
    "Object_12"
  ];

  const copyToClipboard = () => {
    const values = screenMesh 
      ? `screenMeshName="${screenMesh}"` 
      : `videoPosition={{ x: ${videoPos.x}, y: ${videoPos.y}, z: ${videoPos.z} }}
videoScale={{ x: ${videoScale.x}, y: ${videoScale.y} }}
videoRotation={{ x: ${videoRotation.x}, y: ${videoRotation.y}, z: ${videoRotation.z} }}`;
    
    navigator.clipboard.writeText(values);
    alert('Video values copied to clipboard!');
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Debug Info Display */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.9)',
        padding: '15px',
        borderRadius: '8px',
        color: '#00ff00',
        fontSize: '11px',
        fontFamily: 'monospace',
        maxWidth: '90%',
        maxHeight: '200px',
        overflowY: 'auto',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all'
      }}>
        <strong style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>
          🔍 Model Debug Info:
        </strong>
        {debugInfo || "Loading model info..."}
      </div>

      {/* Toggle button for controls */}
      <button
        onClick={() => setShowControls(!showControls)}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 1000,
          padding: '8px 16px',
          background: '#6366f1',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: '600',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
      >
        {showControls ? 'Hide' : 'Show'} Controls
      </button>

      {/* Control Panel */}
      {showControls && (
        <div style={{
          position: 'absolute',
          top: '50px',
          right: '10px',
          zIndex: 1000,
          background: 'rgba(0, 0, 0, 0.95)',
          padding: '20px',
          borderRadius: '8px',
          color: 'white',
          fontSize: '12px',
          maxHeight: 'calc(100% - 60px)',
          overflowY: 'auto',
          width: '280px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)'
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '15px', fontSize: '14px', fontWeight: 'bold' }}>
            Video Position Controls
          </h3>

          {/* Screen Mesh Selector */}
          <div style={{ marginBottom: '15px', padding: '10px', background: 'rgba(99, 102, 241, 0.2)', borderRadius: '4px' }}>
            <strong style={{ display: 'block', marginBottom: '8px', color: '#a5b4fc' }}>
              🎯 Select Screen Mesh
            </strong>
            <select
              value={screenMesh || "None (Plane overlay)"}
              onChange={(e) => setScreenMesh(e.target.value === "None (Plane overlay)" ? "" : e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                background: '#1f2937',
                color: 'white',
                border: '1px solid #374151',
                borderRadius: '4px',
                fontSize: '12px'
              }}
            >
              {availableMeshes.map(mesh => (
                <option key={mesh} value={mesh}>{mesh}</option>
              ))}
            </select>
            <div style={{ fontSize: '10px', marginTop: '6px', color: '#9ca3af' }}>
              Try each option to find the screen
            </div>
          </div>
          
          {/* Video Position Controls - only show if using plane overlay */}
          {!screenMesh && (
            <>
              <div style={{ marginBottom: '15px' }}>
                <strong style={{ display: 'block', marginBottom: '8px' }}>📹 Video Position</strong>
                <label style={{ display: 'block', marginBottom: '8px' }}>
                  <span style={{ display: 'block', marginBottom: '4px' }}>X: {videoPos.x.toFixed(3)}</span>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    step="0.01"
                    value={videoPos.x}
                    onChange={(e) => setVideoPos({ ...videoPos, x: parseFloat(e.target.value) })}
                    style={{ width: '100%' }}
                  />
                </label>
                <label style={{ display: 'block', marginBottom: '8px' }}>
                  <span style={{ display: 'block', marginBottom: '4px' }}>Y: {videoPos.y.toFixed(3)}</span>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    step="0.01"
                    value={videoPos.y}
                    onChange={(e) => setVideoPos({ ...videoPos, y: parseFloat(e.target.value) })}
                    style={{ width: '100%' }}
                  />
                </label>
                <label style={{ display: 'block', marginBottom: '8px' }}>
                  <span style={{ display: 'block', marginBottom: '4px' }}>Z: {videoPos.z.toFixed(3)}</span>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    step="0.01"
                    value={videoPos.z}
                    onChange={(e) => setVideoPos({ ...videoPos, z: parseFloat(e.target.value) })}
                    style={{ width: '100%' }}
                  />
                </label>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <strong style={{ display: 'block', marginBottom: '8px' }}>📐 Video Scale</strong>
                <label style={{ display: 'block', marginBottom: '8px' }}>
                  <span style={{ display: 'block', marginBottom: '4px' }}>Width: {videoScale.x.toFixed(2)}</span>
                  <input
                    type="range"
                    min="0.1"
                    max="5"
                    step="0.05"
                    value={videoScale.x}
                    onChange={(e) => setVideoScale({ ...videoScale, x: parseFloat(e.target.value) })}
                    style={{ width: '100%' }}
                  />
                </label>
                <label style={{ display: 'block', marginBottom: '8px' }}>
                  <span style={{ display: 'block', marginBottom: '4px' }}>Height: {videoScale.y.toFixed(2)}</span>
                  <input
                    type="range"
                    min="0.1"
                    max="5"
                    step="0.05"
                    value={videoScale.y}
                    onChange={(e) => setVideoScale({ ...videoScale, y: parseFloat(e.target.value) })}
                    style={{ width: '100%' }}
                  />
                </label>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <button
            onClick={() => {
              setVideoPos({ x: -0.150, y: 0.190, z: -0.230 });
              setVideoScale({ x: 1.40, y: 0.85 });
              setVideoRotation({ x: 0, y: 0, z: 0 });
              setScreenMesh("");
            }}
            style={{
              width: '100%',
              padding: '10px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginBottom: '8px',
              fontSize: '12px',
              fontWeight: '600'
            }}
          >
            Reset Video Position
          </button>
          
          <button
            onClick={copyToClipboard}
            style={{
              width: '100%',
              padding: '10px',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '600'
            }}
          >
            Copy All Values
          </button>

          <div style={{ 
            marginTop: '15px', 
            padding: '10px', 
            background: 'rgba(59, 130, 246, 0.2)', 
            borderRadius: '4px',
            fontSize: '11px',
            lineHeight: '1.4'
          }}>
            <strong>Tips:</strong><br/>
            • Computer is fixed at Z: -1.10<br/>
            • Select screen mesh from dropdown<br/>
            • Or adjust video plane position with sliders
          </div>
        </div>
      )}

      {/* Canvas with 3D Scene */}
      <Canvas 
        frameloop="demand"
        camera={{ position: [0, 0, 5], fov: 45 }} 
        style={{ width: '100%', height: '100%', background: '#1a1a1a' }}
      >
        <color attach="background" args={['#1a1a1a']} />
        
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={10}
          target={[0, 0, 0]}
        />
        
        <DemoComputer 
          texture={texture || ''} 
          position={[0, 0, -1.10]}
          scale={2.2}
          videoPosition={videoPos}
          videoScale={videoScale}
          videoRotation={videoRotation}
          onDebugInfo={setDebugInfo}
          screenMeshName={screenMesh}
        />
      </Canvas>
    </div>
  );
};

export default ComputerWithControls;