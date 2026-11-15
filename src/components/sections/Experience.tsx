import { useLanguage } from '../../hooks/useLanguage';
import { Card } from '../ui/Card';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import './sections.css';

const SHA_LENGTH = { pr: 10, commit: 7 } as const;

type ShaKind = keyof typeof SHA_LENGTH;

function fnv1a(text: string) {
  let h = 0x811c9dc5;
  for (const ch of text) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, '0');
}

function fakeSha(seed: string, kind: ShaKind = 'commit') {
  const length = SHA_LENGTH[kind];
  let sha = '';
  for (let round = 0; sha.length < length; round++) {
    sha += fnv1a(round === 0 ? seed : `${seed}#${round}`);
  }
  return sha.slice(0, length);
}

export function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experiencia" className="band">
      <div className="container section-pad experience">
        <SectionHeader label={t.experience.label} title={t.experience.title} />

        <div className="timeline">
          <div aria-hidden="true" className="timeline__line" />
          {t.experience.jobs.map((job, i) => (
            <Reveal key={job.pr} delay={i * 0.1}>
              <Card as="article" className="job">
                <span aria-hidden="true" className={`job__dot${job.head ? ' job__dot--head' : ''}`} />
                <div className="mono job__branch">
                  <span>
                    <span className="job__branch-name">{job.branch}</span> <span aria-hidden="true">→</span> {t.experience.base}
                  </span>
                  <span className="job__merged">(merged)</span>
                  <span>· {fakeSha(`pr-${job.pr}`, 'pr')}</span>
                </div>
                <h3 className={`display job__role${job.head ? ' job__role--head' : ''}`}>
                  {job.role} <span>{t.experience.at}</span> <span className="job__pr">#{job.pr}</span>
                </h3>
                <div className="job__period">{job.period}</div>
                <div className="job__commits">
                  {job.commits.map((c, j) => (
                    <div key={c.type + c.msg} className="commit">
                      <span className="commit__tag" tabIndex={0} data-hash={fakeSha(`${job.pr}-${j}`)}>
                        {c.type}
                      </span>
                      <span className="muted">{c.msg}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
