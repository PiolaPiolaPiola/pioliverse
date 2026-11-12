import { Reveal } from './Reveal';

export function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <Reveal>
      <div className="sec-label">{label}</div>
      <h2 className="sec-title">{title}</h2>
    </Reveal>
  );
}
