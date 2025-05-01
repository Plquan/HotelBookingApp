import translations from "@/providers/Languages/Translation";
import { useLanguage } from "@/providers/Languages/LanguageContext";

export const useTranslate = () => {
  const { language } = useLanguage();

  const t = (key: string) => {
    return translations[language]?.[key] || key;
  };

  return t;
};
