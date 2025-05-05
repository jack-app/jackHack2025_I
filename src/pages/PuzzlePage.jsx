// PuzzlePage（履修登録パズル画面）
// パズルで教授を選び終わったら、教授選択画面へ進む

import React, { use } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../contexts/GameContext";
import "../styles/pages/PuzzlePage.css"; // CSSスタイルをインポート(cssが適用されるようになる)
import professors from "../data/professor.js";
import PuzzleGridCheck from "../components/common/PuzzleGridCheck.jsx";
import  Lovepointbar from "../components/common/lovepointbar.jsx";

function PuzzlePage() {
    // javaScriptが書ける↓
  const navigate = useNavigate();
  const game = useGame();


  const testProfessorId = 1; // テスト用に「中村先生（id: 1）」を指定

  // 好感度アップさせるボタンのクリック処理
  const handleIncreaseLovepoint = () => {
    game.updateLovepoint(testProfessorId, 10); // 好感度+10
  };

   // 教授データから名前のみを取得
   const professorNames = professors.map((professor) => professor.name);

  return (
    <div className="puzzle-page">
      <h1>Puzzle Page</h1>
      <PuzzleGridCheck></PuzzleGridCheck>
      < Lovepointbar />
      {/* 現在のゲーム状態を表示 */}
      <pre>{JSON.stringify(game, null, 2)}</pre>

      {/* 好感度アップボタン */}
      <button onClick={handleIncreaseLovepoint}>中村先生の好感度を+10する</button>
      
      {/* 教授の名前一覧 */}
      <div>{professorNames}</div>

      {/* 次へ進むボタン（教授選択画面へ） */}
      <button onClick={() => navigate("/professor-explain")}>教授説明へ</button>
    </div>
  );
}

export default PuzzlePage;
