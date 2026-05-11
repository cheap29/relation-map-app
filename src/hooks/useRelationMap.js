import { useMemo, useState, useEffect } from "react";

// デフォルトのサンプルデータ
const DEFAULT_DATA = {
  title: "桃太郎",
  nodes: [
    { id: "桃太郎", name: "桃太郎", weight: 10, desc: "鬼退治へ向かう主人公" },
    { id: "犬", name: "犬", weight: 6, desc: "きびだんごで仲間に" },
    { id: "猿", name: "猿", weight: 6, desc: "きびだんごで仲間に" },
    { id: "雉", name: "雉", weight: 6, desc: "きびだんごで仲間に" },
    { id: "鬼", name: "鬼", weight: 9, desc: "鬼ヶ島のならず者" },
  ],
  edges: [
    { source: "桃太郎", target: "犬", label: "仲間" },
    { source: "桃太郎", target: "猿", label: "仲間" },
    { source: "桃太郎", target: "雉", label: "仲間" },
    { source: "桃太郎", target: "鬼", label: "退治" },
  ],
};

// JSONデータを読み込む関数
const loadJSONData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("JSON読み込みエラー:", error);
    return DEFAULT_DATA;
  }
};

// テキスト形式のノードを解析（後方互換性のため残す）
function parseNodes(text) {
  const result = [];
  const lines = String(text || "").split(/\n+/);
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    const parts = line.split("|").map((s) => (s ?? "").trim());
    if (parts.length < 3) continue;
    const [name, weightStr, desc] = parts;
    if (!name || !weightStr || !desc) continue;
    const w = parseInt(weightStr, 10);
    const weight = Number.isFinite(w) ? Math.min(12, Math.max(1, w)) : 5;
    result.push({ id: name, name, weight, desc });
  }
  return result;
}

// テキスト形式のエッジを解析（後方互換性のため残す）
function parseEdges(text) {
  const edges = [];
  const lines = String(text || "").split(/\n+/);
  for (const raw of lines) {
    const t = raw.trim();
    if (!t) continue;
    const pieces = t.split("|").map((s) => (s ?? "").trim());
    if (!pieces[0]) continue;
    const labelRaw = pieces[1] || "";
    const m = pieces[0].match(/^(.+?)\s-\s(.+)$/);
    if (!m) continue;
    const source = m[1].trim();
    const target = m[2].trim();
    if (!source || !target) continue;
    edges.push({ source, target, label: labelRaw });
  }
  return edges;
}

function filterEdges(nodes, edges) {
  const set = new Set(nodes.map((n) => n.name));
  return edges.filter((e) => set.has(e.source) && set.has(e.target));
}

function buildAdjacency(nodes, edges) {
  const byName = Object.fromEntries(nodes.map((n) => [n.name, n]));
  const outgoing = {};
  const incoming = {};
  for (const e of edges) {
    (outgoing[e.source] = outgoing[e.source] || []).push(e);
    (incoming[e.target] = incoming[e.target] || []).push(e);
  }
  return { byName, outgoing, incoming };
}

function makeOption(nodes, edges, highlight) {
  const degree = {};
  for (const e of edges) {
    degree[e.source] = (degree[e.source] || 0) + 1;
    degree[e.target] = (degree[e.target] || 0) + 1;
  }
  const data = nodes.map((n) => {
    const deg = degree[n.name] || 0;
    const size = Math.min(120, 18 + n.weight * 4 + deg * 3);
    return {
      id: n.id,
      name: n.name,
      value: n.weight,
      symbolSize: size,
      itemStyle: {
        borderWidth: n.name === highlight ? 3 : 1,
        borderColor: n.name === highlight ? "#2563eb" : "#999",
      },
      label: { show: true, fontSize: Math.min(28, 10 + Math.round(size / 6)) },
    };
  });
  const links = edges.map((e) => ({
    source: e.source,
    target: e.target,
    label: { show: !!e.label, formatter: e.label, fontSize: 10 },
  }));
  return {
    tooltip: {
      trigger: "item",
      formatter: (p) =>
        p.dataType === "node"
          ? p.data.name
          : `${p.data.source} → ${p.data.target}${
              p.data.label ? `（${p.data.label}）` : ""
            }`,
    },
    series: [
      {
        type: "graph",
        layout: "circular",
        circular: { rotateLabel: false },
        roam: true,
        focusNodeAdjacency: true,
        data,
        links,
        label: { position: "inside" },
        lineStyle: { curveness: 0.05 },
      },
    ],
  };
}

