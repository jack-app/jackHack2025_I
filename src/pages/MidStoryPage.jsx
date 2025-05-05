// MidStoryPage（間のストーリー画面）

import React from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../contexts/GameContext";
import "../styles/pages/MidStoryPage.css"; // CSSスタイルをインポート(cssが適用されるようになる)
import professors from "../data/professor.js";
import backgroundimage from "../assets/background/mid-story.svg";
import TextBox from "../components/common/TextBox/TextBox";
import TopLeftButtons from "../components/common/TopLeftButtons";

function MidStoryPage() {
    // javaScriptが書ける↓
  const navigate = useNavigate();
  const game = useGame();

   // ゲーム状態から教授リストを取得.chusenProfessorIdを使って当てはまるものを返している
   const professor = professors.find((p) => p.id === game.chosenProfessorId);
   let pid = game.chosenProfessorId || 1;//選ばれていなければ雨日教授を出す(デバッグ用でもある)
    return (
    <div className="mid-story-page"
       style={{
        backgroundImage: `url(${backgroundimage})`,
        height: "100vh", 
        backgroundSize: "cover", 
      }}
      >
         <TopLeftButtons />
      <h1>MidStoryPage Page</h1>

      {/* 現在のゲーム状態を表示 */}
      <pre>{JSON.stringify(game, null, 2)}</pre>
      {/* 選ばれた教授情報 */}
      {professor && (
        <div className="professor-info">
          <h2>{professor.name}とのストーリー</h2>
          <p>{professor.explanation}</p>
        </div>
      )}

      
      <TextBox scripts={professors[pid].storyTexts[game.typingRound]} nextRoute={"/typing"} />

      {/* 難易度情報 */}

      {/* 次へ進むボタン（タイピングゲームへ） */}
      <button onClick={() => navigate("/typing")}>タイピングへ</button>
    </div>
  );
}

export default MidStoryPage;
