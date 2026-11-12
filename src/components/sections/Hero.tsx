import { contact } from '../../data/contact';
import { useLanguage } from '../../hooks/useLanguage';
import { ButtonLink } from '../ui/Button';
import { Chip } from '../ui/Chip';
import { Icon } from '../ui/Icon';
import { Logo } from '../ui/Logo';
import { Reveal } from '../ui/Reveal';
import { Sparkle } from '../ui/Sparkle';
import './sections.css';

const glyphs = [
  { text: '{ }', className: 'float', style: { left: '6%', top: '18%', fontSize: 40 } },
  { text: '</>', className: 'float-slow', style: { left: '44%', top: '78%', fontSize: 34 } },
  { text: '=>', className: 'float', style: { right: '5%', top: '12%', fontSize: 30, animationDelay: '-2s' } },
  { text: ';', className: 'float-slow', style: { right: '40%', top: '8%', fontSize: 30, animationDelay: '-4s' } },
];

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="inicio" className="hero dotgrid">
      {glyphs.map((g) => (
        <div key={g.text} aria-hidden="true" className={`mono hero__glyph ${g.className}`} style={g.style}>
          {g.text}
        </div>
      ))}

      <div className="container hero__inner">
        <div className="hero__copy">
          <Reveal trigger="load" delay={0.05}>
            <Chip>
              <span className="pulse-dot" />
              {t.hero.available}
            </Chip>
          </Reveal>
          <Reveal trigger="load" delay={0.15} className="mono muted" style={{ fontSize: 16 }}>
            ~/pioliverse <span style={{ color: 'var(--brandText)' }}>$</span> whoami
          </Reveal>
          <Reveal trigger="load" delay={0.25}>
            <h1 className="display hero__title">
              Alejandra
              <br />
              Bedoya León
            </h1>
          </Reveal>
          <Reveal trigger="load" delay={0.35} className="mono hero__role">
            &gt; <span className="typing">Backend .NET Developer</span>
          </Reveal>
          <Reveal trigger="load" delay={0.45}>
            <p className="hero__intro">{t.hero.intro}</p>
          </Reveal>
          <Reveal trigger="load" delay={0.55}>
            <blockquote className="hero__quote">
              <p className="display">“{t.hero.quote}”</p>
              <footer className="mono">{t.hero.quoteBy}</footer>
            </blockquote>
          </Reveal>
          <Reveal trigger="load" delay={0.65} className="hero__ctas">
            <ButtonLink href="#proyectos">
              {t.hero.ctaProjects}
              <Icon name="arrow" size={18} strokeWidth={2.5} />
            </ButtonLink>
            <ButtonLink variant="ghost" href={contact.cvUrl} download={contact.cvFileName}>
              <Icon name="download" size={18} strokeWidth={2.5} />
              {t.hero.ctaCv}
            </ButtonLink>
          </Reveal>
        </div>

        <div className="hero__art">
          <Sparkle size={34} style={{ left: '6%', top: '4%', color: 'var(--brand)' }} />
          <Sparkle size={24} style={{ right: '8%', top: '20%', color: 'var(--pink)', animationDelay: '-1s' }} />
          <Sparkle size={28} style={{ left: '12%', bottom: '6%', color: 'var(--brand)', animationDelay: '-1.8s' }} />
          <div className="float" style={{ width: 'min(400px, 80vw)' }}>
            <Logo
              size="100%"
              alt={t.hero.logoAlt}
              lightStyle={{ filter: 'drop-shadow(0 30px 40px rgba(60,100,0,.25))' }}
              darkStyle={{ filter: 'drop-shadow(0 0 50px rgba(171,254,24,.25))' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
