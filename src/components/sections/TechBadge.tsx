import { monoIcons } from '../../data/icons';
import { techLabel, type Tech } from '../../data/stack';
import { useLanguage } from '../../hooks/useLanguage';

/** Etiqueta de tecnología: logo oficial si existe, si no un "#" en estilo código. */
export function TechBadge({ tech }: { tech: Tech }) {
  const { lang } = useLanguage();
  return (
    <span className="tech-badge">
      {tech.icon ? (
        <img src={tech.icon} alt="" className={monoIcons.has(tech.icon) ? 'icon-mono' : undefined} />
      ) : (
        <span className="mono tech-badge__hash">#</span>
      )}
      {techLabel(tech.name, lang)}
    </span>
  );
}
