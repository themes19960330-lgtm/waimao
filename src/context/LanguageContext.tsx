'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { Locale, Dictionary, dictionaries } from '@/data/dictionary';

interface LanguageContextType {
  locale: Locale;
  dict: Dictionary;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  isTransitioning: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleLocale = useCallback(() => {
    if (isTransitioning) return; // prevent rapid clicks

    setIsTransitioning(true);

    // Clear any existing timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // After fade-out duration, switch locale
    timeoutRef.current = setTimeout(() => {
      setLocale((prev) => (prev === 'en' ? 'zh' : 'en'));

      // After switch, wait a tiny beat then end transition
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 250);
  }, [isTransitioning]);

  const dict = dictionaries[locale];

  return (
    <LanguageContext.Provider value={{ locale, dict, setLocale, toggleLocale, isTransitioning }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
