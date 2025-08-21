import React, { useEffect, useState, useRef } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

interface TrailDot {
  x: number;
  y: number;
  id: number;
}

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTextHover, setIsTextHover] = useState(false);
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  
  const trailIdRef = useRef(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const lastPositionRef = useRef<CursorPosition>({ x: 0, y: 0 });

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mouse move handler
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      
      // Update main cursor position immediately
      setPosition(newPosition);

      // Only add trail dot if we have a previous position (not the first move)
      if (lastPositionRef.current.x !== 0 || lastPositionRef.current.y !== 0) {
        // Add trail dot at the previous position (so it follows behind)
        const trailDot: TrailDot = {
          x: lastPositionRef.current.x,
          y: lastPositionRef.current.y,
          id: trailIdRef.current++
        };

        setTrail(prev => {
          const newTrail = [trailDot, ...prev];
          return newTrail.slice(0, 8); // Keep only last 8 dots
        });
      }
      
      // Update last position for next trail dot
      lastPositionRef.current = newPosition;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for interactive elements
      const isInteractive = target.matches('button, a, input, textarea, select, [role="button"], [tabindex]') ||
                           target.closest('button, a, input, textarea, select, [role="button"], [tabindex]');
      
      // Check for text elements ONLY in contact section
      const contactSection = target.closest('#contact');
      const isText = contactSection && (
        target.matches('p, span, h1, h2, h3, h4, h5, h6, label, li') ||
        target.closest('p, span, h1, h2, h3, h4, h5, h6, label, li')
      );
      
      setIsHovering(isInteractive);
      setIsTextHover(isText && !isInteractive);
    };

    const handleMouseOut = () => {
      setIsHovering(false);
      setIsTextHover(false);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMobile]);

  // Clean up trail dots
  useEffect(() => {
    if (isMobile) return;

    const interval = setInterval(() => {
      setTrail(prev => prev.slice(0, -1));
    }, 100);

    return () => clearInterval(interval);
  }, [isMobile]);

  // Don't render on mobile
  if (isMobile) return null;

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'hover' : ''} ${isClicking ? 'click' : ''} ${isTextHover ? 'text' : ''}`}
        style={{
          transform: `translate(${position.x - 10}px, ${position.y - 10}px)`,
        }}
      />
      
      {/* Cursor trail */}
      {trail.map((dot, index) => (
        <div
          key={dot.id}
          className="cursor-trail"
          style={{
            transform: `translate(${dot.x - 3}px, ${dot.y - 3}px)`,
            opacity: (trail.length - index) / trail.length * 0.6,
            animationDelay: `${index * 50}ms`,
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;