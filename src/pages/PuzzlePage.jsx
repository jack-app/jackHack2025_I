// PuzzlePage（履修登録パズル画面）
// パズルで教授を選び終わったら、教授選択画面へ進む

import React, { use } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../contexts/GameContext";
import "../styles/pages/PuzzlePage.css"; // CSSスタイルをインポート(cssが適用されるようになる)

function PuzzlePage() {
  const navigate = useNavigate();
  const game = useGame();
  const { updateLovepoint } = useGame();


  const testProfessorId = 1; // テスト用に「中村先生（id: 1）」を指定

  // 好感度アップさせるボタンのクリック処理
  const handleIncreaseLovepoint = () => {
    updateLovepoint(testProfessorId, 10); // 好感度+10
  };


  return (
    <div className="puzzle-page">
      <h1>Puzzle Page</h1>

      {/* 現在のゲーム状態を表示 */}
      <pre>{JSON.stringify(game, null, 2)}</pre>

      {/* 好感度アップボタン */}
      <button onClick={handleIncreaseLovepoint}>中村先生の好感度を+10する</button>
      
      {/* 次へ進むボタン（教授選択画面へ） */}
      <button onClick={() => navigate("/professor-select")}>教授選択へ</button>
    </div>
  );
}

export default PuzzlePage;
