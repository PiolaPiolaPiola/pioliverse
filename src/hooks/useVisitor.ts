import { useEffect, useState } from 'react';
import { useLanguage } from './useLanguage';
import { useToast } from './useToast';

const STORAGE_KEY = 'pv-visitor';
const ENDPOINT = '/api/visits';

interface VisitResult {
  visitor: number;
  total: number;
}

let visitRequest: Promise<VisitResult | null> | null = null;
let totalRequest: Promise<number | null> | null = null;

function toPositiveInt(value: unknown) {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : null;
}

function readStoredVisitor() {
  try {
    return toPositiveInt(localStorage.getItem(STORAGE_KEY));
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

function readJson(res: Response) {
  return res.ok ? (res.json() as Promise<Record<string, unknown>>) : null;
}

function registerVisit() {
  visitRequest ??= fetch(ENDPOINT, { method: 'POST' })
    .then(readJson)
    .then((data) => {
      const visitor = toPositiveInt(data?.visitor);
      if (visitor === null) return null;
      return { visitor, total: toPositiveInt(data?.total) ?? visitor };
    })
    .catch(() => null);
  return visitRequest;
}

function fetchTotal() {
  totalRequest ??= fetch(ENDPOINT)
    .then(readJson)
    .then((data) => toPositiveInt(data?.total))
    .catch(() => null);
  return totalRequest;
}

export function useVisitor() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [visitor, setVisitor] = useState<number | null>(readStoredVisitor);
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    if (visitor !== null) return;
    let active = true;
    registerVisit().then((result) => {
      if (!active || result === null) return;
      storeVisitor(result.visitor);
      setVisitor(result.visitor);
      setTotal(result.total);
      showToast(t.visitor.welcome(result.visitor));
    });
    return () => {
      active = false;
    };
  }, [visitor, showToast, t]);

  useEffect(() => {
    if (visitor === null || total !== null) return;
    let active = true;
    fetchTotal().then((value) => {
      if (active && value !== null) setTotal(value);
    });
    return () => {
      active = false;
    };
  }, [visitor, total]);

  return { visitor, total: total === null || visitor === null ? total : Math.max(total, visitor) };
}
