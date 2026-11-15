import { AnimatePresence, motion } from 'framer-motion';
import pollito from '../../assets/pollito.svg';
import { useLanguage } from '../../hooks/useLanguage';
import './toast.css';

interface ToastProps {
  toast: { id: number; message: string } | null;
  onClose: () => void;
}

export function Toast({ toast, onClose }: ToastProps) {
  const { t } = useLanguage();

  return (
    <div className="toast-region" role="status" aria-live="polite">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            className="toast"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          >
            <img src={pollito} alt="" className="toast__chick" />
            <p className="toast__message">{toast.message}</p>
            <button type="button" className="toast__close" aria-label={t.toast.close} onClick={onClose}>
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
