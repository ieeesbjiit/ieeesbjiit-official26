import React, { useState, useEffect, useRef } from 'react';
import TeamCard from '../TeamCard/TeamCard';
import useScrollReveal from '../../hooks/useScrollReveal';
import './TeamGrid.css';

const FEATURED_COUNT = 2;
const STAGGER_DELAY_MS = 60;

function TeamGrid({ team }) {
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const gridRef = useRef(null);

  const { ref: featuredRef, visible: featuredVisible } = useScrollReveal();
  const { ref: gridSectionRef, visible: gridVisible } = useScrollReveal();

  // Close active card when tapping outside
  useEffect(() => {
    if (activeCardIndex === null) return;

    const handleOutsideTap = (e) => {
      if (gridRef.current && !gridRef.current.contains(e.target)) {
        setActiveCardIndex(null);
      }
    };

    document.addEventListener('touchstart', handleOutsideTap);
    document.addEventListener('click', handleOutsideTap);
    return () => {
      document.removeEventListener('touchstart', handleOutsideTap);
      document.removeEventListener('click', handleOutsideTap);
    };
  }, [activeCardIndex]);

  const handleCardToggle = (idx) => {
    setActiveCardIndex((prev) => (prev === idx ? null : idx));
  };

  const featured = team.slice(0, FEATURED_COUNT);
  const rest = team.slice(FEATURED_COUNT);

  // Helper to check dimming
  const isDimmed = (idx) =>
    activeCardIndex !== null && activeCardIndex !== idx;

  return (
    <div className="team-grid" ref={gridRef}>
      {/* FEATURED ROW — 2 cards centered */}
      <div ref={featuredRef} className="team-grid__featured">
        {featured.map((member, ci) => (
          <div key={member.name} className="team-grid__featured-cell">
            <TeamCard
              member={member}
              index={ci}
              revealed={featuredVisible}
              delay={ci * STAGGER_DELAY_MS}
              dimmed={isDimmed(ci)}
              isActive={activeCardIndex === ci}
              onToggle={() => handleCardToggle(ci)}
              onHover={() => {}}
            />
          </div>
        ))}
      </div>

      {/* REST — auto-flowing grid */}
      <div ref={gridSectionRef} className="team-grid__main">
        {rest.map((member, ci) => {
          const globalIdx = FEATURED_COUNT + ci;
          return (
            <div key={member.name} className="team-grid__cell">
              <TeamCard
                member={member}
                index={globalIdx}
                revealed={gridVisible}
                delay={ci * STAGGER_DELAY_MS}
                dimmed={isDimmed(globalIdx)}
                isActive={activeCardIndex === globalIdx}
                onToggle={() => handleCardToggle(globalIdx)}
                onHover={() => {}}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TeamGrid;