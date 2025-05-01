import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";
import languagesCookies from "@/utils/functions/languageCookies";

// Define the context type
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => Promise<void>;
}

// Initialize context with type
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: async () => {},
});

// Provider remains the same
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    const loadLanguage = async () => {
      const storedLang = await languagesCookies.getLanguageCookie();
      setLanguage(storedLang || "en");
    };
    loadLanguage();
  }, []);

  const changeLanguage = async (lang: string) => {
    setLanguage(lang);
    await languagesCookies.setLanguageCookie(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook now has proper type inference
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};