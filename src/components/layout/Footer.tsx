import { useLanguage } from '../../hooks/useLanguage';
import { Logo } from '../ui/Logo';
import './layout.css';

interface FooterProps {
  visitor: number | null;
  total: number | null;
}

export function Footer({ visitor, total }: FooterProps) {
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
        <div className="footer__end">
          {visitor !== null && (
            <span className="mono footer__visitor">
              {t.visitor.badge(visitor)}
              {total !== null && ` · ${t.visitor.total(total)}`}
            </span>
          )}
          <span className="mono" style={{ fontSize: 13, color: 'var(--brandText)' }}>
            {t.footer.bye}
          </span>
        </div>
      </div>
    </footer>
  );
}
