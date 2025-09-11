# 相関図自動生成サービス

最小の Vite + React 構成で、人物と関係を入力すると相関図（ECharts Graph）を描画します。

## セットアップ

```bash
npm i
npm run dev
```

- ブラウザで `http://localhost:5173` を開きます。

## 記法

- 人物: `名前 | 重み1-12 | 説明`
- 関係: `A - B | ラベル`

## バージョンと互換性

- `echarts-for-react` は **core 版**を使用するため、`echarts/core` から必要モジュールを登録しています。
- 既知のエラー `createPathProxy is not a function` は ECharts とラッパの不整合で発生します。本プロジェクトの依存バージョンに合わせてください。

## 自己テスト

画面上部の「自己テスト」を押すと、パーサとオプション生成の最低限のチェックが走り、結果が画面に表示されます。
