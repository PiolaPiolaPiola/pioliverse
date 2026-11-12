import { useLanguage } from '../../hooks/useLanguage';
import { Logo } from '../ui/Logo';
import './layout.css';

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo size={38} />
          <span className="mono muted" style={{ fontSize: 14 }}>
            {t.footer.made}
          </span>
        </div>
        <span className="mono" style={{ fontSize: 13, color: 'var(--brandText)' }}>
          {t.footer.bye}
        </span>
      </div>
    </footer>
  );
}
