import React from "react";

const Button = ({ children, onClick, style, ...props }) => (
  <button
    onClick={onClick}
    style={{
      background: "#1976d2",
      color: "#fff",
      border: "none",
      borderRadius: 8,
      padding: "10px 20px",
      fontWeight: 600,
      cursor: "pointer",
      margin: 4,
      fontSize: 15,
      boxShadow: "0 2px 8px rgba(25,118,210,0.08)",
      transition: "background 0.2s, transform 0.15s",
      outline: "none",
      ...style,
    }}
    onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
    onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    {...props}
  >
    {children}
  </button>
);

export default Button;
