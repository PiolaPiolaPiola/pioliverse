import { useState } from 'react';
import pollito from '../../assets/pollito.svg';
import type { Project } from '../../data/projects';
import { useLanguage } from '../../hooks/useLanguage';
import { ButtonLink } from '../ui/Button';
import { Chip } from '../ui/Chip';
import { Icon } from '../ui/Icon';
import './vault.css';

const pad = (n: number) => String(n).padStart(2, '0');

/** Bóveda gamer: la puerta gira al abrirla y revela el proyecto. */
export function Vault({ project }: { project: Project }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const p = t.projects;
  const level = `${p.level} ${pad(project.level)}`;

  return (
    <div className="vault">
      <div className="vault__inner" aria-hidden={!open} inert={!open}>
        <div className="vault__shot">
          <img src={project.image} alt={`${p.screenshotAlt} ${project.name}`} loading="lazy" />
        </div>
        <div className="vault__body">
          <div className="mono vault__level">
            {level} · {p.unlocked}
          </div>
          <h3 className="display vault__name">{project.name}</h3>
          <p className="vault__desc">{p.items[project.id]}</p>
          <div className="vault__tags">
            {project.tags.map((tag) => (
              <Chip key={tag} small>
                {tag}
              </Chip>
            ))}
          </div>
          <div className="vault__links">
            {project.links.demo && <ButtonLink small href={project.links.demo}>{p.demo}</ButtonLink>}
            {project.links.front && <ButtonLink small variant="ghost" href={project.links.front}>{p.front}</ButtonLink>}
            {project.links.back && <ButtonLink small variant="ghost" href={project.links.back}>{p.back}</ButtonLink>}
          </div>
        </div>
      </div>

      <div className={`vault__door${open ? ' is-open' : ''}`} aria-hidden={open} inert={open}>
        <span className="vault__bolt" style={{ left: 22, top: 22 }} />
        <span className="vault__bolt" style={{ right: 22, top: 22 }} />
        <span className="vault__bolt" style={{ left: 22, bottom: 22 }} />
        <span className="vault__bolt" style={{ right: 22, bottom: 22 }} />
        <div className="mono vault__door-level">{level}</div>
        <div className="vault__dial">
          <div className="vault__spokes" />
          <img src={pollito} alt="" />
        </div>
        <div className="display vault__door-name">{project.name}</div>
        <button type="button" className="btn vault__open" onClick={() => setOpen(true)}>
          <Icon name="unlock" size={18} strokeWidth={2.5} />
          {p.open}
        </button>
      </div>
    </div>
  );
}
