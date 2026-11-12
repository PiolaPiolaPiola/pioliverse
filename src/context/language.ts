import { createContext } from 'react';
import type { Dictionary, Lang } from '../i18n';

export interface LanguageContextValue {
  lang: Lang;
  t: Dictionary;
  setLang: (lang: Lang) => void;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);
