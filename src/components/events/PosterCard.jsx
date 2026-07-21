import { motion } from "framer-motion";

const PosterCard = ({ event, compact = false }) => {
  return (
    <motion.div
      className={`poster-card ${compact ? "compact" : "main"}`}
      style={{ "--accent": event.accent }}
      whileHover={{
        scale: compact ? 0.96 : 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 18,
      }}
    >
      <div className="poster-glow"></div>

      <div className="poster-inner">

        <span className="poster-tag">
          IEEE SB JIIT
        </span>

        <h1 className={compact ? "compact-title" : ""}>
          {event.title}
        </h1>

        <p className={compact ? "compact-description" : ""}>
          {event.description}
        </p>

        {!compact && (
          <div className="poster-footer">

            <span>
              Explore Event
            </span>

            <div className="poster-line"></div>

          </div>
        )}

      </div>

    </motion.div>
  );
};

export default PosterCard;