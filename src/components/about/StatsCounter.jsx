import React, { useState, useEffect } from 'react';

const StatsCounter = ({ endValue, suffix = '', textValue, label, startTrigger, formatThousands = false }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // If it's a text value (like "Endless") or the trigger hasn't fired, do nothing
    if (!startTrigger || textValue) return;

    let startTime = null;
    const duration = 2000; // 2 seconds animation duration

    // Easing function for smooth deceleration
    const easeOutExpo = (t) => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = currentTime - startTime;
      const timeFraction = Math.min(progress / duration, 1);
      
      const easing = easeOutExpo(timeFraction);
      const currentCount = Math.floor(easing * endValue);
      
      setCount(currentCount);

      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [startTrigger, endValue, textValue]);

  // Handle special case where 430000 was passed with a "K+" suffix from About.jsx
  const formatDisplayValue = () => {
    if (textValue) return textValue;
    
    if (endValue >= 1000 && suffix.includes('K')) {
        // Formats 430000 to "430K+" automatically
        return Math.floor(count / 1000) + suffix; 
    }
    
    return (formatThousands ? count.toLocaleString() : count) + suffix;
  };

  return (
    <div className="stat-item">
      <span className="stat-value">{formatDisplayValue()}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
};

export default StatsCounter;