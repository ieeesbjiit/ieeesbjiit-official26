import { useState, useCallback } from 'react';

const useMouseTilt = (ref) => {
  // Store the transform style in state to trigger the 3D rotation
  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg)',
  });

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    
    // Calculate exact mouse position relative to the edges of the card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Convert coordinates to percentages for the CSS spotlight radial-gradient
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    // Apply CSS variables directly for ultra-smooth rendering (bypasses React batching)
    ref.current.style.setProperty('--mouse-x', `${xPercent}%`);
    ref.current.style.setProperty('--mouse-y', `${yPercent}%`);

    // Calculate rotation angles (capped at maximum 4 degrees)
    // Moving left/right rotates around the Y axis, moving up/down rotates around X
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -4; 
    const rotateY = ((x - centerX) / centerX) * 4;

    setTiltStyle({
      transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    });
  }, [ref]);

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    
    // Smoothly reset the spotlight to the center of the card
    ref.current.style.setProperty('--mouse-x', '50%');
    ref.current.style.setProperty('--mouse-y', '50%');

    // Reset the 3D tilt rotation
    setTiltStyle({
      transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg)',
    });
  }, [ref]);

  return { tiltStyle, handleMouseMove, handleMouseLeave };
};

export default useMouseTilt;