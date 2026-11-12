import type { CSSProperties } from 'react';
import logoLight from '../../assets/logo-light.svg';
import logoDark from '../../assets/logo-dark.svg';

interface LogoProps {
  size?: number | string;
  alt?: string;
  lightStyle?: CSSProperties;
  darkStyle?: CSSProperties;
}

/** Logo del Pioliverse: muestra la versión clara u oscura según el tema activo. */
export function Logo({ size = 46, alt = '', lightStyle, darkStyle }: LogoProps) {
  const base: CSSProperties = { width: size, height: typeof size === 'number' ? size : 'auto', display: 'block' };
  return (
    <>
      <img className="only-light" src={logoLight} alt={alt} style={{ ...base, ...lightStyle }} />
      <img className="only-dark" src={logoDark} alt={alt} style={{ ...base, ...darkStyle }} />
    </>
  );
}
