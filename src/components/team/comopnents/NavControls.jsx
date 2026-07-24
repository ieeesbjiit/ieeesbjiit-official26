const NavControls = ({ active, totalCount, onPrev, onNext, paused }) => {
  return (
    <>
      <div
        className="flex items-center gap-8 mt-4"
        style={{ animation: "fadeUp 1s ease 0.4s both" }}
      >
        <button
          onClick={onPrev}
          className="flex items-center justify-center rounded-full transition-all duration-200"
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(56,189,248,0.15)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(56,189,248,0.07)")
          }
          style={{
            width: 48,
            height: 48,
            background: "rgba(56,189,248,0.07)",
            border: "1px solid rgba(56,189,248,0.2)",
            color: "#7dd3fc",
            cursor: "pointer",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <span
          className="font-mono text-sm"
          style={{
            color: "rgba(125,211,252,0.5)",
            letterSpacing: "0.1em",
          }}
        >
          <span style={{ color: "#7dd3fc" }}>
            {String(active + 1).padStart(2, "0")}
          </span>
          {" / "}
          {String(totalCount).padStart(2, "0")}
        </span>

        <button
          onClick={onNext}
          className="flex items-center justify-center rounded-full transition-all duration-200"
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(56,189,248,0.15)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(56,189,248,0.07)")
          }
          style={{
            width: 48,
            height: 48,
            background: "rgba(56,189,248,0.07)",
            border: "1px solid rgba(56,189,248,0.2)",
            color: "#7dd3fc",
            cursor: "pointer",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <p
        className="mt-4 text-xs uppercase tracking-widest"
        style={{
          color: "rgba(56,189,248,0.2)",
          animation: "fadeUp 1s ease 0.6s both",
        }}
      >
        {paused ? "Paused" : "Auto-rotating"} · Click any card to focus
      </p>
    </>
  );
};

export default NavControls;