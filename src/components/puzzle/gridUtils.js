// components/puzzle/gridUtils.js

export function canPlacePiece(grid, piece, pos) {
  for (let i = 0; i < piece.shape.length; i++) {
    for (let j = 0; j < piece.shape[i].length; j++) {
      if (piece.shape[i][j] === 0) continue;

      const y = pos.y + i;
      const x = pos.x + j;

      if (
        y < 0 || y >= grid.length ||
        x < 0 || x >= grid[0].length ||
        grid[y][x].occupiedBy !== null
      ) return false;
    }
  }
  return true;
}

export function placePiece(grid, piece, pos) {
  const newGrid = grid.map(row => row.map(cell => ({ ...cell })));
  for (let i = 0; i < piece.shape.length; i++) {
    for (let j = 0; j < piece.shape[i].length; j++) {
      if (piece.shape[i][j] === 1) {
        const y = pos.y + i;
        const x = pos.x + j;
        newGrid[y][x].occupiedBy = piece.professorId;
      }
    }
  }
  return newGrid;
}

export function clearPieceFromGrid(grid, piece) {
  if (!piece.pos) return grid;

  const newGrid = grid.map(row => row.map(cell => ({ ...cell })));

  for (let i = 0; i < piece.shape.length; i++) {
    for (let j = 0; j < piece.shape[i].length; j++) {
      if (piece.shape[i][j] === 1) {
        const y = piece.pos.y + i;
        const x = piece.pos.x + j;
        if (newGrid[y][x]?.occupiedBy === piece.professorId) {
          newGrid[y][x].occupiedBy = null;
        }
      }
    }
  }

  return newGrid;
}
