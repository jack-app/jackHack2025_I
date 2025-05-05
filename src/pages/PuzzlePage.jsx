import React, { useState, useEffect, useRef } from 'react';
import '../styles/pages/PuzzlePage.css'; // スタイルは別途調整してください

const PuzzlePage = () => {
  const cellSize = 60;
  const groundPieceSizeRatio = 0.4;

  const [activePiece, setActivePiece] = useState(null);
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);
  const [isClick, setIsClick] = useState(false);

  const boardRef = useRef(null);

  useEffect(() => {
    resetPuzzlePiece();
  }, []);

  const resetPuzzlePiece = () => {
    const puzzlePieces = document.querySelectorAll('.puzzle-piece');
    puzzlePieces.forEach((piece, index)  => {
      // 初期位置：グリッドの下、i=5（6行目）、j=0~N
    const piecesPerRow = 4; // 1段に置く個数
    const i = 5 + Math.floor(index / piecesPerRow); 
    const j = (index % 4);

    const left = (j -1 ) * (cellSize*1.5);
    const top = i * cellSize;

    piece.style.left = `${left}px`;
    piece.style.top = `${top}px`;
      // piece.style.left = '';
      // piece.style.top = '';
      piece.setAttribute('data-scale', groundPieceSizeRatio);
      piece.setAttribute('data-state', 0);
      piece.setAttribute('data-pos', 0);

      // 初期位置を保存（再配置に使う）
    piece.setAttribute('data-init-left', left);
    piece.setAttribute('data-init-top', top);

    piece.setAttribute('data-scale', groundPieceSizeRatio);
    piece.setAttribute('data-state', 0);
    piece.setAttribute('data-pos', 0);

      setStyle(piece);
    });
  };

  const onTouchStart = (event) => {
    if (event.target.parentElement.classList.contains('puzzle-piece')) {
      event.preventDefault();
      const piece = event.target.parentElement;
      setActivePiece(piece);
      piece.style.zIndex = 1000;

      const touch = event.type === 'touchstart' ? event.touches[0] : event;
      setDx(touch.pageX - piece.offsetLeft);
      setDy(touch.pageY - piece.offsetTop);
      setIsClick(true);
    }
  };

  const onTouchMove = (event) => {
    if (activePiece) {
      const touch = event.type === 'touchmove' ? event.touches[0] : event;
      activePiece.style.left = `${touch.pageX - dx}px`;
      activePiece.style.top = `${touch.pageY - dy}px`;
      activePiece.setAttribute('data-scale', 1);
      setStyle(activePiece);
      setIsClick(false);
    }
  };

  const onTouchEnd = (event) => {
    if (activePiece) {
      event.preventDefault();
      const touch = event.type === 'touchend' ? event.changedTouches[0] : event;

      if (isClick) {
        rotateReverseActivePiece();
      } else {
        placeActivePiece(touch);
      }

      setStyle(activePiece);
      activePiece.style.zIndex = 0;
      setActivePiece(null);
      setDx(0);
      setDy(0);
    }
  };

  const rotateReverseActivePiece = () => {
    const state = parseInt(activePiece.getAttribute('data-state') || '0');
    const newState = (state + 1) % 4;
    activePiece.setAttribute('data-state', newState);
  };

  const placeActivePiece = (touch) => {
    const boardBounds = boardRef.current.getBoundingClientRect();
  const pieceBounds = activePiece.getBoundingClientRect();

  const centerX = pieceBounds.left + pieceBounds.width / 2;
  const centerY = pieceBounds.top + pieceBounds.height / 2;

  const j = Math.floor((centerX - boardBounds.left) / cellSize);
  const i = Math.floor((centerY - boardBounds.top) / cellSize);

  console.log(`centerX: ${centerX}, centerY: ${centerY}`);
  console.log(`cellSize: ${cellSize}`);
  console.log(`i: ${i}, j: ${j}`);

  let pos = 0;
  if (i >= 0 && i < 5 && j >= 0 && j < 5) {
    pos = i * 5 + j + 1;
  }

  setPosition(activePiece, pos);
  };

  const setStyle = (element) => {
    const scale = parseFloat(element.getAttribute('data-scale') || '0.5');
    const state = parseInt(element.getAttribute('data-state') || '0');
    const rotation = state * 90;
    element.style.transform = `scale(${scale}, ${scale}) rotate(${rotation}deg)`;
  };

  const setPosition = (element, pos) => {
    const bounds = boardRef.current.getBoundingClientRect();

    if (pos > 0) {
      const i = Math.floor((pos - 1) / 5);
      const j = (pos - 1) % 5;
      console.log(`i: ${i}, j: ${j}`);
      console.log(`bounds: ${JSON.stringify(bounds)}`);
      console.log(`bounds.left: ${bounds.left}, bounds.top: ${bounds.top}`);
      
      element.style.left = `${j * cellSize - 1}px`;
      element.style.top = `${i * cellSize - 1}px`;
      console.log(`element.style.left: ${element.style.left}, element.style.top: ${element.style.top}`);
      console.log(`cellSize: ${cellSize}`);
      element.setAttribute('data-scale', 1);
    } else {
      // 初期位置に戻す
    const initLeft = element.getAttribute('data-init-left');
    const initTop = element.getAttribute('data-init-top');

    element.style.left = `${initLeft}px`;
    element.style.top = `${initTop}px`;
    element.setAttribute('data-scale', groundPieceSizeRatio);
    }

    element.setAttribute('data-pos', pos);
  };

  useEffect(() => {
    document.addEventListener('touchmove', onTouchMove, false);
    document.addEventListener('mousemove', onTouchMove, false);
    document.addEventListener('touchend', onTouchEnd, false);
    document.addEventListener('mouseup', onTouchEnd, false);

    return () => {
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('mousemove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('mouseup', onTouchEnd);
    };
  }, [activePiece, dx, dy, isClick]);

  const renderBoardCells = () => {
    const cells = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const id = `cell-${i}-${j}`;
        cells.push(<div key={id} id={id} className="board-cell" />);
      }
    }
    return cells;
  };

  const renderPuzzlePieces = () => {
    const pieceStructures = {
      piece1: { cols: 1, rows: 6, nullCells: [0,5] },
      piece2: { cols: 1, rows: 6, nullCells: [3,4] },
      piece3: { cols: 1, rows: 6, nullCells: [2,3] },
      piece4: { cols: 1, rows: 5, nullCells: [3] },
      piece5: { cols: 1, rows: 6, nullCells: [2,3] },
      piece6: { cols: 1, rows: 6, nullCells: [0,1] },
      piece7: { cols: 1, rows: 6, nullCells: [2,5]  },
      piece8: { cols: 1, rows: 6, nullCells: [2,3] },
      piece9: {  cols: 1, rows: 6, nullCells: [0,2] },
      piece10: {cols: 1, rows: 6, nullCells: [2,5]  },
      piece11: {cols: 1, rows: 6, nullCells: [1,2]  },
      piece12: { cols: 1, rows: 4, nullCells: [] },
    };

    return Object.entries(pieceStructures).map(([pieceId, structure]) => {
      const cells = [];
      for (let i = 0; i < structure.rows; i++) {
        for (let j = 0; j < structure.cols; j++) {
          const cellIndex = i * structure.cols + j;
          const isNull = structure.nullCells.includes(cellIndex);
          cells.push(
            <div
              key={`${pieceId}-cell-${i}-${j}`}
              className={`puzzle-cell ${isNull ? 'null' : ''}`}
              onMouseDown={onTouchStart}
              onTouchStart={onTouchStart}
            />
          );
        }
      }

      return (
        <div
          key={pieceId}
          id={pieceId}
          className="puzzle-piece"
          data-scale={groundPieceSizeRatio}
          data-state={0}
          data-pos={0}
        >
          {cells}
        </div>
      );
    });
  };

  return (
    <div className="puzzle-page">
      <div className="board-wrapper">
        <div id="board" ref={boardRef} className="board">
          {renderBoardCells()}
          {renderPuzzlePieces()}
        </div>
      </div>

      {/* <div className="ground">
        {renderPuzzlePieces()}
      </div> */}

      <button onClick={resetPuzzlePiece}>Reset Puzzle</button>
    </div>
  );
};

export default PuzzlePage;
