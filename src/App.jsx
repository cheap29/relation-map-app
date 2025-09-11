import React from "react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { GraphChart } from "echarts/charts";
import { TooltipComponent } from "echarts/components";
import { SVGRenderer } from "echarts/renderers";
import { useRelationMap } from "./hooks/useRelationMap";
import NodeList from "./components/NodeList";
import RelationshipDisplay from "./components/RelationshipDisplay";

echarts.use([GraphChart, TooltipComponent, SVGRenderer]);

export default function App() {
  const {
    title,
    setTitle,
    nodes,
    setNodes,
    edgeText,
    setEdgeText,
    selected,
    testLog,
    edges,
    graph,
    option,
    onEvents,
    loadSample,
    exportJSON,
    runTests,
  } = useRelationMap();

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#f8fafc",
        color: "#0f172a",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 24px" }}>
        <div
          style={{
            marginBottom: 24,
            display: "flex",
            gap: 16,
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 800,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                margin: 0,
              }}
            >
              相関図自動生成サービス
            </h1>
            <p
              style={{
                fontSize: 14,
                color: "#64748b",
                margin: "4px 0 0 0",
                fontWeight: 500,
              }}
            >
              人物関係を視覚的に表現するツール
            </p>
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div style={{ position: "relative" }}>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="作品タイトルを入力"
                style={{
                  padding: "10px 16px",
                  border: "2px solid #e2e8f0",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: "500",
                  background: "#ffffff",
                  minWidth: "200px",
                  transition: "all 0.2s ease",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#3b82f6";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(59, 130, 246, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
                }}
              />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={loadSample}
                style={{
                  padding: "10px 16px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-1px)";
                  e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                }}
              >
                サンプル読込
              </button>
              <button
                onClick={exportJSON}
                style={{
                  padding: "10px 16px",
                  background:
                    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-1px)";
                  e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                }}
              >
                JSON書出し
              </button>
              <button
                onClick={runTests}
                style={{
                  padding: "10px 16px",
                  background:
                    "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-1px)";
                  e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                }}
              >
                自己テスト
              </button>
            </div>
          </div>
        </div>

        {testLog && (
          <div style={{ marginBottom: 8, fontSize: 12 }}>
            自己テスト: {testLog}
          </div>
        )}

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16 }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: 16,
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                border: "1px solid #f1f5f9",
              }}
            >
              <NodeList nodes={nodes} onNodesChange={setNodes} />
            </div>

            <div>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: 16,
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  border: "1px solid #f1f5f9",
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#1e293b",
                    marginBottom: 12,
                  }}
                >
                  交流関係
                </div>
                <RelationshipDisplay selected={selected} graph={graph} />
              </div>
            </div>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: 16,
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              border: "1px solid #f1f5f9",
            }}
          >
            <div
              style={{
                height: 700,
                borderRadius: 12,
                overflow: "hidden",
                background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
              }}
            >
              <ReactEChartsCore
                echarts={echarts}
                option={option || {}}
                notMerge={true}
                lazyUpdate={true}
                opts={{ renderer: "svg" }}
                style={{ height: "100%", width: "100%" }}
                onEvents={onEvents}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
