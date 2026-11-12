import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import './ui.css';

type CardProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

/** Tarjeta con borde suave que se eleva al pasar el mouse. Puede renderizarse como div, article, a... */
export function Card<T extends ElementType = 'div'>({ as, className = '', children, ...rest }: CardProps<T>) {
  const Tag = as ?? 'div';
  return (
    <Tag className={`card ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
