// components/puzzle/PuzzleGrid.jsx
import React from 'react';
import PuzzleCell from './PuzzleCell';

export default function PuzzleGrid({ grid, cellSize }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${grid[0].length}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${grid.length}, ${cellSize}px)`,
        gap: '0px',
        border: '2px solid black',
        position: 'relative',
      }}
    >
      {grid.flat().map((cell) => (
        <PuzzleCell key={`${cell.i}-${cell.j}`} cell={cell} cellSize={cellSize} />
      ))}
    </div>
  );
}
