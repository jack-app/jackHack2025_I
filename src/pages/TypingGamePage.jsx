// TypingGamePage（タイピングゲーム画面）
// 教授とのタイピング対決を行う
// （実際にはここでタイピング入力エリアを作る予定）

import React from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../contexts/GameContext";
import "../styles/pages/TypingGamePage.css"; // CSSスタイルをインポート(cssが適用されるようになる)

function TypingGamePage() {
  const navigate = useNavigate();
  const game = useGame();

  return (
    <div className="typing-game-page">
      <h1>Typing Game Page</h1>

      {/* 現在のゲーム状態を表示 */}
      <pre>{JSON.stringify(game, null, 2)}</pre>

      {/* 次へ進むボタン（エンディング画面へ） */}
      <button onClick={() => navigate("/ending")}>エンディングへ</button>
    </div>
  );
}

export default TypingGamePage;
