import { useLanguage } from '../../hooks/useLanguage';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import './sections.css';

export function Dreams() {
  const { t } = useLanguage();

  return (
    <section id="suenos" className="band dreams">
      <div className="container dreams__inner">
        <SectionHeader label={t.dreams.label} title={t.dreams.title} />
        <Reveal delay={0.1}>
          <ul className="dreams__list">
            {t.dreams.items.map((item) => (
              <li key={item} className="dreams__item">
                <span className="dreams__star" aria-hidden="true">✦</span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
