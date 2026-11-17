import { useLanguage } from '../../hooks/useLanguage';
import { useSha1 } from '../../hooks/useSha1';
import { es } from '../../i18n/es';
import { Card } from '../ui/Card';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import './sections.css';

const SHA_LENGTH = { pr: 10, commit: 7 } as const;

type ShaKind = keyof typeof SHA_LENGTH;

const sourceJobs = es.experience.jobs;
const prTexts = sourceJobs.map((job) => job.role);
const commitTexts = sourceJobs.map((job) => job.commits.map((c) => `${c.type}: ${c.msg}`));
const allTexts = [...prTexts, ...commitTexts.flat()];

function shortSha(hashes: Record<string, string>, text: string | undefined, kind: ShaKind) {
  const hash = text ? hashes[text] : undefined;
  return hash ? hash.slice(0, SHA_LENGTH[kind]) : '·'.repeat(SHA_LENGTH[kind]);
}

export function Experience() {
  const { t } = useLanguage();
  const hashes = useSha1(allTexts);

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
                  <span>· {shortSha(hashes, prTexts[i], 'pr')}</span>
                </div>
                <h3 className={`display job__role${job.head ? ' job__role--head' : ''}`}>
                  {job.role} <span>{t.experience.at}</span> <span className="job__pr">#{job.pr}</span>
                </h3>
                <div className="job__period">{job.period}</div>
                <div className="job__commits">
                  {job.commits.map((c, j) => (
                    <div key={c.type + c.msg} className="commit">
                      <span className="commit__tag" tabIndex={0} data-hash={shortSha(hashes, commitTexts[i]?.[j], 'commit')}>
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
