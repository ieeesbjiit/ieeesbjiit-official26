const Background = () => {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 110% 55% at 50% 0%, #0b3d5e 0%, #062038 30%, transparent 65%),
            radial-gradient(ellipse 70% 60% at 20% 80%, rgba(5,45,85,0.6) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 85% 70%, rgba(3,30,70,0.5) 0%, transparent 55%),
            linear-gradient(180deg, #031525 0%, #020d22 100%)
          `,
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border"
            style={{
              width: `${200 + i * 160}px`,
              height: `${200 + i * 160}px`,
              borderColor: `rgba(56,189,248,${0.1 - i * 0.015})`,
              animation: `ripple 6s ease-out infinite`,
              animationDelay: `${i * 1}s`,
            }}
          />
        ))}
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(56,189,248,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.025) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 2,
            height: 2,
            left: `${8 + i * 5.5}%`,
            top: `${10 + ((i * 37) % 80)}%`,
            background: i % 2 === 0 ? "#38bdf8" : "#7dd3fc",
            opacity: 0.3 + (i % 4) * 0.1,
            animation: `particle ${5 + (i % 4)}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
    </>
  );
};

export default Background;