// DifficultySelectPage（難易度選択画面）
// 難易度を選んだあと、パズル画面に移動する

import React from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../contexts/GameContext";
import "../styles/pages/DifficultySelectPage.css"; // CSSスタイルをインポート(cssが適用されるようになる)
// import professors from "../data/professor.js";
import GameControlButton from "../components/common/GameControllButton/GameControlButton";
import backgroundimage from "../assets/background/difficulty.svg";
import TopLeftButtons from "../components/common/TopLeftButtons";

function DifficultySelectPage() {
  // javaScriptが書ける↓
  const navigate = useNavigate();
  const game = useGame();

  // 難易度選択のための関数（例として3つの難易度を用意）
  const handleDifficultySelect = (difficulty) => {
    game.setDifficulty(difficulty); // ゲームの難易度を設定
    console.log(`選択された難易度: ${difficulty}`);
    navigate("/puzzle");
  };

  // 教授データから名前のみを取得
  // const professorNames = professors.map((professor) => professor.name);
  
  return (
    <div
      className="difficulty-page"
      style={{
        backgroundImage: `url(${backgroundimage})`,
        height: "100vh", 
        backgroundSize: "cover", 
      }}
    >
      <TopLeftButtons description={
    <>
      タイピングが自信のある人は<br />
      HARDがおすすめ<br />
      easy: 40s<br />
      normal: 20s<br />
      hard: 15s<br />
      タイピングの時間が変わるよ
    </>
  }/>
      <h1 className="title">難易度選択</h1>
      {/* 難易度選択ボタン */}
      {/* NOTE:状態表示に押し出されて表示がずれるが、とればうまくいくのでOK */}
      <GameControlButton label="EASY" onClick={() => handleDifficultySelect("easy")} />
      <GameControlButton label="NORMAL" onClick={() => handleDifficultySelect("normal")} />
      <GameControlButton label="HARD" onClick={() => handleDifficultySelect("hard")} />
      {/* 教授の名前一覧: */}
      {/* <div>{professorNames}</div> */}

    </div>
  );
}

export default DifficultySelectPage;
