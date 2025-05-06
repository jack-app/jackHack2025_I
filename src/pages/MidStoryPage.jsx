// MidStoryPage（間のストーリー画面）

import React from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../contexts/GameContext";
import "../styles/pages/MidStoryPage.css"; // CSSスタイルをインポート(cssが適用されるようになる)
import professors from "../data/professor.js";
import backgroundimage from "../assets/background/mid-story.svg";
import TextBox from "../components/common/TextBox/TextBox";
import TopLeftButtons from "../components/common/TopLeftButtons";
import Lovepointbar from "../components/common/Lovepointbar.jsx";
import Professor from "../components/common/ProfessorImage/Professor";




function MidStoryPage() {
    // javaScriptが書ける↓
  const navigate = useNavigate();
  const game = useGame();

   // ゲーム状態から教授リストを取得.chusenProfessorIdを使って当てはまるものを返している
   const professor = professors.find((p) => p.id === game.chosenProfessorId);
   let pid = parseInt(game.chosenProfessorId) - 1;//選ばれていなければ雨日教授を出す(デバッグ用でもある)
   console.log(pid)
   return (
    <div className="mid-story-page"
       style={{
        backgroundImage: `url(${backgroundimage})`,
        height: "100vh", 
        backgroundSize: "cover", 
      }}
      >
          <TopLeftButtons />
         {/* < Lovepointbar /> */}

   
         <div className="professorFigure">
 <Professor professorId={pid}/>
 </div>
 <div className="professorText">
 <TextBox scripts={professors[pid].storyTexts[game.typingRound]} nextRoute={"/typing"} />
 </div>

      {/* 難易度情報 */}

      {/* 次へ進むボタン（タイピングゲームへ） */}
      {/* <button onClick={() => navigate("/typing")}>タイピングへ</button> */}
    </div>
  );
}

export default MidStoryPage;
