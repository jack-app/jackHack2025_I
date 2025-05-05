import React, { useState, useEffect, useRef } from 'react';
import '../styles/pages/PuzzlePage.css'; // スタイルは別途調整してください

const PuzzlePage = () => {
  const cellSize = 60;
  const groundPieceSizeRatio = 0.4;

  const [activePiece, setActivePiece] = useState(null);
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);
  const [isClick, setIsClick] = useState(false);
  const [grabOffset, setGrabOffset] = useState({ r: 0, c: 0 });
  const [gridMap, setGridMap] = useState(
    Array.from({ length: 5 }, () => Array(5).fill(null))
  );

  const pieceStructures = {
    // piece1: { cols: 1, rows: 6, nullCells: [0,5] },
    // piece2: { cols: 1, rows: 6, nullCells: [3,4] },
    // piece3: { cols: 1, rows: 6, nullCells: [2,3] },
    // piece4: { cols: 1, rows: 5, nullCells: [3] },
    // piece5: { cols: 1, rows: 6, nullCells: [2,3] },
    // piece6: { cols: 1, rows: 6, nullCells: [0,1] },
    // piece7: { cols: 1, rows: 6, nullCells: [2,5]  },
    // piece8: { cols: 1, rows: 6, nullCells: [2,3] },
    // piece9: {  cols: 1, rows: 6, nullCells: [0,2] },
    // piece10: {cols: 1, rows: 6, nullCells: [2,5]  },
    // piece11: {cols: 1, rows: 6, nullCells: [1,2]  },
    // piece12: { cols: 1, rows: 4, nullCells: [] },
    piece1: { // Z
      cols: 4,
      rows: 4,
      nullCells: [0, 1, 2, 3, 6, 7, 8, 11, 12, 13, 14, 15]
    },
    piece2: { // S
      cols: 4,
      rows: 4,
      nullCells: [0, 1, 2, 3, 4, 5, 8, 11, 12, 13, 14, 15]
    },
    piece3: { // I
      cols: 4,
      rows: 4,
      nullCells: [0, 2, 3, 4, 6, 7, 8, 10, 11, 12, 14, 15]
    },
    piece4: { // J
      cols: 4,
      rows: 4,
      nullCells: [0, 2, 3, 4, 6, 7, 8, 11, 12, 13, 14, 15]
    },
    piece5: { // L
      cols: 4,
      rows: 4,
      nullCells: [0, 1, 3, 4, 5, 7, 8, 11, 12, 13, 14, 15]
    },
    piece6: { // T
      cols: 4,
      rows: 4,
      nullCells: [0, 1, 2, 3, 7, 8, 10, 11, 12, 13, 14, 15]
    },
    piece7: { // O
      cols: 4,
      rows: 4,
      nullCells: [0, 1, 2, 3, 4, 7, 8, 11, 12, 13, 14, 15]
    },
    piece8: { // Z
      cols: 4,
      rows: 4,
      nullCells: [0, 1, 2, 3, 6, 7, 8, 11, 12, 13, 14, 15]
    },
    piece9: { // S
      cols: 4,
      rows: 4,
      nullCells: [0, 1, 2, 3, 4, 5, 8, 11, 12, 13, 14, 15]
    },
    piece10: { // I
      cols: 4,
      rows: 4,
      nullCells: [0, 2, 3, 4, 6, 7, 8, 10, 11, 12, 14, 15]
    },
    piece11: { // J
      cols: 4,
      rows: 4,
      nullCells: [0, 2, 3, 4, 6, 7, 8, 11, 12, 13, 14, 15]
    },
    piece12: { // L
      cols: 4,
      rows: 4,
      nullCells: [0, 1, 3, 4, 5, 7, 8, 11, 12, 13, 14, 15]
    },
    
  };

  const boardRef = useRef(null);

  useEffect(() => {
    resetPuzzlePiece();
  }, []);

  const resetPuzzlePiece = () => {
    const puzzlePieces = document.querySelectorAll('.puzzle-piece');
    puzzlePieces.forEach((piece, index)  => {
      // 初期位置：グリッドの下、i=5（6行目）、j=0~N
    const piecesPerRow = 6; // 1段に置く個数
    const i = 5 + Math.floor(index / piecesPerRow); 
    const j = (index % 6);

    const left = (j - 2 ) * (cellSize*1.5);
    const top = 4* (cellSize) + (i - 5) * (cellSize*1.5);

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

  // const onTouchStart = (event) => {
  //   if (event.target.parentElement.classList.contains('puzzle-piece')) {
  //     event.preventDefault();
  //     const piece = event.target.parentElement;
  //     setActivePiece(piece);
  //     piece.style.zIndex = 1000;

  //     const touch = event.type === 'touchstart' ? event.touches[0] : event;
  //     setDx(touch.pageX - piece.offsetLeft);
  //     setDy(touch.pageY - piece.offsetTop);
  //     setIsClick(true);
  //   }
  // };
  const onTouchStart = (event) => {
    if (event.target.classList.contains('puzzle-cell')) {
      const cell = event.target;
      const piece = cell.parentElement;
      if (!piece.classList.contains('puzzle-piece')) return;
  
      const cells = Array.from(piece.children);
      const index = cells.indexOf(cell);

      const structure = pieceStructures[piece.id];
      const grabRow = Math.floor(index / structure.cols);
      const grabCol = index % structure.cols;

      // 属性として保持
      piece.setAttribute('data-grab-row', grabRow);
      piece.setAttribute('data-grab-col', grabCol);
  
      const pieceId = piece.id;
      const { cols } = pieceStructures[pieceId];
  
      const r = Math.floor(index / cols);
      const c = index % cols;
      setGrabOffset({ r, c });
      console.log(`Grabbed cell: ${pieceId}, r: ${r}, c: ${c}`);
  
      event.preventDefault();
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
        // rotateReverseActivePiece();
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

  const getBoundingBox = (structure) => {
    const { rows, cols, nullCells } = structure;
  
    let minRow = rows, maxRow = -1;
    let minCol = cols, maxCol = -1;
  
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const idx = i * cols + j;
        if (!nullCells.includes(idx)) {
          if (i < minRow) minRow = i;
          if (i > maxRow) maxRow = i;
          if (j < minCol) minCol = j;
          if (j > maxCol) maxCol = j;
        }
      }
    }
  
    return {
      startRow: minRow,
      endRow: maxRow,
      startCol: minCol,
      endCol: maxCol
    };
  };

  const removePieceFromGrid = (pieceId, gridMap) => {
    return gridMap.map(row =>
      row.map(cell => (cell === pieceId ? null : cell))
    );
  };

  const placeActivePiece = (touch) => {
    const boardBounds = boardRef.current.getBoundingClientRect();

  const mouseX = touch.pageX;
  const mouseY = touch.pageY;

  const j = Math.floor((mouseX - boardBounds.left) / cellSize);
  const i = Math.floor((mouseY - boardBounds.top) / cellSize);

  // console.log(`centerX: ${centerX}, centerY: ${centerY}`);
  console.log(`cellSize: ${cellSize}`);
  console.log(`i: ${i}, j: ${j}`);

  const pieceId = activePiece.id;
  const structure = pieceStructures[pieceId];
  const { rows, cols, nullCells } = structure;

  const { r: offsetR, c: offsetC } = grabOffset;

  let is_setting = false;
  if (i >= 0 && i < 5 && j >= 0 && j < 5) {
    // ピースが枠外や重なっていないかチェック
    const isValidPlacement = () => {
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          if (nullCells.includes(idx)) continue;
  
          const ni = i - offsetR + r;
          const nj = j - offsetC + c;
          console.log(`ni: ${ni}, nj: ${nj}`);
          // 枠外チェック
          if (ni < 0 || ni >= 5 || nj < 0 || nj >= 5) return false;
          // 重なりチェック
          if (gridMap[ni][nj] !== null) {
            console.log(`重なりチェック: gridMap[${ni}][${nj}] = ${gridMap[ni][nj]}`);
            return false
          };
        }
      }
      console.log(`Valid placement: i: ${i}, j: ${j}`);
      return true;
    };

    if (isValidPlacement()) {
      console.log(`Valid placement at i: ${i}, j: ${j}`);
      const x = null;
      const y = null;

      // gridMapを更新
      const updatedGrid = gridMap.map(row => [...row]);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          if (nullCells.includes(idx)) continue;
          const ni = i - offsetR + r;
        const nj = j - offsetC + c;
        updatedGrid[ni][nj] = pieceId;
        }
      }
      console.log(`updatedGrid: ${JSON.stringify(updatedGrid)}`);
      setGridMap(updatedGrid);
      is_setting = true;
    }
  }

  setPosition(activePiece, i - offsetR,j-offsetC, is_setting);
  };

  const setStyle = (element) => {
    const scale = parseFloat(element.getAttribute('data-scale') || '0.5');
    const state = parseInt(element.getAttribute('data-state') || '0');
    const rotation = state * 90;
    element.style.transform = `scale(${scale}, ${scale}) rotate(${rotation}deg)`;
  };

  const setPosition = (element, i,j,is_setting) => {
    const bounds = boardRef.current.getBoundingClientRect();
    const pieceId = element.id;

    if (is_setting) {
    //  // 掴んだセルのオフセットを考慮
    const targetTop = i * cellSize;
    const targetLeft = j * cellSize;
    console.log(`targetTop: ${targetTop}, targetLeft: ${targetLeft}`);

    element.style.top = `${targetTop}px`;
    element.style.left = `${targetLeft}px`;
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

    // === 1. gridMap からピースを全消去 ===
    const cleanedGrid = removePieceFromGrid(pieceId, gridMap);
    setGridMap(cleanedGrid);
    console.log(`updatedGrid: ${JSON.stringify(cleanedGrid )}`);
    }

    // element.setAttribute('data-pos', pos);
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
