// DifficultySelectPage（難易度選択画面）
// 難易度を選んだあと、パズル画面に移動する

import React from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../contexts/GameContext";
import "../styles/pages/DifficultySelectPage.css"; // CSSスタイルをインポート(cssが適用されるようになる)

function DifficultySelectPage() {
  // javaScriptが書ける↓
  const navigate = useNavigate();
  const game = useGame();

  return (
    <div className="difficulty-page">
      <h1>Difficulty Select Page</h1>

      {/* 現在のゲーム状態を表示 */}
      <pre>{JSON.stringify(game, null, 2)}</pre>

      {/* 次へ進むボタン（パズル画面へ） */}
      <button onClick={() => navigate("/puzzle")}>パズルへ</button>
    </div>
  );
}

export default DifficultySelectPage;
