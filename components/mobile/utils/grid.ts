export const COLS = 4;

/**
 * 🔽 Reduce rows to make screen "shorter"
 * Try 4 or 5. iOS usually shows 4 rows.
 */
export const ROWS = 4;


export const CELL = 72;
export const GAP = 18;


export const START_X = 24;
export const START_Y = 96;

// total grid size
export const GRID_WIDTH =
  COLS * CELL + (COLS - 1) * GAP;

export const GRID_HEIGHT =
  ROWS * (CELL + GAP);

export function gridToXY(index: number) {
  const col = index % COLS;
  const row = Math.floor(index / COLS);

  return {
    x: START_X + col * (CELL + GAP),
    y: START_Y + row * (CELL + GAP),
  };
}

export function xyToGrid(x: number, y: number) {
  const col = Math.round((x - START_X) / (CELL + GAP));
  const row = Math.round((y - START_Y) / (CELL + GAP));

  const safeCol = Math.max(0, Math.min(COLS - 1, col));
  const safeRow = Math.max(0, row);

  return safeRow * COLS + safeCol;
}
