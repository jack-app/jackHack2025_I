// TypingGamePage（タイピングゲーム画面）
// 教授とのタイピング対決を行う
// （実際にはここでタイピング入力エリアを作る予定）

import React from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../contexts/GameContext";
import "../styles/pages/TypingGamePage.css"; // CSSスタイルをインポート(cssが適用されるようになる)
import professors from "../data/professor.js";
import difficulty from "../data/difficulty.js";

function TypingGamePage() {
    // javaScriptが書ける↓
  const navigate = useNavigate();
  const game = useGame();

   // ゲーム状態から教授リストを取得.chusenProfessorIdを使って当てはまるものを返している
   const professor = professors.find((p) => p.id === game.chosenProfessorId);

  return (
    <div className="typing-game-page">
      <h1>Typing Game Page</h1>

      {/* 現在のゲーム状態を表示 */}
      <pre>{JSON.stringify(game, null, 2)}</pre>

      {/* 選ばれた教授情報 */}
      {professor && (
        <div className="professor-info">
          <h2>{professor.name}への謝罪</h2>
          <p>{professor.explanation}</p>
        </div>
      )}

      {/* 難易度情報 */}

      {/* 次へ進むボタン（エンディング画面へ） */}
      <button onClick={() => navigate("/ending")}>エンディングへ</button>
    </div>
  );
}

export default TypingGamePage;
