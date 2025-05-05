// components/puzzle/positionUtils.js

export function convertPixelToGrid(mouseX, mouseY, gridRef, cellSize) {
  const bounds = gridRef.current?.getBoundingClientRect();
  if (!bounds) return { x: 0, y: 0 };

  const x = Math.floor((mouseX - bounds.left) / cellSize);
  const y = Math.floor((mouseY - bounds.top) / cellSize);

  return { x, y };
}
