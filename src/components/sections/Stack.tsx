import { marqueeTechs, stackGroups } from '../../data/stack';
import { useLanguage } from '../../hooks/useLanguage';
import { Card } from '../ui/Card';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import { TechBadge } from './TechBadge';
import './sections.css';

export function Stack() {
  const { t } = useLanguage();

  return (
    <section id="stack" className="stack">
      <div className="container stack__inner">
        <SectionHeader label={t.stack.label} title={t.stack.title} />
        <div className="stack__grid">
          {stackGroups.map((g, i) => (
            <Reveal key={g.key} delay={i * 0.08} style={{ display: 'flex' }}>
              <Card className="stack__card">
                <div className="stack__card-head">
                  <h3 className="display">{t.stack.groups[g.key]}</h3>
                  <span className="mono">{g.file}</span>
                </div>
                <div className="stack__items">
                  {g.items.map((it) => (
                    <TechBadge key={it.name} tech={it} />
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
              <img src={m.icon} alt="" />
              <span className="mono">{m.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
