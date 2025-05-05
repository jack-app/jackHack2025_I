// PuzzlePage（履修登録パズル画面）
// パズルで教授を選び終わったら、教授選択画面へ進む

import React, { useState,useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../contexts/GameContext";
import "../styles/pages/PuzzlePage.css"; // CSSスタイルをインポート(cssが適用されるようになる)
import professors from "../data/professor.js";
import PuzzleGridCheck from "../components/common/PuzzleGridCheck.jsx";
import Lovepointbar from "../components/common/Lovepointbar.jsx";

import PuzzleGrid from "../components/puzzle/PuzzleGrid";
import PieceComponent from "../components/puzzle/PieceComponent";
import { canPlacePiece, clearPieceFromGrid, placePiece } from "../components/puzzle/gridUtils.js";
import { convertPixelToGrid } from "../components/puzzle/positionUtils";


function PuzzlePage() {
    // javaScriptが書ける↓
  const navigate = useNavigate();
  const game = useGame();

  const cellSize = 60;

  // 好感度アップさせるボタンのクリック処理
  const handleIncreaseLovepoint = () => {
    game.updateLovepoint(testProfessorId, 10); // 好感度+10
  };

   // 教授データから名前のみを取得
   const professorNames = professors.map((professor) => professor.name);

   const [grid, setGrid] = useState(() => {
    const rows = 6, cols = 5;
    return Array.from({ length: rows }, (_, i) =>
      Array.from({ length: cols }, (_, j) => ({
        i,
        j,
        required: i === 0, // 上の行だけ必修にする例
        occupiedBy: null,
      }))
    );
  });

  // 全教授の全パーツを1つの配列として flatten
  const [pieces, setPieces] = useState(() => {
    const allPieces = [];
    professors.forEach((prof) => {
      prof.pieces.forEach((shape, index) => {
        allPieces.push({
          id: `${prof.id}-${index}`,
          professorId: prof.id.toString(),
          shape,
          scale: 0.6,
          pos: null,
          initialTop: null,
          initialLeft: null,
        });
      });
    });
    return allPieces;
  });
  
  const boardRef = useRef();
  const [draggingPieceId, setDraggingPieceId] = useState(null);

  const handleDrop = (mouseX, mouseY, piece) => {
    const pos = convertPixelToGrid(mouseX, mouseY, boardRef, cellSize);
    if (canPlacePiece(grid, piece, pos)) {
      const cleared = clearPieceFromGrid(grid, piece);
      const updated = placePiece(cleared, piece, pos);
      setGrid(updated);
      setPieces(prev =>
        prev.map(p =>
          p.id === piece.id ? { ...p, pos, scale: 1 } : p
        )
      );
    }
  };

  const handleDragStart = (pieceId) => {
    setDraggingPieceId(pieceId);
    setPieces(prev =>
      prev.map(p => (p.id === pieceId ? { ...p, scale: 1.0 } : p))
    );
  };

  const handleDragEnd = (e, piece) => {
    handleDrop(e.clientX, e.clientY, piece);
    setDraggingPieceId(null);
  };

  // 2. 初期描画後、初期位置を設定する
useEffect(() => {
  const bounds = boardRef.current?.getBoundingClientRect();
  if (!bounds) return;

  setPieces(prev =>
    prev.map((p, i) => ({
      ...p,
      initialTop: 50 + (i % 5) * 80, // 散らす
      initialLeft: 50 + Math.floor(i / 5) * 120,
    }))
  );
}, []);

  return (
    <div className="puzzle-page">
      {/* <h1>履修登録パズル</h1> */}

      <div className="puzzle-area">
        <div className="puzzle-board-wrapper" ref={boardRef}>
          <PuzzleGrid grid={grid} cellSize={cellSize} />
        </div>

        {/* 複数ピースの表示 */}
        {pieces.map((piece) => (
          <PieceComponent
            key={piece.id}
            piece={piece}
            cellSize={cellSize}
            boardRef={boardRef}
            onDragStart={() => handleDragStart(piece.id)}
            onDragEnd={(e) => handleDragEnd(e, piece)}
          />
        ))}
      </div>
      
      <PuzzleGridCheck />

      {/* 現在のゲーム状態を表示 */}
      {/* <pre>{JSON.stringify(game, null, 2)}</pre> */}

      {/* 好感度アップボタン */}
      {/* <button onClick={handleIncreaseLovepoint}>中村先生の好感度を+10する</button> */}
      
      {/* 教授の名前一覧 */}
      {/* <div>{professorNames}</div> */}

      {/* 次へ進むボタン（教授選択画面へ） */}
      {/* <button onClick={() => navigate("/professor-select")}>教授選択へ</button> */}
    </div>
  );
}

export default PuzzlePage;
