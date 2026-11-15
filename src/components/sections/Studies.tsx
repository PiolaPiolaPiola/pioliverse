import { useLanguage } from '../../hooks/useLanguage';
import { Card } from '../ui/Card';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import './sections.css';

export function Studies() {
  const { t } = useLanguage();

  return (
    <section id="estudios">
      <div className="container section-pad studies">
        <SectionHeader label={t.studies.label} title={t.studies.title} />
        <div className="studies__grid">
          {t.studies.items.map((s, i) => (
            <Reveal key={s.branch} delay={i * 0.08} style={{ display: 'flex' }}>
              <Card as="article" className="study">
                <span className="mono study__branch">* {s.branch}</span>
                <h3 className="display study__title">{s.title}</h3>
                <span className="study__detail">{s.detail}</span>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
