import React from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import './Header.css';

function Header() {
  const { ref, visible } = useScrollReveal();

  const revealStyle = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(32px)',
    transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)',
  };

  return (
    <div ref={ref} className="header" style={revealStyle}>
      <div className="header__badge">
        <span className="header__badge-line header__badge-line--left" />
        <span className="header__badge-text">IEEE Official Website 2026</span>
        <span className="header__badge-line header__badge-line--right" />
      </div>
      <h2 className="header__title">Meet the IEEE Core Team</h2>
      <p className="header__subtitle">
        The passionate individuals steering IEEE into the future.
      </p>
    </div>
  );
}

export default Header;