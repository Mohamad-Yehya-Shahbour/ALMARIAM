import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { t } from '../data/defaults';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem('almariam_lang') || 'ar');
  useEffect(() => {
    localStorage.setItem('almariam_lang', lang);
    document.documentElement.lang = lang;
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);
  const value = useMemo(() => ({ lang, setLang, tr: (key) => t[lang]?.[key] || key, isAr: lang === 'ar' }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLang = () => useContext(LanguageContext);
