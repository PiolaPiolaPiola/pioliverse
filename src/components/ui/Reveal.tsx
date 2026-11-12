import { motion, useReducedMotion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  /** 'view': aparece al hacer scroll. 'load': aparece al cargar la página. */
  trigger?: 'view' | 'load';
  className?: string;
  style?: CSSProperties;
}

const EASE = [0.2, 0.8, 0.2, 1] as const;

/** Sube y aparece suavemente (la animación "rise" del diseño). */
export function Reveal({ children, delay = 0, trigger = 'view', className, style }: RevealProps) {
  const reduce = useReducedMotion();
  const hidden = { opacity: 0, y: reduce ? 0 : 28 };
  const shown = { opacity: 1, y: 0 };
  const transition = { duration: 0.9, delay, ease: EASE };
  const animation =
    trigger === 'load'
      ? { animate: shown }
      : { whileInView: shown, viewport: { once: true, amount: 0.2 } };

  return (
    <motion.div className={className} style={style} initial={hidden} transition={transition} {...animation}>
      {children}
    </motion.div>
  );
}
