import { useEffect, useMemo, useState } from 'react';

function useI18n(translations) {
  const [language, setLanguage] = useState(() => window.localStorage.getItem('app-language') || 'en');

  useEffect(() => {
    window.localStorage.setItem('app-language', language);
  }, [language]);

  const copy = useMemo(() => translations[language] || translations.en, [language, translations]);
  const isRtl = language === 'he';

  return { language, setLanguage, copy, isRtl };
}

export default useI18n;
