import React, { useState, useEffect, useRef, useCallback } from "react";
import Background from "./comopnents/Background";
import CarouselCard from "./comopnents/CarouselCard";
import InfoPanel from "./comopnents/InfoPanel";
import NavControls from "./comopnents/NavControls";

const team = [
  {
    name: "Mara Solís",
    role: "Chief Executive Officer",
    bio: "Visionary strategist with 15 years navigating global markets. Steers the ship through uncharted waters with precision and calm.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=480&fit=crop&auto=format",
  },
  {
    name: "Theo Nakamura",
    role: "Head of Engineering",
    bio: "Deep-systems architect and open-source contributor. Turns impossible timelines into shipped products the team is proud of.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=480&fit=crop&auto=format",
  },
  {
    name: "Lyra Osei",
    role: "Creative Director",
    bio: "Award-winning designer fusing semiotics with systems thinking. Every pixel she touches carries intention.",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=480&fit=crop&auto=format",
  },
  {
    name: "Declan Farrow",
    role: "Head of Product",
    bio: "Former researcher turned product lead. Obsesses over what users need before they know they need it.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=480&fit=crop&auto=format",
  },
  {
    name: "Ines Varga",
    role: "VP of Growth",
    bio: "Polyglot marketer with a mathematician's rigor. Finds the signal in noise and turns it into compounding traction.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=480&fit=crop&auto=format",
  },
  {
    name: "Omar Al-Rashid",
    role: "Lead Data Scientist",
    bio: "Builds models that earn trust, not just accuracy. Champions interpretable AI and never ships without rigorous testing.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=480&fit=crop&auto=format",
  },
  {
    name: "Sofia Reyes",
    role: "UX Research Lead",
    bio: "Translates fuzzy human behaviour into crisp design decisions. Her empathy maps have redirected three product pivots.",
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=480&fit=crop&auto=format",
  },
  {
    name: "Kai Brennan",
    role: "Infrastructure Engineer",
    bio: "Keeps the lights on at 99.97% uptime. Kai treats reliability as a form of respect for every person using the platform.",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=480&fit=crop&auto=format",
  },
  {
    name: "Priya Mehta",
    role: "Product Designer",
    bio: "Shapes interfaces that feel inevitable. Priya believes the best design is the kind users never have to think about.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=480&fit=crop&auto=format",
  },
  {
    name: "Lucas Ferreira",
    role: "Full-Stack Engineer",
    bio: "Ships from database schema to pixel with equal fluency. Lucas is the person the team calls when something is truly stuck.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=480&fit=crop&auto=format",
  },
  {
    name: "Aisha Kamara",
    role: "Marketing Lead",
    bio: "Storyteller and strategist. Aisha finds the human truth inside every brief and builds campaigns that actually land.",
    img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=480&fit=crop&auto=format",
  },
  {
    name: "Ren Watanabe",
    role: "Mobile Engineer",
    bio: "Crafts native experiences that feel silky on every device. Ren measures success by the absence of friction.",
    img: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=480&fit=crop&auto=format",
  },
  {
    name: "Elena Popescu",
    role: "Content Strategist",
    bio: "Structures information so it guides, not overwhelms. Elena has a rare gift for making complex ideas feel simple.",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=480&fit=crop&auto=format",
  },
  {
    name: "James Okafor",
    role: "DevOps Engineer",
    bio: "Automates everything automatable. James believes manual processes are just bugs waiting to be fixed.",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=480&fit=crop&auto=format",
  },
  {
    name: "Nadia Bloom",
    role: "Brand Designer",
    bio: "Architects visual identities that age well. Nadia works at the intersection of culture, craft, and commercial precision.",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=480&fit=crop&auto=format",
  },
  {
    name: "Carlos Díaz",
    role: "Security Engineer",
    bio: "Thinks like an attacker to protect like a defender. Carlos's threat models have stopped three critical vulnerabilities before launch.",
    img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&h=480&fit=crop&auto=format",
  },
  {
    name: "Zara Ahmed",
    role: "Operations Manager",
    bio: "The connective tissue that holds every initiative together. Zara turns organizational chaos into elegant, repeatable systems.",
    img: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=480&fit=crop&auto=format",
  },
];

