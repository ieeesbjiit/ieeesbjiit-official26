import { motion } from "framer-motion";

const PosterCard = ({ event, compact = false, center = false }) => {
  return (
    <motion.div
      className={`poster-card ${compact ? "compact" : "main"}`}
      whileHover={{
        scale: 1.02,
      }}
      transition={{
        duration: 0.3,
      }}
    >

      {/* Event information shown normally */}

      <div className="event-preview-content">

        <span className="preview-label">
          IEEE EVENT
        </span>

        <h2>{event.title}</h2>

        {!center && <p>{event.description}</p>}

        <span className="hover-text">
        </span>

      </div>


      {/* Poster appears on hover */}

      <img
        src={event.image}
        alt={event.title}
        className="hover-poster"
      />

    </motion.div>
  );
};

export default PosterCard;