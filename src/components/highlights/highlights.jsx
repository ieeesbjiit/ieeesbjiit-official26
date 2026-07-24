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
      className={styles.floatWrapper}
      style={{
        animationDelay: `${floatDelay}s`,
        animationDuration: `${floatDuration}s`,
      }}
    >
      <div
        className={styles.flipCard}
        ref={ref}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={handleTap}
        onTouchStart={handleTap}
      >

        <div
          className={styles.glowOrb}
          style={{ background: stat.glow, animationDelay: `${floatDelay}s` }}
        />
 
        <div className={`${styles.flipCardInner} ${flipped ? styles.isFlipped : ""}`}>
        
          <div
            className={`${styles.flipFace} ${styles.flipFront}`}
            style={{
              boxShadow: `0 0 40px -6px ${stat.glow}66, 0 8px 32px rgba(2,10,20,0.45), inset 0 1px 0 rgba(255,255,255,0.25)`,
            }}
          >
            <div className={styles.glassSheen} />
            <Icon
              size={38}
              color="#fff"
              strokeWidth={1.75}
              style={{ filter: `drop-shadow(0 0 10px ${stat.glow}aa)` }}
            />
            <div className={styles.number}>
              {count}
              {stat.suffix}
            </div>
            <div className={styles.label}>{stat.label}</div>
          </div>
 
          
          <div
            className={`${styles.flipFace} ${styles.flipBack}`}
            style={{
              backgroundImage: `url(${stat.image})`,
              boxShadow: `0 0 50px -4px ${stat.glow}99`,
            }}
          >
            <div className={styles.backFade} />
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default function FlipStatCards() {
  return (
    <div className={styles.sectionWrap}>
        <h2 className={styles.sectionHeading}>Highlights From The Last Year</h2>
      <div className={styles.cardGrid}>
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