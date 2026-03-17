import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-ridge bg-deep/50 hover:border-gold/50 transition-colors group"
      aria-label="Switch Language"
    >
      <span className={`text-[10px] font-mono tracking-tighter ${i18n.language === 'en' ? 'text-gold' : 'text-smoke group-hover:text-ash'}`}>
        EN
      </span>
      <div className="w-px h-3 bg-ridge" />
      <span className={`text-[10px] font-mono tracking-tighter ${i18n.language === 'fr' ? 'text-gold' : 'text-smoke group-hover:text-ash'}`}>
        FR
      </span>
    </motion.button>
  );
}
