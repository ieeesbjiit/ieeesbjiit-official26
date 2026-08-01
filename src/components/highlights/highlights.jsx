import React, { useState, useEffect, useRef } from "react";
import { Users, Megaphone, UsersRound, Venus } from "lucide-react";

import attendees from './attendees.jpg';
import members from './members.jpg';
import WIE from './WIE.jpg';
import Xenith from './Xenith.PNG';

import styles from './highlights.module.css'

const STATS = [
  {
    id: "members",
    Icon: Users,
    number: 3500,
    suffix: "+",
    label: "Active Members",
    image: members,
    glow: "#1477d6",
  },
  {
    id: "events",
    Icon: Megaphone,
    number: 15,
    suffix: "+",
    label: "Events Organised",
    image: Xenith,
    glow: "#0562b4",
  },
  {
    id: "attendees",
    Icon: UsersRound,
    number: 3000,
    suffix: "+",
    label: "Attendees Across Events",
    image: attendees,
    glow: "#1a8fe3",
  },
  {
    id: "wie",
    Icon: Venus,
    number: 80,
    suffix: "+",
    label: "WIE Members",
    image: WIE,
    glow: "#0b4c87",
  },
];
 
// Counts a number up from 0 to target once it scrolls into view
function useCountUp(target, duration = 1800) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const hasRun = useRef(false);
 
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
 
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRun.current) {
            hasRun.current = true;
            const start = performance.now();
            const tick = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
              setValue(Math.round(eased * target));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
 
    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration]);
 
  return [value, ref];
}
 
function FlipCard({ stat, floatDelay, floatDuration }) {
  const [flipped, setFlipped] = useState(false);
  const [count, ref] = useCountUp(stat.number);
  const { Icon } = stat;
 
  const handleEnter = () => setFlipped(true);
  const handleLeave = () => setFlipped(false);
  const handleTap = () => setFlipped((f) => !f);
 
  return (
    <div
      className="float-wrapper highlights"
      style={{
        animationDelay: `${floatDelay}s`,
        animationDuration: `${floatDuration}s`,
      }}
    >
      <div
        className="flip-card"
        ref={ref}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={handleTap}
        onTouchStart={handleTap}
      >

        <div
          className="glow-orb"
          style={{ background: stat.glow, animationDelay: `${floatDelay}s` }}
        />
 
        <div className={`flip-card-inner ${flipped ? "is-flipped" : ""}`}>
        
          <div
            className="flip-face flip-front"
            style={{
              boxShadow: `0 0 40px -6px ${stat.glow}66, 0 8px 32px rgba(2,10,20,0.45), inset 0 1px 0 rgba(255,255,255,0.25)`,
            }}
          >
            <div className="glass-sheen" />
            <Icon
              size={38}
              color="#fff"
              strokeWidth={1.75}
              style={{ filter: `drop-shadow(0 0 10px ${stat.glow}aa)` }}
            />
            <div className="number">
              {count}
              {stat.suffix}
            </div>
            <div className="label">{stat.label}</div>
          </div>
 
          
          <div
            className="flip-face flip-back"
            style={{
              backgroundImage: `url(${stat.image})`,
              boxShadow: `0 0 50px -4px ${stat.glow}99`,
            }}
          >
            <div className="back-fade" />
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default function FlipStatCards() {
  return (
    <div className="section-wrap">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
 
        :root {
          --navy-950: #041627;
          --navy-800: #0a2f52;
          --blue-700: #0b4c87;
          --blue-500: #0562b4;
          --blue-400: #1477d6;
        }
 
        .section-wrap {
          min-height: 100vh;
          background: linear-gradient(160deg, var(--navy-950) 0%, var(--navy-800) 45%, var(--blue-700) 100%);
          padding: 90px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
          overflow: hidden;
        }
 
        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 40px;
          width: 100%;
          max-width: 1100px;
        }
 
        .float-wrapper {
          animation-name: drift;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
        }
 
        @keyframes drift {
          0%   { transform: translate(0px, 0px) rotate(0deg); }
          50%  { transform: translate(6px, -16px) rotate(0.6deg); }
          100% { transform: translate(-6px, 6px) rotate(-0.6deg); }
        }
 
        .flip-card {
          position: relative;
          perspective: 1200px;
          height: 320px;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }
 
        .glow-orb {
          position: absolute;
          inset: 10%;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.5;
          z-index: -1;
          animation: pulse-glow 4.5s ease-in-out infinite;
        }
 
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.35; transform: scale(0.9); }
          50%      { opacity: 0.65; transform: scale(1.08); }
        }
 
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
          transform-style: preserve-3d;
          border-radius: 20px;
        }
 
        .flip-card-inner.is-flipped {
          transform: rotateY(180deg) translateY(-16px);
        }
 
        .flip-face {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          backface-visibility: hidden;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
 
        .flip-front {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          transition: box-shadow 0.4s ease, border-color 0.4s ease;
          gap: 14px;
        }
 
        .flip-card:hover .flip-front {
          border-color: rgba(20, 119, 214, 0.7);
        }
 
        .glass-sheen {
          position: absolute;
          top: -60%;
          left: -20%;
          width: 60%;
          height: 220%;
          background: linear-gradient(
            120deg,
            rgba(255,255,255,0.18) 0%,
            rgba(255,255,255,0.02) 40%,
            transparent 60%
          );
          transform: rotate(20deg);
          pointer-events: none;
        }
 
        .number {
          color: rgb(255, 255, 255);
          font-weight: 800;
          font-size: 40px;
          line-height: 1.1;
          font-variant-numeric: tabular-nums;
        }
 
        .label {
          color: rgba(255, 255, 255, 0.8);
          font-weight: 600;
          font-size: 15px;
          letter-spacing: 0.3px;
          text-align: center;
          padding: 0 18px;
        }
 
        .flip-back {
          transform: rotateY(180deg);
          background-size: cover;
          background-position: center;
          border: 1px solid rgba(255, 255, 255, 0.22);
        }
 
        .back-fade {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 35%;
          background: linear-gradient(180deg, transparent 0%, rgba(4,22,39,0.75) 100%);
          pointer-events: none;
        }
 
        @media (prefers-reduced-motion: reduce) {
          .float-wrapper, .glow-orb { animation: none; }
        }

        .section-heading {
            color: #fff;
            font-weight: 800;
            width: 100%;
            font-size: clamp(32px, 5vw, 56px);
            text-align: center;
            margin-bottom: 56px;
            letter-spacing: 0.5px;
            background: linear-gradient(90deg, #ffffff 0%, #bcdcff 50%, #ffffff 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: heading-glow 4.5s ease-in-out infinite;
        }

        @keyframes heading-glow {
            0%, 100% { filter: drop-shadow(0 0 14px rgba(20, 119, 214, 0.45)); }
            50%      { filter: drop-shadow(0 0 28px rgba(20, 119, 214, 0.75)); }
        }

        @media (prefers-reduced-motion: reduce) {
            .section-heading { animation: none; }
        }

      `}</style>

        <h2 className="section-heading">Highlights From The Last Year</h2>
      <div className="card-grid">
        {STATS.map((stat, i) => (
          <FlipCard
            key={stat.id}
            stat={stat}
            floatDelay={i * 0.6}
            floatDuration={5 + i * 0.7}
          />
        ))}
      </div>
    </div>
  );
}