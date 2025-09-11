import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import NodeCard from "./NodeCard";

const NodeList = ({ nodes, onNodesChange }) => {
  const [editingNode, setEditingNode] = useState(null);
  const [newNode, setNewNode] = useState({ name: "", weight: 5, desc: "" });
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleNodeClick = (node) => {
    // グラフでの選択は親コンポーネントで処理
  };

  const handleEdit = (node) => {
    setEditingNode(node);
    setNewNode({ name: node.name, weight: node.weight, desc: node.desc });
  };

  const handleSave = () => {
    if (!newNode.name.trim()) return;

    if (editingNode) {
      // 既存ノードの更新
      const updatedNodes = nodes.map((node) =>
        node.id === editingNode.id
          ? {
              ...node,
              name: newNode.name,
              weight: newNode.weight,
              desc: newNode.desc,
            }
          : node
      );
      onNodesChange(updatedNodes);
      setEditingNode(null);
    } else {
      // 新規ノードの追加
      const newId = `node-${Date.now()}`;
      const updatedNodes = [
        ...nodes,
        {
          id: newId,
          name: newNode.name,
          weight: newNode.weight,
          desc: newNode.desc,
        },
      ];
      onNodesChange(updatedNodes);
      setIsAddingNew(false);
    }

    setNewNode({ name: "", weight: 5, desc: "" });
  };

  const handleDelete = (nodeToDelete) => {
    const updatedNodes = nodes.filter((node) => node.id !== nodeToDelete.id);
    onNodesChange(updatedNodes);
  };

  const handleCancel = () => {
    setEditingNode(null);
    setIsAddingNew(false);
    setNewNode({ name: "", weight: 5, desc: "" });
  };

  const renderEditForm = () => (
    <div
      style={{
        background: "#f3f4f6",
        border: "2px dashed #9ca3af",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "12px",
      }}
    >
      <div style={{ marginBottom: "12px" }}>
        <label
          style={{
            display: "block",
            fontSize: "12px",
            fontWeight: "600",
            marginBottom: "4px",
          }}
        >
          名前
        </label>
        <input
          type="text"
          value={newNode.name}
          onChange={(e) => setNewNode({ ...newNode, name: e.target.value })}
          placeholder="人物名"
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            fontSize: "14px",
          }}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label
          style={{
            display: "block",
            fontSize: "12px",
            fontWeight: "600",
            marginBottom: "4px",
          }}
        >
          重み (1-12)
        </label>
        <input
          type="number"
          min="1"
          max="12"
          value={newNode.weight}
          onChange={(e) =>
            setNewNode({ ...newNode, weight: parseInt(e.target.value) || 1 })
          }
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            fontSize: "14px",
          }}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label
          style={{
            display: "block",
            fontSize: "12px",
            fontWeight: "600",
            marginBottom: "4px",
          }}
        >
          説明
        </label>
        <textarea
          value={newNode.desc}
          onChange={(e) => setNewNode({ ...newNode, desc: e.target.value })}
          placeholder="人物の説明"
          rows="3"
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            fontSize: "14px",
            resize: "vertical",
          }}
        />
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={handleSave}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "6px 12px",
            background: "#10b981",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          <FaSave />
          保存
        </button>
        <button
          onClick={handleCancel}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "6px 12px",
            background: "#6b7280",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          <FaTimes />
          キャンセル
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        <div style={{ fontSize: "12", fontWeight: "600" }}>人物一覧</div>
        <button
          onClick={() => setIsAddingNew(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "6px 12px",
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "12px",
            cursor: "pointer",
            display: "none",
          }}
        >
          <FaPlus />
          追加
        </button>
      </div>

      {isAddingNew && renderEditForm()}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "12px",
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        {nodes.map((node) => (
          <div key={node.id} style={{ position: "relative" }}>
            <NodeCard
              node={node}
              isSelected={false}
              onClick={() => handleNodeClick(node)}
            />
            <div
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                display: "flex",
                gap: "4px",
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(node);
                }}
                style={{
                  padding: "4px",
                  background: "rgba(255, 255, 255, 0.9)",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "10px",
                  color: "#6b7280",
                }}
              >
                <FaEdit />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(node);
                }}
                style={{
                  padding: "4px",
                  background: "rgba(255, 255, 255, 0.9)",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "10px",
                  color: "#ef4444",
                }}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingNode && renderEditForm()}
    </div>
  );
};

export default NodeList;
