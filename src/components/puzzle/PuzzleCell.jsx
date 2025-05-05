// components/puzzle/PuzzleCell.jsx
import React from 'react';

export default function PuzzleCell({ cell, cellSize }) {
  return (
    <div
      style={{
        width: `${cellSize}px`,
        height: `${cellSize}px`,
        backgroundColor: cell.required ? '#ffeaea' : '#fff',
        border: '1px solid #aaa',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      {cell.occupiedBy && (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#90caf9',
            opacity: 0.6,
          }}
        />
      )}
    </div>
  );
}
