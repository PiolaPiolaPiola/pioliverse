import type { ReactNode } from 'react';
import './ui.css';

export function Chip({ children, small }: { children: ReactNode; small?: boolean }) {
  return <span className={`chip${small ? ' chip--sm' : ''}`}>{children}</span>;
}
