"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "./translations";
const LanguageContext = createContext(undefined);
export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState("en");
  useEffect(() => {
    const saved = localStorage.getItem("viper-locale");
    if (saved && ["en", "fr", "es"].includes(saved)) {
      setLocaleState(saved);
    }
  }, []);
  const setLocale = (newLocale) => {
    setLocaleState(newLocale);
    localStorage.setItem("viper-locale", newLocale);
  };
  const t = translations[locale];
  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
