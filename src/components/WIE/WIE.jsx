import { useCallback, useEffect, useRef, useState } from "react";
import "./wie.css";

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
  { src: slide1 },
  { src: slide2 },
  { src: slide3 },
  { src: slide4 },
  { src: slide5 },
];

function WIE() {
  const stageRef = useRef(null);
  const autoplayTimerRef = useRef(null);

  const [carousel, setCarousel] = useState({ currentIndex: 0, cumulativeAngle: 0 });

 
  const [geometry, setGeometry] = useState({ radius: 0, perspective: 0, scale: 1 });

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

 
    let rafPending = false;
    function handleMouseMove(e) {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        const rect = stage.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        const maxTilt = 6;
        stage.style.transform = `rotateX(${-py * maxTilt}deg) rotateY(${px * maxTilt}deg)`;
        rafPending = false;
      });
    }

    function resetTilt() {
      stage.style.transform = "rotateX(0deg) rotateY(0deg)";
    }

    function handleMouseEnter() {
      stopAutoplay();
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
          <img className="wie-logo" src={wieLogo} alt="IEEE Women in Engineering Logo" />
          <div className="wie-heading">Women in Engineering</div>
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
