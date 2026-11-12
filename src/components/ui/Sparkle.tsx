import type { CSSProperties } from 'react';

/** Estrella de cuatro puntas que titila. */
export function Sparkle({ size, style }: { size: number; style?: CSSProperties }) {
  return (
    <svg className="twinkle" aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" style={{ position: 'absolute', ...style }}>
      <path fill="currentColor" d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z" />
    </svg>
  );
}
