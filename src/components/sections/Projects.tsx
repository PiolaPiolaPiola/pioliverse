import pollito from '../../assets/pollito.svg';
import { projects } from '../../data/projects';
import { useLanguage } from '../../hooks/useLanguage';
import { Chip } from '../ui/Chip';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import { Vault } from './Vault';
import './sections.css';
import './vault.css';

function LockedVault() {
  const { t } = useLanguage();
  return (
    <div className="locked">
      <Icon name="lock" size={44} className="locked__icon" />
      <div className="mono locked__level">{t.projects.locked.level}</div>
      <div className="display locked__title">{t.projects.locked.title}</div>
      <div className="bar"><div /></div>
      <div className="mono muted" style={{ fontSize: 13 }}>{t.projects.locked.loading}</div>
    </div>
  );
}

function BuildingCard() {
  const { t } = useLanguage();
  const b = t.projects.building;
  return (
    <div className="locked locked--building">
      <div className="building__chick">
        <div className="mono building__bubble">{b.bubble}</div>
        <img className="bob" src={pollito} alt={b.alt} />
      </div>
      <div className="mono building__code">{b.code}</div>
      <p className="locked__text">{b.text}</p>
    </div>
  );
}

export function Projects() {
  const { t } = useLanguage();

  return (
    <section id="proyectos" className="section-pad">
      <div className="container projects">
        <div className="projects__head">
          <SectionHeader label={t.projects.label} title={t.projects.title} />
          <Chip>{t.projects.progress}</Chip>
        </div>

        <div className="projects__grid">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <Vault project={p} />
            </Reveal>
          ))}
          <Reveal delay={0.1}>
            <LockedVault />
          </Reveal>
          <Reveal delay={0.2}>
            <BuildingCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
