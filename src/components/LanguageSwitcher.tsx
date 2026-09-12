import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../utils/translations';
import { Language } from '../types';

interface LanguageSwitcherProps {
  variant?: 'compact' | 'full' | 'header';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant = 'header' }) => {
  const { language, setLanguage } = useLanguage();

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
  };

  if (variant === 'compact') {
    return (
      <div className="inline-flex items-center bg-blue-900/50 p-0.5 rounded-lg border border-blue-700/60 text-xs font-bold">
        <button
          onClick={() => handleSelect('en')}
          className={`px-2 py-1 rounded transition-all cursor-pointer ${
            language === 'en'
              ? 'bg-amber-400 text-blue-950 shadow-xs'
              : 'text-blue-200 hover:text-white'
          }`}
          aria-label="Switch to English"
        >
          EN
        </button>
        <button
          onClick={() => handleSelect('fr')}
          className={`px-2 py-1 rounded transition-all cursor-pointer ${
            language === 'fr'
              ? 'bg-amber-400 text-blue-950 shadow-xs'
              : 'text-blue-200 hover:text-white'
          }`}
          aria-label="Passer en Français"
        >
          FR
        </button>
      </div>
    );
  }

  return (
    <div
      className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-xs border border-white/20 rounded-xl p-1 shadow-2xs"
      id="language-switcher-container"
      title="Toggle Language / Changer de langue (Bonamekano)"
    >
      <div className="flex items-center pl-1.5 pr-1 text-white/80">
        <Globe className="w-3.5 h-3.5 text-amber-300 mr-1" />
        <span className="text-[11px] font-semibold uppercase tracking-wider hidden xl:inline text-blue-100">
          Lang:
        </span>
      </div>

      <button
        onClick={() => handleSelect('en')}
        className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
          language === 'en'
            ? 'bg-white text-[#002f6c] shadow-xs'
            : 'text-white hover:bg-white/15'
        }`}
        aria-pressed={language === 'en'}
        aria-label="English interface"
      >
        <span className="text-xs">🇬🇧</span>
        <span>EN</span>
      </button>

      <button
        onClick={() => handleSelect('fr')}
        className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
          language === 'fr'
            ? 'bg-white text-[#002f6c] shadow-xs'
            : 'text-white hover:bg-white/15'
        }`}
        aria-pressed={language === 'fr'}
        aria-label="Interface en Français"
      >
        <span className="text-xs">🇨🇲</span>
        <span>FR</span>
      </button>
    </div>
  );
};
