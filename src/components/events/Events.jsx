import { useState, useEffect } from "react";

import { AnimatePresence, motion } from "framer-motion";
import {
  FaRegHeart,
  FaHeart,
  FaRegComment,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";

import "./events.css";
import events from "./events";
import PosterCard from "./PosterCard";
import ieeeLogo from "../../assets/ieee_white.png";

const Events = () => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
const [liked, setLiked] = useState(false);
const [saved, setSaved] = useState(false);
  const nextSlide = () => {
    setDirection(1);
    setActive((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setActive(
      (prev) =>
        (prev - 1 + events.length) %
        events.length
    );
  };
useEffect(() => {
  const interval = setInterval(() => {
    nextSlide();
  }, 5000);

  return () => clearInterval(interval);
}, [active]);

  const previous =
    events[
      (active - 1 + events.length) %
        events.length
    ];

  const current = events[active];

  const next =
    events[
      (active + 1) %
        events.length
    ];

  return (
    <section id="events" className="events-section">

      <div className="events-heading">

        <h2>EVENTS</h2>

        <p>
          Discover the experiences that define
          IEEE SB JIIT.
        </p>

      </div>

      <div className="events-wrapper">

        {/* LEFT BUTTON */}

        <button
          className="nav-btn left-btn"
          onClick={prevSlide}
        >
          &#10094;
        </button>

        {/* LEFT POSTER */}

        <motion.div 
          className="preview-card left-preview"
          layout
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 18,
          }}
        >

          <PosterCard
            event={previous}
            compact
          />

        </motion.div>

        {/* INSTAGRAM */}

        <div className="instagram-frame">

          {/* HEADER */}

          <div className="frame-header">

            <div className="profile">

              <img
  src={ieeeLogo}
  alt="IEEE SB JIIT"
  className="profile-pic"
/>

              <div className="profile-info">

                <h4>IEEE SB JIIT</h4>

                <span>@ieeesbjiit</span>

              </div>

            </div>

            <span className="menu">
              •••
            </span>

          </div>

          {/* POSTER WINDOW */}

          <div className="poster-window">

            <AnimatePresence
              mode="wait"
              initial={false}
            >

              <motion.div custom={direction}
                key={current.title}
                className="center-poster"
                initial={(direction) => ({
                  x: direction > 0 ? 250 : -250,
                  opacity: 0,
                })}

                animate={{
                  x: 0,
                  opacity: 1,
                }}

                exit={(direction) => ({
                  x: direction > 0 ? -250 : 250,
                  opacity: 0,
                })}
               transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              >

                <PosterCard
                  event={current}
                  compact
                />

              </motion.div>

            </AnimatePresence>

          </div>

                    {/* FOOTER */}

          <div className="frame-footer">

            <div className="footer-icons">

              {liked ? (
  <FaHeart
    onClick={() => setLiked(false)}
    style={{
      color: "#ff3040",
      cursor: "pointer",
      transition: "0.3s ease",
      transform: "scale(1.15)"
    }}
  />
) : (
  <FaRegHeart
    onClick={() => setLiked(true)}
    style={{
      color: "white",
      cursor: "pointer",
      transition: "0.3s ease"
    }}
  />
)}

              <FaRegComment />

              <FiSend />

            </div>
            {saved ? (
              <FaBookmark
                onClick={() => setSaved(false)}
                style={{
                  color: "white",
                  cursor: "pointer",
                  transition: "0.3s ease",
                }}
              />
            ) : (
              <FaRegBookmark
                onClick={() => setSaved(true)}
                style={{
                  color: "white",
                  cursor: "pointer",
                  transition: "0.3s ease",
                }}
              />
            )}

          </div>

          <div className="post-caption">

          <strong>{current.title}</strong>

          <span>
            {current.description}
          </span>

        </div>

        </div>

        {/* RIGHT POSTER */}

        <motion.div
          className="preview-card right-preview"
          layout
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 18,
          }}
        >

          <PosterCard
            event={next}
            compact
          />

        </motion.div>

        {/* RIGHT BUTTON */}

        <button
          className="nav-btn right-btn"
          onClick={nextSlide}
        >
          &#10095;
        </button>

      </div>

      {/* DOTS */}

      <div className="dots">

        {events.map((_, index) => (

          <button
            key={index}
            onClick={() => setActive(index)}
            className={
              active === index
                ? "dot active-dot"
                : "dot"
            }
          />

        ))}

      </div>

    </section>
  );
};

export default Events;