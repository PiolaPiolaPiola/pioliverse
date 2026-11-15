import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Toast } from '../components/ui/Toast';
import { ToastContext } from './toast';

const TOAST_DURATION_MS = 5000;

interface ToastItem {
  id: number;
  message: string;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastItem | null>(null);

  const showToast = useCallback((message: string) => {
    setToast({ id: Date.now(), message });
  }, []);

  const hideToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(hideToast, TOAST_DURATION_MS);
    return () => window.clearTimeout(id);
  }, [toast, hideToast]);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast toast={toast} onClose={hideToast} />
    </ToastContext.Provider>
  );
}
