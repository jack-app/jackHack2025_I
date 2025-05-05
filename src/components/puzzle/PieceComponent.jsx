// components/puzzle/PieceComponent.jsx
import React from 'react';

export default function PieceComponent({
  piece,
  cellSize,
  position,
  boardRef,
  onDragStart,
  onDragEnd,
}) {
  const bounds = boardRef.current?.getBoundingClientRect();
  if (!bounds) return null;

  const top = piece.pos
    ? piece.pos.y * cellSize + bounds.top + 1
    : piece.initialTop || 0;

  const left = piece.pos
    ? piece.pos.x * cellSize + bounds.left + 1
    : piece.initialLeft || 0;

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      style={{
        position: 'absolute',
        top: `${position?.top ?? top}px`,
        left: `${position?.left ??left}px`,
        transform: `scale(${piece.scale})`,
        zIndex: piece.pos ? 1 : 100,
        transition: 'top 0.2s, left 0.2s, transform 0.1s',
      }}
    >
      {piece.shape.map((row, i) =>
        row.map((cell, j) =>
          cell === 1 ? (
            <div
              key={`${i}-${j}`}
              style={{
                position: 'absolute',
                top: `${i * cellSize}px`,
                left: `${j * cellSize}px`,
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                backgroundColor: 'blue',
                border: '1px solid white',
                boxSizing: 'border-box',
              }}
            />
          ) : null
        )
      )}
    </div>
  );
}
