import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { images } from "../data/images";
import "./StackedDeckGallery.css";

const META = {
  "xenith-1": { title: "Xenith '26 Launch", meta: "April · Social" },
  "xenith-2": { title: "Xenith '26 Team Photo", meta: "April · Social" },
  "computer-lab": { title: "Computer Lab Session", meta: "Sept · Workshop" },
  workshop: { title: "Hands-on Workshop", meta: "Sept · Workshop" },
  "lecture-hall": { title: "Guest Lecture", meta: "Jan · Talk" },
  "xenith-3": { title: "Team Photo — Amphitheatre", meta: "April · Social" },
  "xenith-4": { title: "Team Photo — Stage", meta: "April · Social" },
  "xenith-5": { title: "Xenith '26 Stage Decor", meta: "April · Symposium" },
};

const defaultPhotos = images.map((image) => ({
  id: image.id,
  src: image.src,
  title: META[image.id]?.title ?? image.alt,
  meta: META[image.id]?.meta ?? "",
}));

const FOLLOW_MAX = 16;
const PAN_MAX = 22;
const IMG_SCALE = 1.12;

function circularDistance(i, active, n) {
  let d = i - active;
  if (d > n / 2) d -= n;
  if (d < -n / 2) d += n;
  return d;
}

function resetCardTilt(card) {
  if (!card) return;
  const follow = card.querySelector(".card-follow");
  const img = card.querySelector("img");
  if (follow) follow.style.transform = "translate(0px, 0px)";
  if (img) img.style.transform = "scale(1) translate(0px, 0px)";
}

