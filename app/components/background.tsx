import React, { useEffect, useState } from 'react';

interface PlasmaProps {
  color?: string;
  speed?: number;
  direction?: 'forward' | 'reverse' | 'pingpong';
  scale?: number;
  opacity?: number;
  mouseInteractive?: boolean;
}

export const Plasma: React.FC<PlasmaProps> = ({
  color = '#6a329f',
  opacity = 0.8,
  mouseInteractive = true,
  speed = 0.6
}) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (!mouseInteractive) return;
    
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setMousePos({
            x: (e.clientX / window.innerWidth) * 100,
            y: (e.clientY / window.innerHeight) * 100,
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseInteractive]);

  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-hidden bg-background pointer-events-none transition-colors duration-500 ease-in-out"
      style={{ opacity }}
    >
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(10%, -10%) scale(1.1); }
          66% { transform: translate(-10%, 10%) scale(0.9); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-15%, 15%) scale(0.95); }
          66% { transform: translate(15%, -15%) scale(1.05); }
        }
        .orb {
          position: absolute;
          border-radius: 50%;
        }
      `}</style>
      
      {/* Background base */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30 transition-colors duration-500 ease-in-out"></div>

      {/* Animated soft orbs using radial gradients (hardware accelerated, no expensive blurs) */}
      <div 
        className="orb w-[120vw] h-[120vw] sm:w-[80vw] sm:h-[80vw]"
        style={{
          top: '-30%',
          left: '-20%',
          background: `radial-gradient(circle, ${color}1a 0%, transparent 60%)`,
          animation: `float1 ${20 / speed}s ease-in-out infinite`,
        }}
      />
      <div 
        className="orb w-[100vw] h-[100vw] sm:w-[70vw] sm:h-[70vw]"
        style={{
          bottom: '-20%',
          right: '-20%',
          background: `radial-gradient(circle, ${color}15 0%, transparent 60%)`,
          animation: `float2 ${25 / speed}s ease-in-out infinite alternate`,
        }}
      />
      
      {/* Mouse interactive glow */}
      {mouseInteractive && (
        <div 
          className="absolute w-[60vw] h-[60vw] sm:w-[40vw] sm:h-[40vw] rounded-full transition-transform duration-700 ease-out"
          style={{
            background: `radial-gradient(circle, ${color}20 0%, transparent 50%)`,
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
    </div>
  );
};

export default Plasma;
