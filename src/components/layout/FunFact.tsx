import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import pollito from '../../assets/pollito.svg';
import { useLanguage } from '../../hooks/useLanguage';
import './funfact.css';

const APPEAR_AFTER_MS = 2500;

/** Burbuja "¿Sabías qué?" que flota por toda la pantalla. Se pausa al pasar el mouse y se puede cerrar. */
export function FunFact() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setVisible(true), APPEAR_AFTER_MS);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          className="funfact"
          aria-label={t.funFact.title}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        >
          <div className="funfact__drift">
            <div className="funfact__bubble">
              <img src={pollito} alt="" className="funfact__chick" />
              <div>
                <div className="display funfact__title">{t.funFact.title}</div>
                <p className="funfact__text">{t.funFact.text}</p>
              </div>
              <button type="button" className="funfact__close" aria-label={t.funFact.close} onClick={() => setVisible(false)}>
                ×
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
