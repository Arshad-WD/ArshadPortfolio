export const COLS = 4;
export const ROWS = 6;

// Base dimensions (for the 405px-wide iPhone shell on desktop)
const BASE_WIDTH = 395; // inner content width of the shell
export const CELL = 60;
export const GAP = 26;

export const START_X = 27;
export const START_Y = 110;

// total grid size
export const GRID_WIDTH =
  COLS * CELL + (COLS - 1) * GAP;

export const GRID_HEIGHT =
  ROWS * (CELL + GAP);

/**
 * Get responsive grid position based on screen width.
 * On real mobile (full screen), positions scale proportionally.
 * On desktop shell (405px), uses the original fixed values.
 */
export function getResponsiveValues() {
  if (typeof window === "undefined") {
    return { startX: START_X, startY: START_Y, cell: CELL, gap: GAP };
  }

  const screenWidth = window.innerWidth;
  const isMobile = screenWidth < 640;

  if (!isMobile) {
    // Desktop shell: fixed values
    return { startX: START_X, startY: START_Y, cell: CELL, gap: GAP };
  }

  // Real mobile: scale proportionally to screen width
  const scale = screenWidth / BASE_WIDTH;
  const cell = Math.round(CELL * scale);
  const gap = Math.round(GAP * scale);
  const totalGridWidth = COLS * cell + (COLS - 1) * gap;
  const startX = Math.round((screenWidth - totalGridWidth) / 2);
  const startY = Math.round(110 * scale);

  return { startX, startY, cell, gap };
}

export function gridToXY(index: number) {
  const { startX, startY, cell, gap } = getResponsiveValues();
  const col = index % COLS;
  const row = Math.floor(index / COLS);

  return {
    x: startX + col * (cell + gap),
    y: startY + row * (cell + gap),
  };
}

export function xyToGrid(x: number, y: number) {
  const { startX, startY, cell, gap } = getResponsiveValues();
  const col = Math.round((x - startX) / (cell + gap));
  const row = Math.round((y - startY) / (cell + gap));

  const safeCol = Math.max(0, Math.min(COLS - 1, col));
  const safeRow = Math.max(0, row);

  return safeRow * COLS + safeCol;
}
