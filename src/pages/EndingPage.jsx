// EndingPage（エンディング画面）
// タイピングの結果による最終エンディングを表示する
// （恋人エンド・友達エンド・絶交エンドなど）

import React from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../contexts/GameContext";
import "../styles/pages/EndingPage.css"; // CSSスタイルをインポート(cssが適用されるようになる)
import professors from "../data/professor.js";
import ShareButton from "../components/common/share-button";
import TextBox from "../components/common/TextBox/TextBox";
import Professor from "../components/common/ProfessorImage/Professor";

import happyEnding from "../assets/background/happyEnding.svg";
import friendEnding from "../assets/background/friendEnding.svg";
import badEnding from "../assets/background/badEnding.svg";

function EndingPage() {
    // javaScriptが書ける↓
  const navigate = useNavigate();
  const game = useGame();
  let pid = parseInt(game.chosenProfessorId) - 1;//選ばれていなければ雨日教授を出す(デバッグ用でもある)

  // ゲーム状態から教授リストを取得.chusenProfessorIdを使って当てはまるものを返している
  const professor = professors.find((p) => p.id === game.chosenProfessorId);

  // タイピング結果によるエンディングの表示
  //  // 暫定的にスコアを指定

  // ゲームの成績に応じてエンディング画面を分岐
  let endingImage;
  let backgroundColor;
  if (game.score >= 80) {
    endingImage = happyEnding;
    backgroundColor = "blanchedalmond"; // or antiquewhite
  } else if (game.score >= 50) {
    endingImage = friendEnding;
    backgroundColor = "bisque"; // or palegoldenrod
  } else {
    endingImage = badEnding;
    backgroundColor = "indianred"; // or brown
  }
    let lp = game.professorLovepointMap[pid];
    let ending;
    if(lp < 30){
      console.log(pid)
      console.log(professors[pid])
      ending= professors[pid].endings.bad
    }else if(lp<=80){
      ending= professors[pid].endings.friend
    }else{
      ending= professors[pid].endings.lover
    }
    
  return (
    <div
      className="ending-page"
      style={{
      backgroundColor: backgroundColor,
      backgroundImage: `url(${endingImage})`
      }}
    >
 <ShareButton />
 <div className="professorFigureInEnding">
 <Professor professorId={pid}/>
 </div>
 <div className="professorText">
<TextBox scripts={ending} nextRoute={"/"}/>
</div>
      {/* タイトル画面に戻るボタン */}
      <button 
        style={{
          marginTop: "100px", // ボタンの余白
          position: "relative"
        }}
        onClick={() =>{ 
          game.resetGame();
          console.log("game reset")
          navigate("/");
        }}
      >
        タイトルに戻る
      </button>
    </div>
  );
}

export default EndingPage;
