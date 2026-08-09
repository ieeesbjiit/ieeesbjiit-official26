import React, { useMemo } from 'react';

const FloatingParticles = () => {
  // Memoize the particle properties to prevent recalculation on re-renders
  const particles = useMemo(() => {
    // Generate 18 particles to stay within the 15-20 requirement for optimal performance
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      // Randomize sizes between 100px and 400px
      width: `${Math.random() * 300 + 100}px`,
      height: `${Math.random() * 300 + 100}px`,
      // Randomize positioning across the entire container
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      // Randomize animation duration (15s to 35s) for slow, luxurious movement
      animationDuration: `${Math.random() * 20 + 15}s`,
      // Negative delay ensures particles are already moving when the component mounts
      animationDelay: `-${Math.random() * 20}s`,
    }));
  }, []);

  return (
    <div className="particles-container">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            width: particle.width,
            height: particle.height,
            left: particle.left,
            top: particle.top,
            animationDuration: particle.animationDuration,
            animationDelay: particle.animationDelay,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;