import React, { useState, useRef, useEffect } from 'react';
import { LinkedInIcon } from '../icons';
import './TeamCard.css';

function TeamCard({
  member,
  index,
  revealed,
  delay,
  dimmed,
  isActive,
  onToggle,
  onHover,
}) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });
  const cardRef = useRef(null);

  // Detect if device is touch-only
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: none)');
    setIsTouch(mq.matches);
    const handler = (e) => setIsTouch(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e) => {
    if (isTouch) return;
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setTilt({
      rx: (0.5 - y) * 22,
      ry: (x - 0.5) * 18,
      mx: x * 100,
      my: y * 100,
    });
  };

  const handleMouseEnter = () => {
    if (isTouch) return;
    setHovered(true);
    onHover(true);
  };

  const handleMouseLeave = () => {
    if (isTouch) return;
    setHovered(false);
    onHover(false);
    setTilt({ rx: 0, ry: 0, mx: 50, my: 50 });
  };

  // Touch tap toggle handler
  const handleClick = (e) => {
    if (!isTouch) return;
    // Don't toggle if clicking the LinkedIn link
    if (e.target.closest('.team-card__social-btn')) return;
    onToggle();
  };

  // Effective hover state: hover on desktop, tap-active on touch
  const isEffectivelyHovered = isTouch ? isActive : hovered;

  const wrapperStyle = {
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateY(0)' : 'translateY(48px)',
    transition: `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  };

  const cardTransform =
    hovered && !isTouch
      ? `translateY(-28px) scale(1.09) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
      : 'translateY(0) scale(1) rotateX(0deg) rotateY(0deg)';

  const glareStyle = {
    background:
      hovered && !isTouch
        ? `radial-gradient(circle at ${tilt.mx}% ${tilt.my}%, rgba(255,255,255,0.15) 0%, transparent 60%)`
        : 'none',
  };

  const cardClassName = [
    'team-card',
    isEffectivelyHovered && 'team-card--hovered',
    dimmed && !isEffectivelyHovered && 'team-card--dimmed',
  ]
    .filter(Boolean)
    .join(' ');

  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="team-card-wrapper" style={wrapperStyle}>
      <div
        className={`team-card__dim-overlay ${
          dimmed ? 'team-card__dim-overlay--active' : ''
        }`}
      />

      <div
        ref={cardRef}
        className={cardClassName}
        style={{ transform: cardTransform }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <img
          src={member.img}
          alt=""
          aria-hidden="true"
          className="team-card__photo"
        />

        <div className="team-card__glare" style={glareStyle} />

        <div className="team-card__vignette" />

        <div className="team-card__overlay">
          <p className="team-card__name">{member.name}</p>
          <p className="team-card__role">{member.role}</p>
        </div>

        <div className="team-card__index">{index + 1}</div>

        {member.cutout && (
          <img
            src={member.cutout}
            alt={member.name}
            className="team-card__photo team-card__photo--front"
          />
        )}

        <div className="team-card__social-wrapper">
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="team-card__social-btn"
            aria-label={`${member.name} on LinkedIn`}
            title={`Visit ${member.name}'s LinkedIn profile`}
            onClick={handleLinkClick}
          >
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

export default TeamCard;