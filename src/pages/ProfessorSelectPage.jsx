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
      <h1>教授紹介・選択</h1>

      <ul id="professor-list">{/*各教授の紹介*/
        professors.map((professor) => {
          return (
            <li className="professor-card" key={professor.id} onClick={() => selectProfessor(professor.id)}>
              <header>
                <small>ほげほげ大学 The Foobar University of Quxatics</small>
              </header>
              <div className="professor-card-contents">
                <div className="professor-profile">
                  <h2>{professor.name}</h2>
                  <small>Name Name</small>
                  <p>{professor.personality}</p>
                </div>
                <img className="professor-portrait" src={professor.image} width="100" />
              </div>
            </li>
          )
        })
      }</ul>

      {/* 次へ進むボタン（タイピングゲームへ） */}
      <div id="footer">
        <button onClick={() => navigate("/mid-story")}>決定して進む</button>
      </div>

      {/* 現在のゲーム状態を表示}
      <pre>{JSON.stringify(game, null, 2)}</pre>{*/}
    </div>
  );
}

export default ProfessorSelectPage;
