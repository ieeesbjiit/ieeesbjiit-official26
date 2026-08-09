import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import "./events.css";
import events from "./events";
import PosterCard from "./PosterCard";

const Events = () => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  /* ========================= */
  /* NEXT */
  /* ========================= */

  const nextSlide = () => {
    setDirection(1);

    setActive(
      (prev) => (prev + 1) % events.length
    );
  };


  /* ========================= */
  /* PREVIOUS */
  /* ========================= */

  const prevSlide = () => {
    setDirection(-1);

    setActive(
      (prev) =>
        (prev - 1 + events.length) %
        events.length
    );
  };


  /* ========================= */
  /* AUTO SLIDE */
  /* ========================= */

  useEffect(() => {

    const interval = setInterval(() => {

      setDirection(1);

      setActive(
        (prev) =>
          (prev + 1) % events.length
      );

    }, 5000);

    return () => clearInterval(interval);

  }, []);


  /* ========================= */
  /* FIND POSITION */
  /* ========================= */

  const getOffset = (index) => {

    let offset =
      (index - active + events.length) %
      events.length;

    if (offset > events.length / 2) {
      offset -= events.length;
    }

    return offset;
  };


  return (
    <section id="events" className="events-section">

      {/* ========================= */}
      {/* HEADING */}
      {/* ========================= */}

      <div className="events-heading">

        <h2>
          EVENTS
        </h2>

        <p>
          Discover the experiences that define
          IEEE SB JIIT.
        </p>

      </div>


      {/* ========================= */}
      {/* CAROUSEL */}
      {/* ========================= */}

      <div className="events-wrapper">

        {/* LEFT BUTTON */}

        <button
          className="nav-btn left-btn"
          onClick={prevSlide}
          aria-label="Previous event"
        >
          &#10094;
        </button>


        {/* ========================= */}
        {/* ALL INSTAGRAM POSTS */}
        {/* ========================= */}

        <div className="instagram-carousel">

          {events.map((event, index) => {

            const offset = getOffset(index);

            let position;

            /* CENTER */

            if (offset === 0) {

              position = {
                x: 0,
                scale: 1,
                opacity: 1,
                zIndex: 5,
                filter: "brightness(1)",
              };

            }

            /* LEFT */

             else if (offset === -1) {

                position = {
                  x: -360,
                  scale: 0.78,
                  opacity: 0.58,
                  zIndex: 3,
                  filter: "brightness(0.62)",
                };

              }

            /* RIGHT */

            else if (offset === 1) {

              position = {
                x: 360,
                scale: 0.78,
                opacity: 0.58,
                zIndex: 3,
                filter:
                  "brightness(0.68)",
              };

            }

            /* HIDDEN */

           else {

              position = {
                x: offset < 0 ? -700 : 700,
                scale: 0.7,
                opacity: 0,
                zIndex: 1,
                filter: "brightness(0.5)",
              };

            }


            return (
              <motion.div
                key={event.title}
                className="carousel-post"
                animate={position}

                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >

                <PosterCard
                  event={event}
                  center={offset === 0}
                />

              </motion.div>
            );

          })}

        </div>


        {/* RIGHT BUTTON */}

        <button
          className="nav-btn right-btn"
          onClick={nextSlide}
          aria-label="Next event"
        >
          &#10095;
        </button>

      </div>


      {/* ========================= */}
      {/* DOTS */}
      {/* ========================= */}

      <div className="dots">

        {events.map((event, index) => (

          <button
            key={event.title || index}
            className={
              active === index
                ? "dot active-dot"
                : "dot"
            }

            onClick={() => {

              if (index === active) {
                return;
              }

              setDirection(
                index > active
                  ? 1
                  : -1
              );

              setActive(index);

            }}

            aria-label={`Go to ${event.title}`}
          />

        ))}

      </div>

    </section>
  );
};

export default Events;