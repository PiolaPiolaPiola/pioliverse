import { useMemo, useRef, type CSSProperties } from 'react';
import { monoIcons } from '../../data/icons';
import { marqueeTechs, stackGroups, techLabel } from '../../data/stack';
import { useLanguage } from '../../hooks/useLanguage';
import { useJustifiedStack } from '../../hooks/useJustifiedStack';
import { Card } from '../ui/Card';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import { TechBadge } from './TechBadge';
import './sections.css';

const GRID_GAP = 20;

export function Stack() {
  const { t, lang } = useLanguage();
  const gridRef = useRef<HTMLDivElement>(null);
  const rows = useJustifiedStack(gridRef, lang);

  const cellStyles = useMemo(() => {
    const styles = new Map<number, CSSProperties>();
    rows?.forEach((row) => {
      const gaps = GRID_GAP * (row.length - 1);
      row.forEach(({ index, share }) => {
        styles.set(index, { flex: `1 1 calc((100% - ${gaps}px) * ${share.toFixed(4)} - 1px)` });
      });
    });
    return styles;
  }, [rows]);

  return (
    <section id="stack" className="stack">
      <div className="container stack__inner">
        <SectionHeader label={t.stack.label} title={t.stack.title} />
        <div ref={gridRef} className="stack__grid">
          {stackGroups.map((g, i) => (
            <Reveal key={g.key} delay={i * 0.08} style={{ display: 'flex', ...cellStyles.get(i) }}>
              <Card className="stack__card" data-stack-card={i}>
                <div className="stack__card-head">
                  <h3 className="display">{t.stack.groups[g.key]}</h3>
                  <span className="mono">{g.file}</span>
                </div>
                <div className="stack__items">
                  {g.items.map((it) => (
                    <TechBadge key={techLabel(it.name, 'en')} tech={it} />
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="marquee-band" aria-hidden="true">
        <div className="marquee">
          {[...marqueeTechs, ...marqueeTechs].map((m, i) => (
            <div key={`${m.name}-${i}`} className="marquee__item">
              <img src={m.icon} alt="" className={monoIcons.has(m.icon) ? 'icon-mono' : undefined} />
              <span className="mono">{m.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
