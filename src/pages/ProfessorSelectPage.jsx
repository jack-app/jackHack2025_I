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
        professors.map(professor => {
          return (
            <li key={professor.id} className="professor-card-slot">
              <div className={`professor-card ${professor.id == game.chosenProfessorId ? "chosen" : "fdsa"}`} onClick={() => selectProfessor(professor.id)}>
                <header>
                  <div className="univ-logo"></div>
                  <div className="professor-card-top-right">
                    <div id="professor-card-top-right-line">
                      <small>ほげほげ大学</small>
                      <small>The Foobar University of Quxatics</small>
                    </div>
                  </div>
                </header>
                <div className="professor-card-contents">
                  <div className="professor-profile">
                    <h2>{professor.name}</h2>
                    <small>{professor.latinScriptName}</small>
                    <p>{professor.personality}</p>
                  </div>
                  <div className="professor-portrait" style={{"background-image": `url(${professor.image})` }}>
                  </div>
                </div>
              </div>
            </li>
          )
        })
      }</ul>

      {/* 次へ進むボタン（タイピングゲームへ） */}
      <div id="footer">
        <button onClick={() => navigate("/mid-story")}>決定して進む</button>
        <p>教授のカードをクリックして選択してください。</p>
      </div>

      {/* 現在のゲーム状態を表示}
      <pre>{JSON.stringify(game, null, 2)}</pre>{*/}
    </div>
  );
}

export default ProfessorSelectPage;
