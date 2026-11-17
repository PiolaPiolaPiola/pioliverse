export interface CardMetrics {
  badges: number[];
  headWidth: number;
}

export interface LayoutMetrics {
  cards: CardMetrics[];
  lineHeight: number;
  chromeHeight: number;
}

export interface LayoutOptions {
  gap: number;
  badgeGap: number;
  paddingX: number;
  minCardWidth: number;
  maxPerRow: number;
}

export interface PlacedCard {
  index: number;
  share: number;
}

export type JustifiedRow = PlacedCard[];

const MAX_LINES = 60;

export function countLines(badges: number[], innerWidth: number, badgeGap: number) {
  let lines = 1;
  let rowWidth = 0;
  for (const width of badges) {
    if (rowWidth === 0) {
      rowWidth = width;
    } else if (rowWidth + badgeGap + width <= innerWidth) {
      rowWidth += badgeGap + width;
    } else {
      lines++;
      rowWidth = width;
    }
  }
  return lines;
}

function narrowestWidth(card: CardMetrics, opts: LayoutOptions) {
  const widestBadge = card.badges.length ? Math.max(...card.badges) : 0;
  return Math.ceil(Math.max(opts.minCardWidth, card.headWidth + opts.paddingX, widestBadge + opts.paddingX));
}

function minWidthForLines(card: CardMetrics, lines: number, maxWidth: number, opts: LayoutOptions) {
  const fits = (width: number) => countLines(card.badges, width - opts.paddingX, opts.badgeGap) <= lines;
  let low = narrowestWidth(card, opts);
  if (low > maxWidth || !fits(maxWidth)) return null;
  if (fits(low)) return low;
  let high = Math.floor(maxWidth);
  while (high - low > 1) {
    const mid = Math.floor((low + high) / 2);
    if (fits(mid)) high = mid;
    else low = mid;
  }
  return high;
}

function layoutRow(cards: CardMetrics[], containerWidth: number, opts: LayoutOptions) {
  const available = containerWidth - opts.gap * (cards.length - 1);
  if (cards.length > 1 && available < opts.minCardWidth * cards.length) return null;

  for (let lines = 1; lines <= MAX_LINES; lines++) {
    const widths = cards.map((card) => minWidthForLines(card, lines, available, opts));
    if (widths.some((w) => w === null)) continue;
    const needed = (widths as number[]).reduce((sum, w) => sum + w, 0);
    if (needed > available) continue;
    return { lines, widths: widths as number[] };
  }
  return null;
}

export function justifyCards(metrics: LayoutMetrics, containerWidth: number, opts: LayoutOptions): JustifiedRow[] {
  const { cards, lineHeight, chromeHeight } = metrics;
  const n = cards.length;
  const best: { height: number; from: number; row: { lines: number; widths: number[] } | null }[] = [
    { height: 0, from: 0, row: null },
  ];

  for (let end = 1; end <= n; end++) {
    best[end] = { height: Infinity, from: end - 1, row: null };
    for (let size = 1; size <= Math.min(opts.maxPerRow, end); size++) {
      const start = end - size;
      if (!Number.isFinite(best[start].height)) continue;
      const row = layoutRow(cards.slice(start, end), containerWidth, opts);
      if (!row) continue;
      const rowHeight = chromeHeight + row.lines * lineHeight;
      const height = best[start].height + rowHeight + (start > 0 ? opts.gap : 0);
      if (height < best[end].height) best[end] = { height, from: start, row };
    }
  }

  const rows: JustifiedRow[] = [];
  for (let end = n; end > 0; end = best[end].from) {
    const { from, row } = best[end];
    if (!row) {
      for (let i = end - 1; i >= from; i--) rows.unshift([{ index: i, share: 1 }]);
      continue;
    }
    const total = row.widths.reduce((sum, w) => sum + w, 0);
    rows.unshift(row.widths.map((w, i) => ({ index: from + i, share: w / total })));
  }
  return rows;
}
