const InfoPanel = ({
  member,
  active,
  transitioning,
  teamData,
  onSelect,
}) => {
  return (
    <div
      className="absolute left-1/2 pointer-events-none z-20"
      style={{
        bottom: 0,
        transform: "translateX(-50%)",
        width: "min(440px, 90vw)",
      }}
    >
      <div
        className="rounded-2xl p-6 text-center"
        style={{
          background: "rgba(2,18,45,0.85)",
          border: "1px solid rgba(56,189,248,0.2)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(56,189,248,0.1)",
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? "translateY(8px)" : "translateY(0)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        <p
          className="text-xs uppercase tracking-[0.25em] mb-2"
          style={{ color: "#38bdf8", fontFamily: '"Inter", sans-serif' }}
        >
          {member.role}
        </p>
        <h2
          className="text-2xl font-bold mb-3"
          style={{
            fontFamily: '"Outfit", sans-serif',
            color: "#e0f9ff",
            letterSpacing: "-0.02em",
          }}
        >
          {member.name}
        </h2>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "rgba(186,230,253,0.6)", fontSize: "13px" }}
        >
          {member.bio}
        </p>

        <div className="flex items-center justify-center gap-1.5 mt-5 flex-wrap max-w-xs mx-auto">
          {teamData.map((_, i) => (
            <button
              key={i}
              className="rounded-full transition-all duration-300 pointer-events-auto cursor-pointer"
              onClick={() => onSelect(i)}
              style={{
                width: i === active ? 20 : 5,
                height: 5,
                background:
                  i === active ? "#38bdf8" : "rgba(56,189,248,0.25)",
                boxShadow:
                  i === active ? "0 0 8px rgba(56,189,248,0.8)" : "none",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;