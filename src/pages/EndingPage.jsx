// EndingPage（エンディング画面）
// タイピングの結果による最終エンディングを表示する
// （恋人エンド・友達エンド・絶交エンドなど）

import React from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../contexts/GameContext";

function EndingPage() {
  const navigate = useNavigate();
  const game = useGame();

  return (
    <div>
      <h1>Ending Page</h1>

      {/* 現在のゲーム状態を表示 */}
      <pre>{JSON.stringify(game, null, 2)}</pre>

      {/* タイトル画面に戻るボタン */}
      <button onClick={() => navigate("/")}>タイトルに戻る</button>
    </div>
  );
}

export default EndingPage;
