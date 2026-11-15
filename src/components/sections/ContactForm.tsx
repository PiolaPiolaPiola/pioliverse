import { useRef, useState, type FormEvent } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { useToast } from '../../hooks/useToast';
import { Card } from '../ui/Card';

type Status = 'idle' | 'sending' | 'error' | 'invalid' | 'wait';
type Field = 'name' | 'email' | 'message';

const LIMITS = { name: 80, email: 254, messageMin: 10, message: 2000 } as const;
const COOLDOWN_MS = 30_000;
const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

const DISALLOWED: Record<Field, RegExp> = {
  name: /[^\p{L}\p{M}\s'.-]/gu,
  email: /[^A-Za-z0-9._%+@-]/g,
  message: /[^\p{L}\p{M}\p{N}\s.,;:!?¡¿'"()\-_@#%&/+*=€$…—–°\p{Extended_Pictographic}]/gu,
};

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

function keepAllowed(text: string, field: Field) {
  return text.replace(DISALLOWED[field], '');
}

function sanitize(value: FormDataEntryValue | null, field: Field, max: number) {
  const multiline = field === 'message';
  const text = String(value ?? '')
    .normalize('NFKC')
    .replace(/\r\n?/g, '\n')
    .replace(/<[^>]*>/g, '');

  const visible = Array.from(text, (ch) => {
    const code = ch.codePointAt(0) ?? 0;
    if (multiline && code === 0x0a) return ch;
    return isInvisible(code) ? (multiline ? '' : ' ') : ch;
  }).join('');

  const allowed = keepAllowed(visible, field);
  const collapsed = multiline ? allowed.replace(/\n{3,}/g, '\n\n') : allowed.replace(/\s+/g, ' ');
  return collapsed.trim().slice(0, max);
}

function filterWhileTyping(e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
  const el = e.currentTarget;
  const clean = keepAllowed(el.value, el.name as Field);
  if (clean === el.value) return;

  const removed = el.value.length - clean.length;
  const caret = Math.max(0, (el.selectionStart ?? clean.length) - removed);
  el.value = clean;
  try {
    el.setSelectionRange(caret, caret);
  } catch {
    return;
  }
}

export function ContactForm() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [status, setStatus] = useState<Status>('idle');
  const lastSentAt = useRef(0);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;

    const form = e.currentTarget;
    const raw = new FormData(form);

    if (raw.get('botcheck')) {
      form.reset();
      showToast(t.contact.form.ok);
      return;
    }

    if (Date.now() - lastSentAt.current < COOLDOWN_MS) {
      setStatus('wait');
      return;
    }

    const name = sanitize(raw.get('name'), 'name', LIMITS.name);
    const email = sanitize(raw.get('email'), 'email', LIMITS.email).toLowerCase();
    const message = sanitize(raw.get('message'), 'message', LIMITS.message);

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
      setStatus('idle');
      showToast(t.contact.form.ok);
    } catch {
      setStatus('error');
    }
  }

  const feedback: Partial<Record<Status, string>> = {
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
          onInput={filterWhileTyping}
        />
        <input
          name="email"
          type="email"
          required
          maxLength={LIMITS.email}
          autoComplete="email"
          placeholder={t.contact.form.email}
          aria-label={t.contact.form.email}
          onInput={filterWhileTyping}
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
        aria-describedby="contact-form-hint"
        onInput={filterWhileTyping}
      />
      <span id="contact-form-hint" className="contact-form__hint">
        {t.contact.form.hint}
      </span>

      <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
        {status === 'sending' ? t.contact.form.sending : t.contact.form.send}
      </button>

      <p role="status" className="contact-form__status">
        {feedback[status]}
      </p>
    </Card>
  );
}
