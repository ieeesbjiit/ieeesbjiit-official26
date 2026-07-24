const CarouselCard = ({
  member,
  index,
  active,
  totalCount,
  angleStep,
  radius,
  onSelect,
}) => {
  const angle = index * angleStep;
  const diff = (index - active + totalCount) % totalCount;
  const isActive = index === active;
  const isNear = diff <= 2 || diff >= totalCount - 2;
  const distFromActive = Math.min(diff, totalCount - diff);

  const opacity = isActive
    ? 1
    : distFromActive <= 3
      ? 0.65 - distFromActive * 0.08
      : 0.28;

  const scale = isActive ? 1.2 : isNear ? 0.88 : 0.72;

  return (
    // Outer: handles 3D positioning on the ring
    <div
    className="absolute cursor-pointer transform-3d "
      onClick={() => onSelect(index)}
      style={{
        width: 150,
        height: 200,
        left: "-75px",    // 🔴 shifts card so its center is at rotation origin
        top: "-100px",    // 🔴 shifts card so its center is at rotation origin
        transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
        transition: "opacity 0.5s",
      }}
    >
      {/* Inner: handles scale independently, always around card's own center */}
      <div
        className="w-full h-full rounded-xl overflow-hidden relative"
        style={{
          opacity,
          transform: `scale(${scale})`,
          transformOrigin: "center center",  // 🔴 explicit center anchor
          transition:
            "transform 0.7s cubic-bezier(0.22,1,0.36,1), opacity 0.5s, box-shadow 0.5s",
          boxShadow: isActive
            ? "0 0 0 2px rgba(56,189,248,0.8), 0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(14,116,144,0.4)"
            : "0 8px 30px rgba(0,0,0,0.5)",
          border: isActive
            ? "2px solid rgba(56,189,248,0.7)"
            : "1px solid rgba(56,189,248,0.08)",
        }}
      >
        <img
          src={member.img}
          alt={member.name}
          className="w-full h-full object-cover"
          style={{
            filter: isActive
              ? "brightness(0.95) saturate(1.1)"
              : "brightness(0.55) saturate(0.7)",
            transform: isActive ? "scale(1.2)" : "scale(1)",    // 🔴 ADDED
            transformOrigin: "center center",                     // 🔴 ADDED
            transition: isActive
                      ? "transform 1s cubic-bezier(0.22,1,0.36,1) 0.4s, filter 0.5s"
                      : "transform 0.3s ease, filter 0.5s",
          }}
        />
        {!isActive && (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(2,13,34,0.7) 0%, transparent 60%)",
            }}
          />
        )}
        {isActive && (
          <div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(56,189,248,0.12) 0%, transparent 60%)",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CarouselCard;