import React from "react";

const Badge = ({ label, color = "#1976d2", style }) => (
  <span
    style={{
      display: "inline-block",
      background: color,
      color: "#fff",
      borderRadius: 12,
      padding: "2px 10px",
      fontSize: 12,
      fontWeight: 500,
      ...style,
    }}
  >
    {label}
  </span>
);

export default Badge;
