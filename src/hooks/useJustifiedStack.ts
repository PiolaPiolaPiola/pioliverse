import { useLayoutEffect, useState, type RefObject } from 'react';
import { justifyCards, type CardMetrics, type JustifiedRow, type LayoutOptions } from '../utils/justifiedLayout';

const OPTIONS: LayoutOptions = {
  gap: 20,
  badgeGap: 10,
  paddingX: 48,
  minCardWidth: 240,
  maxPerRow: 4,
};
const CARD_PADDING_Y = 48;
const HEAD_GAP = 16;
const HEAD_INNER_GAP = 16;

function measure(grid: HTMLElement) {
  const probe = document.createElement('div');
  probe.setAttribute('aria-hidden', 'true');
  probe.style.cssText = 'position:absolute;left:-10000px;top:0;visibility:hidden;display:flex;flex-direction:column;align-items:flex-start;white-space:nowrap;';
  grid.appendChild(probe);

  const cards = [...grid.querySelectorAll<HTMLElement>('[data-stack-card]')]
    .sort((a, b) => Number(a.dataset.stackCard) - Number(b.dataset.stackCard))
    .map<CardMetrics>((card) => {
      const badges = [...card.querySelectorAll<HTMLElement>('.tech-badge')].map((badge) => {
        const clone = badge.cloneNode(true) as HTMLElement;
        probe.appendChild(clone);
        return Math.ceil(clone.getBoundingClientRect().width);
      });
      const head = card.querySelector<HTMLElement>('.stack__card-head');
      let headWidth = 0;
      if (head) {
        const clone = head.cloneNode(true) as HTMLElement;
        clone.style.cssText = `display:inline-flex;gap:${HEAD_INNER_GAP}px;width:max-content;`;
        probe.appendChild(clone);
        headWidth = Math.ceil(clone.getBoundingClientRect().width);
      }
      return { badges, headWidth };
    });

  const sampleBadge = probe.querySelector<HTMLElement>('.tech-badge');
  const sampleHead = probe.querySelector<HTMLElement>('.stack__card-head');
  const badgeHeight = sampleBadge ? sampleBadge.getBoundingClientRect().height : 40;
  const headHeight = sampleHead ? sampleHead.getBoundingClientRect().height : 30;
  probe.remove();

  return {
    cards,
    lineHeight: badgeHeight + OPTIONS.badgeGap,
    chromeHeight: CARD_PADDING_Y + headHeight + HEAD_GAP - OPTIONS.badgeGap,
  };
}

export function useJustifiedStack(gridRef: RefObject<HTMLElement | null>, lang: string) {
  const [rows, setRows] = useState<JustifiedRow[] | null>(null);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    let lastWidth = -1;
    const update = (force = false) => {
      const width = grid.clientWidth;
      if (!force && width === lastWidth) return;
      lastWidth = width;
      setRows(justifyCards(measure(grid), width, OPTIONS));
    };

    update(true);
    const observer = new ResizeObserver(() => update());
    observer.observe(grid);
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) update(true);
    });
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [gridRef, lang]);

  return rows;
}
