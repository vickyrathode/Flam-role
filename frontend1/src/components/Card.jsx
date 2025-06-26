import React, { useRef } from "react";

const Card = ({ children, style, ...props }) => {
  const cardRef = useRef(null);
  return (
    <div
      ref={cardRef}
      style={{
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 6px 32px 0 rgba(25,118,210,0.13)",
        padding: 32,
        margin: 16,
        border: "1.5px solid #e3eafc",
        transition:
          "transform 0.22s cubic-bezier(.4,2,.6,1), box-shadow 0.22s, background 0.3s, border 0.2s",
        willChange: "transform, box-shadow, background, border",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.045)";
        e.currentTarget.style.boxShadow = "0 12px 40px 0 rgba(25,118,210,0.18)";
        e.currentTarget.style.background =
          "linear-gradient(120deg, #e3f0ff 0%, #f8fafc 100%)";
        e.currentTarget.style.border = "1.5px solid #b6d0f7";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 6px 32px 0 rgba(25,118,210,0.13)";
        e.currentTarget.style.background = "#fff";
        e.currentTarget.style.border = "1.5px solid #e3eafc";
      }}
      {...props}
    >
      {/* Animated shine effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          background:
            "linear-gradient(120deg, rgba(255,255,255,0.0) 60%, rgba(255,255,255,0.18) 80%, rgba(255,255,255,0.0) 100%)",
          animation: "shine 2.5s infinite linear",
        }}
      />
      {children}
      {/* Keyframes for shine animation */}
      <style>{`
        @keyframes shine {
          0% { background-position: -200px 0; }
          100% { background-position: 200px 0; }
        }
      `}</style>
    </div>
  );
};

export default Card;
