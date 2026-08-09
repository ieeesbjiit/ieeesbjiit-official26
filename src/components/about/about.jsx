import React, { useRef } from 'react';
import './About.css';
import FloatingParticles from './FloatingParticles';
import useIntersectionObserver from './useIntersectionObserver';
import useMouseTilt from './useMouseTilt';

const About = () => {
  // We will attach this ref to the static container, not the moving card
  const containerRef = useRef(null);
  
  const { tiltStyle, handleMouseMove, handleMouseLeave } = useMouseTilt(containerRef);

  const [headerRef, headerVisible] = useIntersectionObserver();
  const [paraRef, paraVisible] = useIntersectionObserver();

  return (
    <section className="about-section" id="about">
      <FloatingParticles />

      
      <div 
        className="about-container"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
       
        <div
          className="about-card"
          style={tiltStyle}
        >
          <div className="spotlight-overlay"></div>

          <div className="about-content">
            <div
              ref={headerRef}
              className={`reveal-item header-wrapper ${headerVisible ? 'is-visible' : ''}`}
            >
              <h2 className="header-title">ABOUT IEEE SB JIIT</h2>
              <div className="header-divider"></div>
            </div>

            <p
              ref={paraRef}
              className={`reveal-item delay-1 about-paragraph ${paraVisible ? 'is-visible' : ''}`}
            >
              The IEEE Student Branch is one of the most helpful components of the department as it allows students to meet and learn from their classmates as well as faculty and experts in the field. It provides participants with the opportunity to begin networking in their fields of interest and future professions. There are almost 3,700 student branches in over 100 countries worldwide. Student Branch activities give considerable educational, technical, and professional rewards through special projects, events, meetings, participation in regional conferences, workshops, and contests. The Student Professional Awareness Conferences (S-PACs) promote professional awareness, whereas the Student Professional Awareness Venture (S-PAVe) entails building teams to create project proposals to enhance professional awareness and obtaining funds to execute the project</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;