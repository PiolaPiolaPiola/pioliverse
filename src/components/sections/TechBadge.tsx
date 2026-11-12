import type { Tech } from '../../data/stack';

/** Etiqueta de tecnología: logo oficial si existe, si no un "#" en estilo código. */
export function TechBadge({ tech }: { tech: Tech }) {
  return (
    <span className="tech-badge">
      {tech.icon ? <img src={tech.icon} alt="" /> : <span className="mono tech-badge__hash">#</span>}
      {tech.name}
    </span>
  );
}
