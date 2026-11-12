import { useLanguage } from '../../hooks/useLanguage';
import { Card } from '../ui/Card';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import './sections.css';

export function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experiencia" className="band">
      <div className="container section-pad experience">
        <SectionHeader label={t.experience.label} title={t.experience.title} />

        <div className="timeline">
          <div aria-hidden="true" className="timeline__line" />
          {t.experience.jobs.map((job, i) => (
            <Reveal key={job.hash} delay={i * 0.1}>
              <Card as="article" className="job">
                <span aria-hidden="true" className={`job__dot${job.head ? ' job__dot--head' : ''}`} />
                <div className="mono job__meta">
                  <span className="job__hash">{job.hash}</span>
                  {job.head && <span style={{ color: 'var(--brandText)' }}> (HEAD -&gt; main)</span>} · {job.period}
                </div>
                <h3 className={`display job__role${job.head ? ' job__role--head' : ''}`}>
                  {job.role} <span>{t.experience.at}</span>
                </h3>
                <div className="job__commits">
                  {job.commits.map((c) => (
                    <div key={c.type + c.msg} className="commit">
                      <span className="commit__tag">{c.type}</span>
                      <span className="muted">{c.msg}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <Card className="studies">
            <div className="mono studies__cmd">{t.experience.studiesCmd}</div>
            <div className="studies__grid">
              {t.experience.studies.map((s) => (
                <div key={s.title}>
                  <div style={{ fontWeight: 700 }}>{s.title}</div>
                  <div className="muted" style={{ fontSize: 15 }}>{s.detail}</div>
                </div>
              ))}
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