const count = team.length;
const angle_step = 360 / count;
const radius = 520;

const GlobalStyles = () => {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Inter:wght@400;500&display=swap');

      @keyframes ripple {
        0%   { transform: scale(0.8); opacity: 0.8; }
        100% { transform: scale(1.2); opacity: 0; }
      }
      @keyframes particle {
        from { transform: translateY(0px); opacity: 0.3; }
        to   { transform: translateY(-20px); opacity: 0.7; }
      }
      @keyframes fadeDown {
        from { opacity: 0; transform: translateY(-20px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      * { scrollbar-width: none; }
      *::-webkit-scrollbar { display: none; }
    `}</style>
  );
};

const Header = () => {
  return (
    <div
      className="text-center"
      style={{ animation: "fadeDown 0.9s ease both" }}
    >
      <p
        className="text-xs uppercase tracking-[0.3em] mb-3"
        style={{ color: "#38bdf8" }}
      >
        Our Team
      </p>
      <h1
        className="text-4xl lg:text-6xl font-bold leading-none"
        style={{
          fontFamily: '"Outfit", sans-serif',
          letterSpacing: "-0.04em",
          background:
            "linear-gradient(150deg, #f0feff 0%, #7dd3fc 50%, #0ea5e9 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        The People Behind
        <br />
        the Work
      </h1>
    </div>
  );
};

const Team = () => {
  const [active, setActive] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [paused, setPaused] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const prevActive = useRef(0);
  const autoRef = useRef(null);

  const goTo = useCallback(
    (idx) => {
      if (idx === active) return;
      prevActive.current = active;
      setTransitioning(true);
      setActive(idx);
      
      let diff = idx - active;
      if (diff > count / 2) diff -= count;
      if (diff < -count / 2) diff += count;
      setRotation((prev) => prev - diff * angle_step);

      setTimeout(() => setTransitioning(false), 400);
    },
    [active],
  );

  const next = useCallback(() => goTo((active + 1) % count), [active, goTo]);

  const prev = useCallback(
    () => goTo((active - 1 + count) % count),
    [active, goTo],
  );

  useEffect(() => {
    if (paused) return;

    autoRef.current = setInterval(next, 1500);

    return () => {
      if (autoRef.current) {
        clearInterval(autoRef.current);
      }
    };
  }, [paused, next]);

  const member = team[active];

  // console.log("Running....")
  return (
    <div
      className="relative w-full overflow-hidden select-none"
      style={{
        minHeight: "100vh",
        background: "#020d22",
        fontFamily: '"Inter", sans-serif',
        overflowX: "hidden",
      }}
    >
      <Background />

      <div className="relative z-10 flex flex-col items-center py-5">
        <Header />

        <div
          className="relative flex-1 w-full"
          style={{
            minHeight: 550,
            perspective: "1100px",
            perspectiveOrigin: "50% 35%",
          }}
        >
          {/* Tilt wrapper */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "25%",
              width: 0,
              height: 0,
              transformStyle: "preserve-3d",
              transform: "rotateX(-13deg)",
            }}
          >
            {/* 3D rotating ring */}
            <div
              className="absolute"
              style={{
                width: 0,
                height: 0,
                transformStyle: "preserve-3d",
                transform: `rotateY(${rotation}deg)`,
                transition:
                  "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {team.map((m, i) => (
                <CarouselCard
                  key={m.name}
                  member={m}
                  index={i}
                  active={active}
                  totalCount={count}
                  angleStep={angle_step}
                  radius={radius}
                  onSelect={goTo}
                />
              ))}
            </div>
          </div>

          <InfoPanel
            member={member}
            active={active}
            transitioning={transitioning}
            teamData={team}
            onSelect={goTo}
          />
        </div>

        <NavControls
          active={active}
          totalCount={count}
          onPrev={prev}
          onNext={next}
          paused={paused}
        />
      </div>

      <GlobalStyles />
    </div>
  );
};

export default Team;
