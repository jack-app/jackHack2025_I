// PuzzlePage（履修登録パズル画面）
// パズルで教授を選び終わったら、教授選択画面へ進む

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../contexts/GameContext";
import "../styles/pages/PuzzlePage.css"; // CSSスタイルをインポート(cssが適用されるようになる)
import professors from "../data/professor.js";
import PuzzleGridCheck from "../components/common/PuzzleGridCheck.jsx";

import sampleImg from "../assets/puzzle/sample.png";

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


  const onDragStart = (e, tileId) => {
    e.dataTransfer.setData("titleId", tileId);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();
    const tileId = e.dataTransfer.getData("tileId");
    const rect = e.currentTarget.getBoundingClientRect();
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;
    const gridSize = 10;
    const x = Math.round(rawX / gridSize) * gridSize;
    const y = Math.round(rawY / gridSize) * gridSize;
    setPieces((prev) =>
      prev.map((p) => (p.id === tileId ? { ...p, placed: x, y } : p))
    );
  };

    const [pieces, setPieces] = useState([
      {id: "sample", src: sampleImg, placed: false, x: 0, y: 0},
    ])


  return (
    <div className="puzzle-page">
      <h1>Puzzle Page</h1>

      {/* ■ ここからドラッグ＆ドロップ テスト用UI ■ */}
      <div
        className="drop-area"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
        {pieces
          .filter((p) => p.placed)
          .map((p) => (
            <img
              key={p.id}
              id={p.id}
              src={p.src}
              className="tile"
              draggable
              onDragStart={(e) => onDragStart(e, p.id)}
              style={{ left: p.x, top: p.y }}
            />
          ))
        }
      </div>
      {/* ■ テスト用 ここまで ■ */}

      <PuzzleGridCheck />

      {/* 現在のゲーム状態を表示 */}
      <pre>{JSON.stringify(game, null, 2)}</pre>

      {/* 好感度アップボタン */}
      <button onClick={handleIncreaseLovepoint}>中村先生の好感度を+10する</button>
      
      {/* 教授の名前一覧 */}
      <div>{professorNames}</div>

      {/* 次へ進むボタン（教授選択画面へ） */}
      <button onClick={() => navigate("/professor-explain")}>教授説明へ</button>

      {/* ６行５列のグリッドを描画 */}
      <PuzzleGridCheck />
    </div>
  );
}

export default PuzzlePage;
