import type { AnchorHTMLAttributes, ReactNode } from 'react';
import './ui.css';

type Variant = 'primary' | 'ghost';

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  small?: boolean;
  children: ReactNode;
}

/** Botón con forma de enlace: las acciones del sitio navegan o descargan. Los enlaces externos abren en otra pestaña. */
export function ButtonLink({ variant = 'primary', small, className = '', children, ...rest }: ButtonLinkProps) {
  const external = rest.href?.startsWith('http');
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <a className={`btn btn--${variant}${small ? ' btn--sm' : ''} ${className}`.trim()} {...externalProps} {...rest}>
      {children}
    </a>
  );
}
