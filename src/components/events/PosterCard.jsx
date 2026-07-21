import { motion } from "framer-motion";

const PosterCard = ({ event = false }) => {
  return (
    <motion.div
      className={"poster-card"}
      style={{ "--accent": event.accent }}
      whileHover={{
        scale:1.02,
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

        <h1>
          {event.title}
        </h1>

        <p>
          {event.description}
        </p>

        <div className="poster-footer">
  <span>Explore Event</span>
  <div className="poster-line"></div>
</div>

      </div>

    </motion.div>
  );
};

export default PosterCard;