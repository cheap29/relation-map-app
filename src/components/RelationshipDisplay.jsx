import React from "react";
import { FaArrowRight, FaArrowLeft, FaUser, FaUsers } from "react-icons/fa";

const RelationshipItem = ({ relationship, type, isOutgoing }) => {
  const { source, target, label } = relationship;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 12px",
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        marginBottom: "6px",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.target.style.background = "#f1f5f9";
        e.target.style.borderColor = "#cbd5e1";
      }}
      onMouseLeave={(e) => {
        e.target.style.background = "#f8fafc";
        e.target.style.borderColor = "#e2e8f0";
      }}
    >
      {isOutgoing ? (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "12px",
              fontWeight: "600",
              color: "#475569",
            }}
          >
            <FaUser style={{ fontSize: "10px" }} />
            {source}
          </div>
          <FaArrowRight style={{ color: "#3b82f6", fontSize: "12px" }} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "12px",
              fontWeight: "600",
              color: "#1e293b",
            }}
          >
            <FaUser style={{ fontSize: "10px" }} />
            {target}
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "12px",
              fontWeight: "600",
              color: "#1e293b",
            }}
          >
            <FaUser style={{ fontSize: "10px" }} />
            {source}
          </div>
          <FaArrowLeft style={{ color: "#10b981", fontSize: "12px" }} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "12px",
              fontWeight: "600",
              color: "#475569",
            }}
          >
            <FaUser style={{ fontSize: "10px" }} />
            {target}
          </div>
        </>
      )}

      {label && (
        <div
          style={{
            marginLeft: "auto",
            padding: "2px 8px",
            background: isOutgoing ? "#dbeafe" : "#dcfce7",
            color: isOutgoing ? "#1e40af" : "#166534",
            borderRadius: "12px",
            fontSize: "10px",
            fontWeight: "500",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};

const RelationshipSection = ({
  title,
  relationships,
  type,
  isOutgoing,
  icon,
}) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "8px",
          fontSize: "12px",
          fontWeight: "600",
          color: "#64748b",
        }}
      >
        {icon}
        {title}
      </div>

      <div>
        {relationships.length > 0 ? (
          relationships.map((relationship, index) => (
            <RelationshipItem
              key={`${type}-${index}`}
              relationship={relationship}
              type={type}
              isOutgoing={isOutgoing}
            />
          ))
        ) : (
          <div
            style={{
              padding: "12px",
              textAlign: "center",
              color: "#94a3b8",
              fontSize: "11px",
              fontStyle: "italic",
              background: "#f8fafc",
              border: "1px dashed #cbd5e1",
              borderRadius: "8px",
            }}
          >
            関係なし
          </div>
        )}
      </div>
    </div>
  );
};

const RelationshipDisplay = ({ selected, graph }) => {
  if (!selected) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "220px",
          color: "#94a3b8",
          fontSize: "12px",
        }}
      >
        <FaUsers style={{ fontSize: "24px", marginBottom: "8px" }} />
        <div>人物を選択すると</div>
        <div>交流関係が表示されます</div>
      </div>
    );
  }

  const outgoingRelationships = graph.outgoing[selected.name] || [];
  const incomingRelationships = graph.incoming[selected.name] || [];

  return (
    <div style={{ height: "220px", overflowY: "auto" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "16px",
          paddingBottom: "8px",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <FaUser style={{ color: "#3b82f6", fontSize: "16px" }} />
        <span
          style={{
            fontSize: "14px",
            fontWeight: "700",
            color: "#1e293b",
          }}
        >
          {selected.name}
        </span>
        <span
          style={{
            fontSize: "10px",
            color: "#64748b",
            background: "#f1f5f9",
            padding: "2px 6px",
            borderRadius: "8px",
          }}
        >
          の交流関係
        </span>
      </div>

      <RelationshipSection
        title="出ていく関係"
        relationships={outgoingRelationships}
        type="outgoing"
        isOutgoing={true}
        icon={<FaArrowRight style={{ color: "#3b82f6", fontSize: "10px" }} />}
      />

      <RelationshipSection
        title="入ってくる関係"
        relationships={incomingRelationships}
        type="incoming"
        isOutgoing={false}
        icon={<FaArrowLeft style={{ color: "#10b981", fontSize: "10px" }} />}
      />
    </div>
  );
};

export default RelationshipDisplay;