function StackedDeckGallery({ photos = defaultPhotos }) {
  const total = photos.length;
  const half = Math.ceil(total / 2);

  const [activeIndex, setActiveIndex] = useState(0);

  const deckStageRef = useRef(null);
  const cardRefs = useRef([]);
  const railRefs = useRef([]);
  const prevActiveIndex = useRef(0);
  const wheelLockedRef = useRef(false);

  // Stable per-card float animation params, generated once
  const floatParamsRef = useRef(
    photos.map(() => ({
      delay: `${(Math.random() * 3).toFixed(2)}s`,
      dur: `${(3.2 + Math.random() * 2.6).toFixed(2)}s`,
      amp: `${(Math.random() < 0.5 ? -1 : 1) * (6 + Math.random() * 8)}px`,
    }))
  );

  const setActive = useCallback(
    (i) => {
      setActiveIndex(((i % total) + total) % total);
    },
    [total]
  );

  const layout = useCallback(() => {
    const isMobile = window.innerWidth <= 900;
    const xStep = isMobile ? 22 : 32;
    const yStep = 6;
    const rotStep = isMobile ? 5 : 6;
    const scaleStep = 0.06;
    const maxVisibleDist = 3;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const dist = circularDistance(i, activeIndex, total);
      const adist = Math.abs(dist);

      card.classList.toggle("active", dist === 0);

      if (adist > maxVisibleDist) {
        card.style.opacity = "0";
        card.style.transform = `translate(${dist * xStep}px, ${adist * yStep}px) rotate(${dist * rotStep}deg) scale(0.7)`;
        card.style.zIndex = "0";
        card.style.filter = "brightness(0.4)";
        card.style.pointerEvents = "none";
        return;
      }

      const scale = 1 - adist * scaleStep;
      const brightness = 1 - adist * 0.22;
      const opacity = 1 - adist * 0.22;

      card.style.transform = `translate(${dist * xStep}px, ${adist * yStep}px) rotate(${dist * rotStep}deg) scale(${scale})`;
      card.style.opacity = String(Math.max(opacity, 0.15));
      card.style.filter = `brightness(${Math.max(brightness, 0.35)})`;
      card.style.zIndex = dist === 0 ? "200" : String(100 - adist);
      card.style.pointerEvents = "auto";
    });

    railRefs.current.forEach((item, i) => {
      if (item) item.classList.toggle("active", i === activeIndex);
    });
  }, [activeIndex, total]);

  // Re-run layout whenever the active card changes, and reset the tilt
  // of whichever card was previously active.
  useLayoutEffect(() => {
    layout();
    if (prevActiveIndex.current !== activeIndex) {
      resetCardTilt(cardRefs.current[prevActiveIndex.current]);
    }
    prevActiveIndex.current = activeIndex;
  }, [activeIndex, layout]);

  // Re-layout on resize (fan spacing differs on mobile).
  useEffect(() => {
    window.addEventListener("resize", layout);
    return () => window.removeEventListener("resize", layout);
  }, [layout]);

  // Arrow-key navigation.
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "ArrowRight") setActive(activeIndex + 1);
      if (e.key === "ArrowLeft") setActive(activeIndex - 1);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, setActive]);

  // Wheel-to-cycle, scoped to hovering an actual card (native listener,
  // since preventDefault needs a non-passive listener React can't give us
  // via onWheel).
  useEffect(() => {
    const deckStage = deckStageRef.current;
    if (!deckStage) return;

    function handleWheel(e) {
      if (!e.target.closest(".card")) return;
      e.preventDefault();
      if (wheelLockedRef.current) return;
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 8) return;
      setActive(activeIndex + (delta > 0 ? 1 : -1));
      wheelLockedRef.current = true;
      setTimeout(() => {
        wheelLockedRef.current = false;
      }, 350);
    }

    deckStage.addEventListener("wheel", handleWheel, { passive: false });
    return () => deckStage.removeEventListener("wheel", handleWheel);
  }, [activeIndex, setActive]);

  // Cursor pan/follow on the active card only.
  const handleMouseMove = useCallback(
    (e) => {
      const activeCard = cardRefs.current[activeIndex];
      if (!activeCard) return;
      const rect = activeCard.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!inside) {
        resetCardTilt(activeCard);
        return;
      }

      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      const follow = activeCard.querySelector(".card-follow");
      const img = activeCard.querySelector("img");
      follow.style.transform = `translate(${relX * FOLLOW_MAX}px, ${relY * FOLLOW_MAX}px)`;
      img.style.transform = `scale(${IMG_SCALE}) translate(${-relX * PAN_MAX}px, ${-relY * PAN_MAX}px)`;
    },
    [activeIndex]
  );

  const handleMouseLeave = useCallback(() => {
    resetCardTilt(cardRefs.current[activeIndex]);
  }, [activeIndex]);

  return (
    <div  id= "gallery" className="deck-gallery-wrap">
      <div className="masthead">
        <div className="masthead-top">
          <div>
            <p className="masthead-eyebrow">IEEE Student Chapter</p>
            <h1 className="masthead-title">Gallery</h1>
          </div>
          <p className="masthead-count">
            {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>
        <div className="masthead-rule" />
      </div>

      <div className="gallery">
        <div className="rail-col">
          {photos.slice(0, half).map((photo, i) => (
            <RailItem
              key={photo.id ?? i}
              photo={photo}
              index={i}
              onClick={() => setActive(i)}
              itemRef={(el) => (railRefs.current[i] = el)}
            />
          ))}
        </div>

        <div
          className="deck-stage"
          ref={deckStageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="deck-mask-top" />
          {photos.map((photo, i) => (
            <Card
              key={photo.id ?? i}
              photo={photo}
              index={i}
              floatParams={floatParamsRef.current[i]}
              onClick={() => setActive(i)}
              cardRef={(el) => (cardRefs.current[i] = el)}
            />
          ))}
        </div>

        <div className="rail-col">
          {photos.slice(half).map((photo, i) => {
            const realIndex = half + i;
            return (
              <RailItem
                key={photo.id ?? realIndex}
                photo={photo}
                index={realIndex}
                onClick={() => setActive(realIndex)}
                itemRef={(el) => (railRefs.current[realIndex] = el)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Card({ photo, index, floatParams, onClick, cardRef }) {
  return (
    <div
      className="card"
      ref={cardRef}
      onClick={onClick}
      style={{
        "--float-delay": floatParams.delay,
        "--float-dur": floatParams.dur,
        "--float-amp": floatParams.amp,
      }}
    >
      <div className="card-follow">
        <div className="card-inner">
          <img src={photo.src} alt={photo.title} loading="lazy" />
          <span className="idx">{String(index + 1).padStart(2, "0")}</span>
          <div className="overlay">
            <p className="cap-title">{photo.title}</p>
            <p className="cap-meta">{photo.meta}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RailItem({ photo, index, onClick, itemRef }) {
  return (
    <div className="rail-item" ref={itemRef} onClick={onClick}>
      <img className="rail-thumb" src={photo.src} alt={photo.title} loading="lazy" />
      <div className="rail-info">
        <p className="rail-num">{String(index + 1).padStart(2, "0")}</p>
        <p className="rail-title">{photo.title}</p>
        <p className="rail-meta">{photo.meta}</p>
      </div>
    </div>
  );
}

export default StackedDeckGallery;
