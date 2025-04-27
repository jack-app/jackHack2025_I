// HomePage（タイトル画面）
// ここでは「ゲームスタートボタン」を押して難易度選択画面へ移動する

import React from "react";
import { useNavigate } from "react-router-dom"; // 画面遷移するために使う
import { useGame } from "../contexts/GameContext"; // ゲームの状態（難易度など）を取得するために使う
import testImage from "../assets/professor/test.png"; // 画像をインポート
import "../styles/pages/HomePage.css"; // CSSスタイルをインポート(cssが適用されるようになる)

function HomePage() {
    // javaScriptが書ける↓
  const navigate = useNavigate(); // 遷移用の関数
  const game = useGame(); // GameContextから現在のゲーム状態を取得

  return (
    <div className="home-page">
      <h1>Home Page</h1>

      {/* 現在のゲーム状態を画面に表示（デバッグ用） */}
      <pre>{JSON.stringify(game, null, 2)}</pre>

      <img src={testImage} alt="画像test" style={{ width: "20%" }} />

      {/* 「ゲームスタート」ボタンを押すと /difficulty に移動 */}
      <button onClick={() => navigate("/difficulty")}>ゲームスタート</button>
    </div>
  );
}

export default HomePage;
