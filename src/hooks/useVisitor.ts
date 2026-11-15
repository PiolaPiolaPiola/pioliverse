import { useEffect, useState } from 'react';
import { useLanguage } from './useLanguage';
import { useToast } from './useToast';

const STORAGE_KEY = 'pv-visitor';

let visitRequest: Promise<number | null> | null = null;

function readStoredVisitor() {
  try {
    const value = Number(localStorage.getItem(STORAGE_KEY));
    return Number.isInteger(value) && value > 0 ? value : null;
  } catch {
    return null;
  }
}

function storeVisitor(value: number) {
  try {
    localStorage.setItem(STORAGE_KEY, String(value));
  } catch {
    return;
  }
}

function registerVisit() {
  visitRequest ??= fetch('/api/visits', { method: 'POST' })
    .then((res) => (res.ok ? res.json() : null))
    .then((data: { visitor?: unknown } | null) => {
      const value = Number(data?.visitor);
      return Number.isInteger(value) && value > 0 ? value : null;
    })
    .catch(() => null);
  return visitRequest;
}

export function useVisitor() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [visitor, setVisitor] = useState<number | null>(readStoredVisitor);

  useEffect(() => {
    if (visitor !== null) return;
    let active = true;
    registerVisit().then((value) => {
      if (!active || value === null) return;
      storeVisitor(value);
      setVisitor(value);
      showToast(t.visitor.welcome(value));
    });
    return () => {
      active = false;
    };
  }, [visitor, showToast, t]);

  return visitor;
}