export const useRelationMap = () => {
  const [title, setTitle] = useState(DEFAULT_DATA.title);
  const [nodes, setNodes] = useState(DEFAULT_DATA.nodes);
  const [edges, setEdges] = useState(DEFAULT_DATA.edges);
  const [selected, setSelected] = useState(null);
  const [testLog, setTestLog] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 初期化時にJSONファイルを読み込む
  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      try {
        const data = await loadJSONData("/sample-data.json");
        setTitle(data.title);
        setNodes(data.nodes);
        setEdges(data.edges);
      } catch (error) {
        console.error("初期データ読み込みエラー:", error);
      } finally {
        setIsLoading(false);
      }
    };
    initializeData();
  }, []);

  const graph = useMemo(() => buildAdjacency(nodes, edges), [nodes, edges]);
  const option = useMemo(
    () => makeOption(nodes, edges, selected?.name),
    [nodes, edges, selected]
  );

  const onEvents = {
    click: (p) => {
      if (p.dataType === "node") {
        const n = graph.byName[p.data.name];
        if (n) setSelected(n);
      }
    },
  };

  const loadSample = async () => {
    setIsLoading(true);
    try {
      const data = await loadJSONData("/sample-data.json");
      setTitle(data.title);
      setNodes(data.nodes);
      setEdges(data.edges);
      setSelected(null);
    } catch (error) {
      console.error("サンプルデータ読み込みエラー:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadJSONFile = async (file) => {
    setIsLoading(true);
    try {
      const text = await file.text();
      const data = JSON.parse(text);

      // データの検証
      if (
        !data.title ||
        !Array.isArray(data.nodes) ||
        !Array.isArray(data.edges)
      ) {
        throw new Error("無効なJSON形式です");
      }

      setTitle(data.title);
      setNodes(data.nodes);
      setEdges(data.edges);
      setSelected(null);
    } catch (error) {
      console.error("JSONファイル読み込みエラー:", error);
      alert("JSONファイルの読み込みに失敗しました: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify({ title, nodes, edges }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title || "network"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const runTests = () => {
    const cases = [];
    const n1 = parseNodes(
      "A | 10 | x\nB | 5 | y\n| 3 | z\nC | | z\nD | 12 | d"
    );
    const e1 = parseEdges("A - B | f\nA - C | g\nA -  | h\nX - Y | z");
    const f1 = filterEdges(n1, e1);
    cases.push(["nodes length", n1.length === 3]);
    cases.push(["edges parsed", e1.length === 2]);
    cases.push(["edges filtered", f1.length === 2]);

    const n2 = parseNodes(
      "太郎 | 1 | 主人公\n花子 | 6 | 幼馴染\n次郎 | 9 | ライバル"
    );
    const e2 = parseEdges("太郎 - 花子 | 幼馴染\n太郎 - 次郎 | ライバル");
    const f2 = filterEdges(n2, e2);
    const opt = makeOption(n2, f2, "太郎");
    cases.push([
      "option series graph",
      Array.isArray(opt.series) && opt.series[0]?.type === "graph",
    ]);

    setTestLog(
      cases.map(([name, ok]) => `${ok ? "OK" : "NG"} - ${name}`).join(" | ")
    );
  };

  return {
    // State
    title,
    setTitle,
    nodes,
    setNodes,
    edges,
    setEdges,
    selected,
    testLog,
    isLoading,

    // Computed values
    graph,
    option,

    // Functions
    onEvents,
    loadSample,
    loadJSONFile,
    exportJSON,
    runTests,
  };
};
