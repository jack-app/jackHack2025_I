// EndingPage（エンディング画面）
// タイピングの結果による最終エンディングを表示する
// （恋人エンド・友達エンド・絶交エンドなど）

import React from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../contexts/GameContext";
import "../styles/pages/EndingPage.css"; // CSSスタイルをインポート(cssが適用されるようになる)
import professors from "../data/professor.js";

// 画像のインポート
import happyEnding from "../assets/background/happyEnding.svg";
import friendEnding from "../assets/background/friendEnding.svg";
import badEnding from "../assets/background/badEnding.svg";

function EndingPage() {
    // javaScriptが書ける↓
  const navigate = useNavigate();
  const game = useGame();

  // ゲーム状態から教授リストを取得.chusenProfessorIdを使って当てはまるものを返している
  const professor = professors.find((p) => p.id === game.chosenProfessorId);

  // タイピング結果によるエンディングの表示
  game.score = 50; // 暫定的にスコアを指定

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


  return (
    <div
      className="ending-page"
      style={{
      backgroundColor: backgroundColor,
      backgroundImage: `url(${endingImage})`
      }}
    >


      {/* タイトル画面に戻るボタン */}
      <button 
        style={{
          marginTop: "100px", // ボタンの余白
          position: "relative"
        }}
        onClick={() => navigate("/")}
      >
        タイトルに戻る
      </button>
    </div>
  );
}

export default EndingPage;
