// ProfessorSelectPage（教授ルート選択画面）
// パズルで選んだ教授たちから、1人を選んでタイピングへ進む

import React from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../contexts/GameContext";
import "../styles/pages/ProfessorSelectPage.css"; // CSSスタイルをインポート(cssが適用されるようになる)
import professors from "../data/professor.js";

function ProfessorSelectPage() {
    // javaScriptが書ける↓
  const navigate = useNavigate();
  const game = useGame();

  // IDを指定して教授を選択する関数
  const selectProfessor = (professorId) => {
    game.setChosenProfessorId(professorId);
    console.log(`Selected professor: ${professorId}`);
  };

  // 教授データから名前のみを取得
  const professorNames = professors.map((professor) => professor.name);

  return (
    <div className="professor-select-page">
      <h1>Professor Select Page</h1>

      {/* 現在のゲーム状態を表示 */}
      <pre>{JSON.stringify(game, null, 2)}</pre>
      <button onClick={() => selectProfessor(1)}>id : 1をsetする</button>

      {/* 教授の名前一覧 */}
      <div>{professorNames}</div>
      
      {/* 次へ進むボタン（タイピングゲームへ） */}
      <button onClick={() => navigate("/mid-story")}>中間ストーリーへ</button>
    </div>
  );
}

export default ProfessorSelectPage;
