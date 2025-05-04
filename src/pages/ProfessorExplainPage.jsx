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
      <h1>教授紹介・選択</h1>

      <ul id="professor-profiles">{/*各教授の紹介*/
        professors.map((professor) => {
          return (
            <li class="professor-profile" key={professor.id} onClick={() => selectProfessor(professor.id)}>
              <small>The Foobar University of Quxatics</small>
              <div>
                <h2>
                  {professor.name}
                </h2>
                <p>{professor.personality}</p>
              </div>
              <img class="professor-portrait" src={professor.image} width="10" />
            </li>
          )
        })
      }</ul>

      {/* 次へ進むボタン（タイピングゲームへ） */}
      <button onClick={() => navigate("/mid-story")}>mid-storyへ</button>

      {/* 現在のゲーム状態を表示 */}
      <pre>{JSON.stringify(game, null, 2)}</pre>
    </div>
  );
}

export default ProfessorExplainPage;
