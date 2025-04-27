// ProfessorSelectPage（教授ルート選択画面）
// パズルで選んだ教授たちから、1人を選んでタイピングへ進む

import React from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../contexts/GameContext";
import "../styles/pages/ProfessorSelectPage.css"; // CSSスタイルをインポート(cssが適用されるようになる)

function ProfessorSelectPage() {
  const navigate = useNavigate();
  const game = useGame();

  return (
    <div className="professor-select-page">
      <h1>Professor Select Page</h1>

      {/* 現在のゲーム状態を表示 */}
      <pre>{JSON.stringify(game, null, 2)}</pre>

      {/* 次へ進むボタン（タイピングゲームへ） */}
      <button onClick={() => navigate("/typing")}>タイピングへ</button>
    </div>
  );
}

export default ProfessorSelectPage;
