import { contact } from '../../data/contact';
import { useLanguage } from '../../hooks/useLanguage';
import { ButtonLink } from '../ui/Button';
import { Card } from '../ui/Card';
import { Icon, type IconName } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import './sections.css';

interface ContactItem {
  icon: IconName;
  title: string;
  value: string;
  href: string;
}

function ContactCard({ icon, title, value, href }: ContactItem) {
  const external = href.startsWith('http');
  return (
    <Card as="a" className="contact-card" href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      <span className="icon-btn icon-btn--soft">
        <Icon name={icon} />
      </span>
      <span style={{ minWidth: 0 }}>
        <span className="contact-card__title">{title}</span>
        <span className="mono contact-card__value">{value}</span>
      </span>
    </Card>
  );
}

export function Contact() {
  const { t } = useLanguage();

  const items: ContactItem[] = [
    { icon: 'mail', title: t.contact.email, value: contact.email, href: `mailto:${contact.email}` },
    { icon: 'phone', title: t.contact.phone, value: contact.phoneDisplay, href: contact.whatsapp },
    { icon: 'linkedin', title: 'LinkedIn', value: contact.linkedin.handle, href: contact.linkedin.url },
    { icon: 'github', title: 'GitHub', value: contact.github.handle, href: contact.github.url },
  ];

  return (
    <section id="contacto" className="dotgrid contact">
      <div className="container section-pad contact__inner">
        <div>
          <SectionHeader label={t.contact.label} title={t.contact.title} />
          <Reveal delay={0.1}>
            <p className="contact__text">{t.contact.text}</p>
          </Reveal>
        </div>
        <div className="contact__grid">
          {items.map((it, i) => (
            <Reveal key={it.icon} delay={i * 0.08} style={{ display: 'flex' }}>
              <ContactCard {...it} />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <ButtonLink href={contact.cvUrl} download={contact.cvFileName}>
            <Icon name="download" size={18} strokeWidth={2.5} />
            {t.contact.cv}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
