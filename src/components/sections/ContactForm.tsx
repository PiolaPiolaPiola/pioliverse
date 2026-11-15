import { useRef, useState, type FormEvent } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { Card } from '../ui/Card';

type Status = 'idle' | 'sending' | 'ok' | 'error' | 'invalid' | 'wait';

const LIMITS = { name: 80, email: 254, messageMin: 10, message: 2000 } as const;
const COOLDOWN_MS = 30_000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function isInvisible(code: number) {
  return (
    code <= 0x1f ||
    (code >= 0x7f && code <= 0x9f) ||
    (code >= 0x200b && code <= 0x200f) ||
    (code >= 0x2028 && code <= 0x202e) ||
    (code >= 0x2060 && code <= 0x206f) ||
    code === 0xfeff
  );
}

function sanitize(value: FormDataEntryValue | null, max: number, multiline = false) {
  const text = String(value ?? '')
    .normalize('NFKC')
    .replace(/\r\n?/g, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/[<>]/g, '');

  const visible = Array.from(text, (ch) => {
    const code = ch.codePointAt(0) ?? 0;
    if (multiline && code === 0x0a) return ch;
    return isInvisible(code) ? (multiline ? '' : ' ') : ch;
  }).join('');

  const collapsed = multiline ? visible.replace(/\n{3,}/g, '\n\n') : visible.replace(/\s+/g, ' ');
  return collapsed.trim().slice(0, max);
}

export function ContactForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>('idle');
  const lastSentAt = useRef(0);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;

    const form = e.currentTarget;
    const raw = new FormData(form);

    if (raw.get('botcheck')) {
      form.reset();
      setStatus('ok');
      return;
    }

    if (Date.now() - lastSentAt.current < COOLDOWN_MS) {
      setStatus('wait');
      return;
    }

    const name = sanitize(raw.get('name'), LIMITS.name);
    const email = sanitize(raw.get('email'), LIMITS.email).toLowerCase();
    const message = sanitize(raw.get('message'), LIMITS.message, true);

    if (!name || !EMAIL_RE.test(email) || message.length < LIMITS.messageMin) {
      setStatus('invalid');
      return;
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
    if (!accessKey) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: 'Nuevo mensaje desde Pioliverse',
          from_name: 'Pioliverse',
          name,
          email,
          replyto: email,
          message,
        }),
      });
      const json: { success?: boolean } = await res.json();
      if (!res.ok || !json.success) throw new Error('send failed');
      lastSentAt.current = Date.now();
      form.reset();
      setStatus('ok');
    } catch {
      setStatus('error');
    }
  }

  const feedback: Partial<Record<Status, string>> = {
    ok: t.contact.form.ok,
    error: t.contact.form.error,
    invalid: t.contact.form.invalid,
    wait: t.contact.form.wait,
  };

  return (
    <Card as="form" className="contact-form" onSubmit={handleSubmit}>
      <input type="checkbox" name="botcheck" className="contact-form__trap" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="contact-form__row">
        <input
          name="name"
          required
          maxLength={LIMITS.name}
          autoComplete="name"
          placeholder={t.contact.form.name}
          aria-label={t.contact.form.name}
        />
        <input
          name="email"
          type="email"
          required
          maxLength={LIMITS.email}
          autoComplete="email"
          placeholder={t.contact.form.email}
          aria-label={t.contact.form.email}
        />
      </div>
      <textarea
        name="message"
        required
        rows={5}
        minLength={LIMITS.messageMin}
        maxLength={LIMITS.message}
        placeholder={t.contact.form.message}
        aria-label={t.contact.form.message}
      />

      <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
        {status === 'sending' ? t.contact.form.sending : t.contact.form.send}
      </button>

      <p role="status" className={`contact-form__status${status === 'ok' ? '' : ' contact-form__status--warn'}`}>
        {feedback[status]}
      </p>
    </Card>
  );
}
