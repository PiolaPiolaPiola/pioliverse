import { useLanguage } from '../../hooks/useLanguage';
import { Card } from '../ui/Card';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import { OrbitPhoto } from './OrbitPhoto';
import './sections.css';

export function About() {
  const { t } = useLanguage();
  const { record } = t.about;

  return (
    <section id="sobre-mi" className="band">
      <div className="container section-pad about">
        <Reveal className="about__photo">
          <OrbitPhoto alt={t.about.photoAlt} />
        </Reveal>

        <div className="about__copy">
          <SectionHeader label={t.about.label} title={t.about.title} />
          <Reveal delay={0.1}>
            <p className="lead">
              {t.about.p1.map((part, i) => (typeof part === 'string' ? part : <strong key={i}>{part.b}</strong>))}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="lead">{t.about.p2}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="code-card mono" aria-label="C# record">
              <div>
                <span style={{ color: '#FE91B1' }}>public record</span> <span style={{ color: '#FED715' }}>Aleja</span>(
              </div>
              <div className="code-card__line"><span className="code-card__key">{record.keys.rol}</span>: {record.rol},</div>
              <div className="code-card__line"><span className="code-card__key">{record.keys.base}</span>: {record.base},</div>
              <div className="code-card__line"><span className="code-card__key">{record.keys.powers}</span>: {record.powers},</div>
              <div className="code-card__line"><span className="code-card__key">{record.keys.studies}</span>: {record.studies});</div>
            </div>
          </Reveal>
          <Reveal delay={0.25} className="stats">
            {t.about.stats.map((s) => (
              <Card key={s.label} className="stat">
                <div className="display stat__value">{s.value}</div>
                <div className="mono stat__label">{s.label}</div>
              </Card>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
