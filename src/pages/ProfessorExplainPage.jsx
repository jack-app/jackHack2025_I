// ProfessorExplainPage（教授説明画面）
// 教授の説明ボタンから飛べるページ

import React from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../contexts/GameContext";
import "../styles/pages/ProfessorExplainPage.css"; // CSSスタイルをインポート(cssが適用されるようになる)
import professors from "../data/professor.js";

function ProfessorExplainPage() {
    // javaScriptが書ける↓
  const navigate = useNavigate();
  const game = useGame();

  // IDを指定して教授を選択する関数
  const selectProfessor = (professorId) => {
    game.setChosenProfessorId(professorId);
    console.log(`Selected professor: ${professorId}`);
  };

  // ゲーム状態から教授リストを取得.chusenProfessorIdを使って当てはまるものを返している
  const professor = professors.find((p) => p.id === game.chosenProfessorId);

  return (
    <div className="professor-explain-page">
      <h1>ProfessorExplainPage Page</h1>

      {/* 現在のゲーム状態を表示 */}
      <pre>{JSON.stringify(game, null, 2)}</pre>
      <button onClick={() => selectProfessor(1)}>id : 1をsetする</button>

      {/* 次へ進むボタン（タイピングゲームへ） */}
      <button onClick={() => navigate("/professor-select")}>professor-selectへ</button>

      {/* 教授の説明 */}
      {professor && (
        <div className="professor-explanation">
          <h2>{professor.name}の説明</h2>
          <p>{professor.explanation}</p>
        </div>
      )} 
      {/* professor && にしているのは、professorが存在する場合のみ説明を表示するため */}
    </div>
  );
}

export default ProfessorExplainPage;
