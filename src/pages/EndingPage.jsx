// EndingPage（エンディング画面）
// タイピングの結果による最終エンディングを表示する
// （恋人エンド・友達エンド・絶交エンドなど）

import React from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../contexts/GameContext";
import "../styles/pages/EndingPage.css"; // CSSスタイルをインポート(cssが適用されるようになる)
import professors from "../data/professor.js";

function EndingPage() {
    // javaScriptが書ける↓
  const navigate = useNavigate();
  const game = useGame();

  // ゲーム状態から教授リストを取得.chusenProfessorIdを使って当てはまるものを返している
  const professor = professors.find((p) => p.id === game.chosenProfessorId);

  return (
    <div className="ending-page">
      <h1>Ending Page</h1>

      {/* 現在のゲーム状態を表示 */}
      <pre>{JSON.stringify(game, null, 2)}</pre>
      
      {/* 選ばれた教授情報 */}
      {professor && (
        <div className="professor-info">
          <h2>{professor.name}とのエンディング</h2>
          <p>{professor.explanation}</p>
        </div>
      )}

      {/* タイピング結果によるエンディングの表示 */}

      {/* タイトル画面に戻るボタン */}
      <button onClick={() => navigate("/")}>タイトルに戻る</button>
    </div>
  );
}

export default EndingPage;
