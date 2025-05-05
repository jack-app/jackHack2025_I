// src/pages/PuzzlePage.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../styles/pages/PuzzlePage.css';


const PuzzlePage = () => {
  const cellSize = 40;
  const pieceSize = 79;
  const groundPieceSizeRatio = 0.4;

  const [activePiece, setActivePiece] = useState(null);
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);
  const [isClick, setIsClick] = useState(false);
  const [displayMonth, setDisplayMonth] = useState(0);
  const [initialState, setInitialState] = useState(0n);
  
  const boardRef = useRef(null);
  const storedRecordRef = useRef(null);

  const pieceInfo = [
    [8623621632n,135200768n,25837175808n,251723776n,17247241728n,252182528n,25803489792n,17760256n,],
    [8623882752n,68091904n,17280795648n,251789312n,17247372288n,251920384n,8690729472n,34537472n,],
    [17247371776n,118226944n,17280664064n,51249152n,8623883264n,201785344n,8690861056n,235077632n,],
    [33689088n,134745600n,235407360n,235012608n,0n,0n,0n,0n,],
    [201590272n,34473984n,0n,0n,0n,0n,100928512n,135135744n,],
    [920064n,100795904n,658944n,100926976n,0n,0n,0n,0n,],
    [790016n,101057536n,919040n,33949184n,396800n,67503616n,920576n,101057024n,],
    [921088n,101058048n,0n,0n,0n,0n,0n,0n,],
  ];

  const monthlyEmoji = ["🎍","🍫","🎎", "🌸","🎏","💠", "🎋","🎆","🎑", "🎃","🍁","🎄"];

  useEffect(() => {
    init();
    resetPuzzlePiece();
  }, []);

  const init = () => {
    const today = new Date();
    const m = today.getMonth() + 1;
    const d = today.getDate();

    // Set today's date classes
    const monthElement = document.querySelector(`#m${m}`);
    const dayElement = document.querySelector(`#d${d}`);
    if (monthElement) monthElement.classList.add("today");
    if (dayElement) dayElement.classList.add("today");

    // Calculate initial state
    const newInitialState = 72340172846498303n + 
      (1n << BigInt(m + Math.floor((m-1)/6) * 2 + 8)) + 
      (1n << BigInt(d + Math.floor((d-1)/7) + 24));
    setInitialState(newInitialState);

    getRecordTable(m);
  };

  const resetPuzzlePiece = () => {
    const puzzlePieces = document.querySelectorAll('.puzzle-piece');
    puzzlePieces.forEach(piece => {
      piece.style.left = '';
      piece.style.top = '';
      piece.setAttribute("data-scale", groundPieceSizeRatio);
      piece.setAttribute("data-state", 0);
      piece.setAttribute("data-pos", 0);
      piece.classList.remove("hint");
      setStyle(piece);
    });
    resetHint();
  };

  const resetHint = () => {
    // Implement hint reset functionality
  };

  const onTouchStart = (event) => {
    if (event.target.parentElement.classList.contains('puzzle-piece')) {
      if (event.target.parentElement.classList.contains("hint")) return;

      event.preventDefault();
      const piece = event.target.parentElement;
      setActivePiece(piece);
      piece.style.zIndex = 1000;
      
      // Handle touch or mouse event
      const touch = event.type === 'touchstart' ? event.touches[0] : event;
      setDx(touch.pageX - piece.offsetLeft);
      setDy(touch.pageY - piece.offsetTop);
      setIsClick(true);
    }
  };

  const onTouchMove = (event) => {
    if (activePiece) {
      // Handle touch or mouse event
      const touch = event.type === 'touchmove' ? event.touches[0] : event;
      activePiece.style.left = `${touch.pageX - dx}px`;
      activePiece.style.top = `${touch.pageY - dy}px`;
      activePiece.setAttribute("data-scale", 1);
      setStyle(activePiece);
      setIsClick(false);
    }
  };

  const onTouchEnd = (event) => {
    if (activePiece) {
      event.preventDefault();
      // Handle touch or mouse event
      const touch = event.type === 'touchend' ? event.changedTouches[0] : event;

      // Single click -> rotate/reverse
      if (isClick) {
        rotateReverseActivePiece();
      }
      // Drag -> move
      else {
        placeActivePiece(touch);
      }

      // Finalize
      setStyle(activePiece);
      activePiece.style.zIndex = 0;
      

      setActivePiece(null);
      setDx(0);
      setDy(0);
    }
  };

  const rotateReverseActivePiece = () => {
    let state = parseInt(activePiece.getAttribute("data-state") || "0");
    let newState = (state + 1) % 8;

    // state = {0, 1, 2, 3}
    if (["piece4", "piece6"].includes(activePiece.id)) {
      newState %= 4;
    }
    // state = {0, 1, 6, 7}
    else if (activePiece.id === "piece5") {
      if (newState === 2) newState += 4;
    }
    // state = {0, 1}
    else if (activePiece.id === "piece8") {
      newState %= 2;
    }

    activePiece.setAttribute("data-state", newState);
  };

  const placeActivePiece = (touch) => {
    const bounds = boardRef.current.getBoundingClientRect();
    let pos = 0;

    if (bounds.left < touch.pageX &&
        bounds.right > touch.pageX &&
        bounds.top < touch.pageY &&
        bounds.bottom > touch.pageY) {

      const state = parseInt(activePiece.getAttribute("data-state") || "0");
      // 2x3 pieces need offset when rotated
      let posOffset = 0;
      if (["piece6", "piece7", "piece8"].includes(activePiece.id) && (state % 2 === 1)) {
        posOffset = cellSize / 2;
      }
      
      const j = Math.floor((touch.pageX - dx - bounds.left + (cellSize / 2) + posOffset) / cellSize);
      const i = Math.floor((touch.pageY - dy - bounds.top + (cellSize / 2) - posOffset) / cellSize);
      pos = (i+1)*8 + (j+1);
    }
    
    setPosition(activePiece, pos);
  };

  const setStyle = (element) => {
    const scale = parseFloat(element.getAttribute("data-scale") || "0.5");
    const state = parseInt(element.getAttribute("data-state") || "0");

    let rotation = state * 90;
    let reverse = 1;
    if (state >= 4) {
      rotation = (8 - state) * 90;
      reverse = -1;
    }

    element.style.transform = `scale(${scale * reverse}, ${scale}) rotate(${rotation}deg)`;
  };

  const setPosition = (element, pos) => {
    const bounds = boardRef.current.getBoundingClientRect();
    const state = parseInt(element.getAttribute("data-state") || "0");

    if (pos > 0) {
      // 2x3 pieces need offset when rotated
      let posOffset = 0;
      if (["piece6", "piece7", "piece8"].includes(element.id) && (state % 2 === 1)) {
        posOffset = cellSize / 2;
      }
      
      const i = Math.floor(pos / 8) - 1;
      const j = pos % 8 - 1;
      element.style.left = `${j * cellSize + bounds.left - posOffset + 1}px`; // 1px for border
      element.style.top = `${i * cellSize + bounds.top + posOffset + 1}px`;
      element.setAttribute("data-scale", 1);
    } else {
      element.style.left = '';
      element.style.top = '';
      element.setAttribute("data-scale", groundPieceSizeRatio);
    }
    
    element.setAttribute("data-pos", pos);
  };

  const isClear = () => {
    let boardState = initialState;
    const puzzlePieces = document.querySelectorAll('.puzzle-piece');
    
    for (let i = 0; i < puzzlePieces.length; i++) {
      const state = parseInt(puzzlePieces[i].getAttribute("data-state") || "0");
      const pos = BigInt(parseInt(puzzlePieces[i].getAttribute("data-pos") || "0"));
      if (pos === 0n) return false;

      boardState |= (pieceInfo[i][state] << (pos - 9n));
    }
    
    return boardState === (1n << 60n) - 1n;
  };

  const getRecordTable = (month = 0) => {
    const newDisplayMonth = month === 0 ? displayMonth : month;
    setDisplayMonth(newDisplayMonth);

    // Show month display
    for (let m = 1; m <= 12; m++) {
      const cell = document.querySelector(`#rcd-m${m}`);
      if (cell) {
        if (m === newDisplayMonth) {
          cell.classList.add("today");
        } else {
          cell.classList.remove("today");
        }
      }
    }

    // Show day display
    const record = getLocalStorageRecord(newDisplayMonth);
    for (let d = 1; d <= 31; d++) {
      const cell = document.querySelector(`#rcd-d${d}`);
      if (cell) {
        if ((record >> BigInt(d-1)) & 1n) {
          cell.textContent = monthlyEmoji[newDisplayMonth-1];
          cell.classList.add("clear");
        } else {
          cell.textContent = d;
          cell.classList.remove("clear");
        }
        
        // Handle short months
        if ((d === 30 && newDisplayMonth === 2) || (d === 31 && [2,4,6,9,11].includes(newDisplayMonth))) {
          cell.textContent = "";
          cell.classList.add("null");
        } else {
          cell.classList.remove("null");
        }
      }
    }
  };

  const setClearRecord = () => {
    const today = new Date();
    const m = today.getMonth() + 1;
    const d = today.getDate();

    const record = getLocalStorageRecord(m);
    const newRecord = record | (1n << BigInt(d-1));
    setLocalStorageRecord(m, newRecord);

    getRecordTable(m);
  };

  const getLocalStorageRecord = (month) => {
    return BigInt(localStorage.getItem(`apad-rcd-m${month}`) || 0);
  };

  const setLocalStorageRecord = (month, value) => {
    localStorage.setItem(`apad-rcd-m${month}`, value.toString());
  };

  const importRecord = () => {
    const storedRecordStr = storedRecordRef.current.value;
    if (storedRecordStr === "") return;

    const sep = '&';
    const storedRecord = storedRecordStr.split(sep);
    if (storedRecord.length !== 12) return;

    for (let m = 1; m <= 12; m++) {
      const record = getLocalStorageRecord(m);
      const newRecord = decodeBI(storedRecord[m-1]);
      if (newRecord === record) continue;

      setLocalStorageRecord(m, newRecord);
    }
    
    getRecordTable(displayMonth);
  };

  const exportRecord = () => {
    const storedRecord = [];
    const sep = '&';
    const radix = 36;
    
    for (let m = 1; m <= 12; m++) {
      const record = getLocalStorageRecord(m);
      storedRecord.push(encodeBI(record));
    }
    
    storedRecordRef.current.value = storedRecord.join(sep);
  };

  const encodeBI = (value) => {
    const radix = 36;
    return value.toString(radix);
  };

  const decodeBI = (value) => {
    const radix = 36;
    return BigInt(parseInt(value, radix));
  };

  useEffect(() => {
    // Add event listeners
    document.addEventListener('touchmove', onTouchMove, false);
    document.addEventListener('mousemove', onTouchMove, false);
    document.addEventListener('touchend', onTouchEnd, false);
    document.addEventListener('mouseup', onTouchEnd, false);

    // Clean up event listeners
    return () => {
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('mousemove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('mouseup', onTouchEnd);
    };
  }, [activePiece, dx, dy, isClick]);

  // Create board cells
  const renderBoardCells = () => {
    const cells = [];
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        const id = `cell-${i}-${j}`;
        const isNull = (i === 0 && j === 0) || (i === 0 && j === 6) || 
                      (i === 6 && j === 0) || (i === 6 && j === 6);
        
        cells.push(
          <div 
            key={id}
            id={id}
            className={`board-cell ${isNull ? 'null' : ''}`}
          />
        );
      }
    }
    return cells;
  };

  // Create month table
  const renderMonthTable = () => {
    const months = [];
    for (let m = 1; m <= 12; m++) {
      months.push(
        <div 
          key={`m${m}`}
          id={`m${m}`}
          className="board-cell link"
          onClick={() => getRecordTable(m)}
        >
          {m}月
        </div>
      );
    }
    return months;
  };

  // Create day table
  const renderDayTable = () => {
    const days = [];
    for (let d = 1; d <= 31; d++) {
      days.push(
        <div 
          key={`rcd-d${d}`}
          id={`rcd-d${d}`}
          className="board-cell"
        >
          {d}
        </div>
      );
    }
    return days;
  };

  // Create puzzle pieces
  const renderPuzzlePieces = () => {
    // Define the structure of each piece
    const pieceStructures = {
      piece1: { cols: 2, rows: 2, nullCells: [] },
      piece2: { cols: 2, rows: 2, nullCells: [] },
      piece3: { cols: 2, rows: 2, nullCells: [] },
      piece4: { cols: 3, rows: 1, nullCells: [] },
      piece5: { cols: 3, rows: 1, nullCells: [] },
      piece6: { cols: 3, rows: 2, nullCells: [0, 1, 3, 4] },
      piece7: { cols: 3, rows: 2, nullCells: [0, 2, 3, 5] },
      piece8: { cols: 3, rows: 2, nullCells: [0, 2, 3, 4, 5] }
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
        </div>
      </div>

      <div className="ground">
        {renderPuzzlePieces()}
      </div>

      <button onClick={resetPuzzlePiece}>Reset Puzzle</button>

      <div className="record-board-wrapper">
        <div className="record-board">
          {renderMonthTable()}
        </div>
        <div className="record-board">
          {renderDayTable()}
        </div>
      </div>

      <div className="record-import-export">
        <textarea ref={storedRecordRef} id="stored-record"></textarea>
        <button onClick={importRecord}>Import Record</button>
        <button onClick={exportRecord}>Export Record</button>
      </div>
    </div>
  );
};

export default PuzzlePage;