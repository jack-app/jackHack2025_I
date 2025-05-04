// DifficultySelectPage（難易度選択画面）
// 難易度を選んだあと、パズル画面に移動する

import React from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../contexts/GameContext";
import "../styles/pages/DifficultySelectPage.css"; // CSSスタイルをインポート(cssが適用されるようになる)
// import professors from "../data/professor.js";
import GameControlButton from "../components/common/GameControllButton/GameControlButton";

function DifficultySelectPage() {
  // javaScriptが書ける↓
  const navigate = useNavigate();
  const game = useGame();

  // 難易度選択のための関数（例として3つの難易度を用意）
  const handleDifficultySelect = (difficulty) => {
    game.setDifficulty(difficulty); // ゲームの難易度を設定
    console.log(`選択された難易度: ${difficulty}`);
  };

  // 教授データから名前のみを取得
  // const professorNames = professors.map((professor) => professor.name);
  
  return (
    <div className="difficulty-page">
      <h1>Difficulty Select Page</h1>

      {/* 現在のゲーム状態を表示 */}
      <pre>{JSON.stringify(game, null, 2)}</pre>

      {/* 難易度選択ボタン */}
      <GameControlButton label="EASY" onClick={() => handleDifficultySelect("easy")} />
      <GameControlButton label="NORMAL" onClick={() => handleDifficultySelect("normal")} />
      <GameControlButton label="HARD" onClick={() => handleDifficultySelect("hard")} />
      {/* 教授の名前一覧: */}
      {/* <div>{professorNames}</div> */}

      {/* 次へ進むボタン（パズル画面へ） */}
      <button onClick={() => navigate("/puzzle")}>パズルへ</button>
    </div>
  );
}

export default DifficultySelectPage;
