import { useCallback, useEffect, useRef, useState } from "react";
import "./WIE.css";

import wieLogo from "./images/wie-logo.png";
import slide1 from "./images/slide1.jpg";
import slide2 from "./images/slide2.jpg";
import slide3 from "./images/slide3.jpg";
import slide4 from "./images/slide4.jpg";
import slide5 from "./images/slide5.jpg";

const FACE_COUNT = 5;
const ANGLE_STEP = 360 / FACE_COUNT;
const ROTATE_EVERY = 3600;
const BASELINE_WIDTH = 220; 

const SLIDES = [
  { src: slide1, alt: "IEEE WIE members group photo at an evening event" },
  {
    src: slide2,
    alt: "WIE Lumina speaker presenting a 5-step problem solving process to the audience",
  },
  {
    src: slide3,
    alt: "WIE Lumina speaker presenting a problem solving checklist to a full auditorium",
  },
  { src: slide4, alt: "WIE Lumina Decoding DSA session group photo on stage" },
  {
    src: slide5,
    alt: "WIE hydroponics and embedded systems project exhibition with live dashboard",
  },
];


const TAGLINE_WORDS = ["Achieve . . .", "Empower . . .", "Inspire . . ."];
const TAGLINE_TYPE_MS = 110;
const TAGLINE_DELETE_MS = 60;
const TAGLINE_HOLD_MS = 1500;
const TAGLINE_PAUSE_MS = 250;

