import React, { CSSProperties, PropsWithChildren, useState } from 'react';

type ElectricBorderProps = PropsWithChildren<{
  color?: string;
  speed?: number;
  chaos?: number;
  thickness?: number;
  className?: string;
  style?: CSSProperties;
}>;

const ElectricBorder: React.FC<ElectricBorderProps> = ({
  children,
  color = '#5227FF',
  thickness = 2,
  className = '',
  style
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const borderRadius = style?.borderRadius ?? 16;

  const wrapperStyle: CSSProperties = {
    ...style,
    position: 'relative',
    borderRadius,
    border: `${thickness}px solid ${color}`,
    boxShadow: isHovered 
      ? `0 0 20px ${color}80, inset 0 0 10px ${color}40` 
      : `0 0 8px ${color}30, inset 0 0 4px ${color}10`,
    transform: isHovered ? 'translateY(-2px) scale(1.01)' : 'translateY(0) scale(1)',
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    overflow: 'hidden',
  };

  return (
    <div 
      className={className} 
      style={wrapperStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
};

export default ElectricBorder;
