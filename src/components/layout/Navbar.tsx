import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import { languages } from '../../i18n';
import { Icon } from '../ui/Icon';
import { Logo } from '../ui/Logo';
import './layout.css';

export function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const links = [
    { href: '#sobre-mi', label: t.nav.about },
    { href: '#stack', label: t.nav.stack },
    { href: '#experiencia', label: t.nav.experience },
    { href: '#proyectos', label: t.nav.projects },
    { href: '#contacto', label: t.nav.contact },
  ];

  return (
    <header className="navbar">
      <nav className="navbar__inner">
        <a href="#inicio" className="navbar__brand">
          <Logo size={46} alt="Logo Pioliverse" />
          <span className="mono navbar__name">
            pioliverse<span>.dev</span>
          </span>
        </a>

        <div className="navbar__links">
          {links.map((l) => (
            <a key={l.href} className="navlink" href={l.href}>
              {l.label}
            </a>
          ))}
        </div>

        <div className="navbar__actions">
          <div className="lang-switch mono" role="group" aria-label={t.nav.langLabel}>
            {languages.map((l) => (
              <button
                key={l}
                type="button"
                className={l === lang ? 'is-active' : ''}
                aria-pressed={l === lang}
                onClick={() => setLang(l)}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button type="button" className="icon-btn" aria-label={t.nav.themeToggle} onClick={toggleTheme}>
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
          </button>
        </div>
      </nav>
    </header>
  );
}