function WIE() {
  const stageRef = useRef(null);
  const autoplayTimerRef = useRef(null);

  
  const [carousel, setCarousel] = useState({ currentIndex: 0, cumulativeAngle: 0 });

  
  const [geometry, setGeometry] = useState({ radius: 0, perspective: 0, scale: 1 });

  const [taglineText, setTaglineText] = useState("");
  const [taglineWordIndex, setTaglineWordIndex] = useState(0);
  const [taglinePhase, setTaglinePhase] = useState("typing");

  const goToNext = useCallback(() => {
    setCarousel((prev) => ({
      currentIndex: (prev.currentIndex + 1) % FACE_COUNT,
      cumulativeAngle: prev.cumulativeAngle - ANGLE_STEP,
    }));
  }, []);

  const goToIndex = useCallback((index) => {
    setCarousel((prev) => {
      const step = index - prev.currentIndex;
      return {
        currentIndex: index,
        cumulativeAngle: prev.cumulativeAngle - step * ANGLE_STEP,
      };
    });
  }, []);

  const handleDotClick = useCallback(
    (index) => {
      goToIndex(index);

  
      clearInterval(autoplayTimerRef.current);
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reducedMotion) {
        autoplayTimerRef.current = setInterval(goToNext, ROTATE_EVERY);
      }
    },
    [goToIndex, goToNext]
  );

  
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    function refreshGeometry() {
      const w = stage.offsetWidth;
      if (!w) return;
      const radius = w / (2 * Math.tan(Math.PI / FACE_COUNT));
      setGeometry({
        radius,
        perspective: w * 6.8,
        scale: w / BASELINE_WIDTH,
      });
    }

    refreshGeometry();

    window.addEventListener("resize", refreshGeometry);

    let resizeObserver;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(refreshGeometry);
      resizeObserver.observe(stage);
    }

    return () => {
      window.removeEventListener("resize", refreshGeometry);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setTaglineText(TAGLINE_WORDS[0]);
      return;
    }

    const currentWord = TAGLINE_WORDS[taglineWordIndex];
    const isTyping = taglinePhase === "typing";
    const delay = isTyping
      ? taglineText.length < currentWord.length
        ? TAGLINE_TYPE_MS
        : TAGLINE_HOLD_MS
      : taglineText.length > 0
      ? TAGLINE_DELETE_MS
      : TAGLINE_PAUSE_MS;

    const timeout = setTimeout(() => {
      if (isTyping) {
        if (taglineText.length < currentWord.length) {
          setTaglineText(currentWord.slice(0, taglineText.length + 1));
        } else {
          setTaglinePhase("deleting");
        }
      } else if (taglineText.length > 0) {
        setTaglineText(currentWord.slice(0, taglineText.length - 1));
      } else {
        setTaglineWordIndex((prev) => (prev + 1) % TAGLINE_WORDS.length);
        setTaglinePhase("typing");
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [taglineText, taglinePhase, taglineWordIndex]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const isPointerFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function startAutoplay() {
      if (reducedMotion) return;
      autoplayTimerRef.current = setInterval(goToNext, ROTATE_EVERY);
    }

    function stopAutoplay() {
      clearInterval(autoplayTimerRef.current);
    }

  
    const HOVER_SCALE = 1.035;
    let rafPending = false;
    function handleMouseMove(e) {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        const rect = stage.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        const maxTilt = 6;
        stage.style.transform = `rotateX(${-py * maxTilt}deg) rotateY(${px * maxTilt}deg) scale(${HOVER_SCALE})`;
        rafPending = false;
      });
    }

    function resetTilt() {
      stage.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    }

    function handleMouseEnter() {
      stopAutoplay();
    
      stage.style.transform = `rotateX(0deg) rotateY(0deg) scale(${HOVER_SCALE})`;
    }

    function handleMouseLeave() {
      resetTilt();
      startAutoplay();
    }

    startAutoplay();

    if (isPointerFine && !reducedMotion) {
      stage.addEventListener("mousemove", handleMouseMove);
      stage.addEventListener("mouseenter", handleMouseEnter);
      stage.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      stopAutoplay();
      if (isPointerFine && !reducedMotion) {
        stage.removeEventListener("mousemove", handleMouseMove);
        stage.removeEventListener("mouseenter", handleMouseEnter);
        stage.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [goToNext]);

  return (
    <section id="wie" className="wie-section">
      <div className="wie-card">
        <div className="wie-content">
          <div className="wie-title-row">
            <div className="wie-logo-wrap">
              <img className="wie-logo" src={wieLogo} alt="IEEE Women in Engineering Logo" />
            </div>
            <div className="wie-heading-group">
              <div className="wie-heading">Women in Engineering</div>
              <div className="wie-tagline" aria-hidden="true">
                <span className="wie-tagline-word">{taglineText}</span>
                <span className="wie-tagline-caret" />
              </div>
            </div>
          </div>
          <div className="wie-paragraph">
            The Women in Engineering (WIE) Affinity Group at IEEE SB JIIT is dedicated to
            promoting the involvement and success of women in engineering and technology.
            Through our various initiatives, events, and programs, we aim to encourage
            professional growth, networking, and collaboration among women engineers.
          </div>
          <ul className="wie-objectives">
            <li>Support the formation of new IEEE WIE Affinity Groups.</li>
            <li>Encourage and support ongoing WIE activities.</li>
            <li>Promote women&apos;s advancement to Senior Member and Fellow grades.</li>
            <li>Advocate for women in IEEE leadership and governance.</li>
            <li>Support career growth and leadership opportunities for women.</li>
          </ul>
        </div>

        <div className="wie-carousel-wrap">
          <div
            className="wie-stage"
            ref={stageRef}
            style={{
              perspective: `${geometry.perspective}px`,
              "--car-scale": geometry.scale,
            }}
          >
            <div
              className="wie-cube"
              style={{ transform: `rotateY(${carousel.cumulativeAngle}deg)` }}
            >
              {SLIDES.map((slide, i) => (
                <div
                  className={`wie-face wie-face-${i + 1}`}
                  key={slide.src}
                  style={{
                    transform: `rotateY(${i * ANGLE_STEP}deg) translateZ(${geometry.radius}px)`,
                  }}
                >
                  <img src={slide.src} alt={slide.alt} loading="lazy" />
                  <div className="wie-sheen" />
                  <div className="wie-fog" />
                </div>
              ))}
            </div>
          </div>

          <div className="wie-dots">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                className={`wie-dot${i === carousel.currentIndex ? " active" : ""}`}
                aria-label={`Show photo ${i + 1}`}
                onClick={() => handleDotClick(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WIE;