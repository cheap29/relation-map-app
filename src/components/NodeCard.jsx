import React from "react";
import { FaUser, FaStar } from "react-icons/fa";

const StarRating = ({ rating, maxRating = 12 }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FaStar key={i} style={{ color: "#fbbf24", fontSize: "14px" }} />
    );
  }

  if (hasHalfStar) {
    stars.push(
      <FaStar key="half" style={{ color: "#d1d5db", fontSize: "14px" }} />
    );
  }

  const remainingStars = maxRating - Math.ceil(rating);
  for (let i = 0; i < remainingStars; i++) {
    stars.push(
      <FaStar
        key={`empty-${i}`}
        style={{ color: "#d1d5db", fontSize: "14px" }}
      />
    );
  }

  return <div style={{ display: "flex", gap: "2px" }}>{stars}</div>;
};

const NodeCard = ({ node, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        background: isSelected ? "#eff6ff" : "#ffffff",
        border: isSelected ? "2px solid #3b82f6" : "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "12px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: isSelected
          ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          : "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.target.style.background = "#f9fafb";
          e.target.style.borderColor = "#d1d5db";
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.target.style.background = "#ffffff";
          e.target.style.borderColor = "#e5e7eb";
        }
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "8px",
        }}
      >
        <FaUser style={{ color: "#6b7280", fontSize: "16px" }} />
        <span
          style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#111827",
          }}
        >
          {node.name}
        </span>
      </div>

      <div style={{ marginBottom: "8px" }}>
        <StarRating rating={node.weight} />
      </div>

      <div
        style={{
          fontSize: "12px",
          color: "#6b7280",
          lineHeight: "1.4",
          whiteSpace: "pre-wrap",
        }}
      >
        {node.desc}
      </div>
    </div>
  );
};

export default NodeCard;
