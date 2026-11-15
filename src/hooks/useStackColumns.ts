import { useLayoutEffect, useState, type RefObject } from 'react';

const GRID_GAP = 20;
const BADGE_GAP = 10;
const CARD_PADDING = 48;
const MIN_CARD_WIDTH = 260;
const MAX_COLUMNS = 4;
const MAX_LINES = 5;

function countLines(badgeWidths: number[], innerWidth: number) {
  let lines = 1;
  let rowWidth = 0;
  for (const width of badgeWidths) {
    if (rowWidth === 0) {
      rowWidth = width;
    } else if (rowWidth + BADGE_GAP + width <= innerWidth) {
      rowWidth += BADGE_GAP + width;
    } else {
      lines++;
      rowWidth = width;
    }
  }
  return lines;
}

export function bestColumns(gridWidth: number, cards: number[][]) {
  const fitting = Math.floor((gridWidth + GRID_GAP) / (MIN_CARD_WIDTH + GRID_GAP));
  let cols = Math.max(1, Math.min(MAX_COLUMNS, fitting));
  while (cols > 1) {
    const innerWidth = (gridWidth - GRID_GAP * (cols - 1)) / cols - CARD_PADDING;
    const allTooTall = cards.every((badges) => countLines(badges, innerWidth) > MAX_LINES);
    if (!allTooTall) break;
    cols--;
  }
  return cols;
}

export function useStackColumns(gridRef: RefObject<HTMLElement | null>, lang: string) {
  const [cols, setCols] = useState(3);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const update = () => {
      const cards = [...grid.querySelectorAll('.stack__items')].map((items) =>
        [...items.querySelectorAll<HTMLElement>('.tech-badge')].map((badge) => badge.offsetWidth),
      );
      setCols(bestColumns(grid.clientWidth, cards));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(grid);
    return () => observer.disconnect();
  }, [gridRef, lang]);

  return cols;
}
