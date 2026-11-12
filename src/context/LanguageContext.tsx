import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { dictionaries, type Lang } from '../i18n';
import { LanguageContext } from './language';

const STORAGE_KEY = 'pv-lang';

function getInitialLang(): Lang {
  return document.documentElement.lang === 'en' ? 'en' : 'es';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* almacenamiento no disponible */
    }
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: dictionaries[lang] }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
