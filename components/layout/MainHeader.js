'use client';
import { Globe, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLang } from '@/context/LanguageContext';

export default function MainHeader({ title }) {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLang();
  const isDark = theme === 'dark';

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-[#E2E8F0] px-4 py-3 flex items-center justify-between">
      <h1 className="text-xl font-bold text-[#0F172A]">{title}</h1>

      <div className="flex items-center gap-2">

        {/* Langue */}
        <button
          onClick={toggleLang}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E2E8F0] text-sm font-medium text-[#64748B] hover:bg-[#F8FAFC] transition-colors"
        >
          <Globe size={14} />
          <span>{lang.toUpperCase()}</span>
        </button>

        {/* Dark mode */}
        <button
          onClick={toggleTheme}
          aria-label="Changer le thème"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E2E8F0] text-sm text-[#64748B] hover:bg-[#F8FAFC] transition-colors"
        >
          {isDark ? <Sun size={14} /> : <Moon size={14} />}
          <div
            className="relative w-9 h-5 rounded-full transition-colors duration-200"
            style={{ backgroundColor: isDark ? '#3B82F6' : '#CBD5E1' }}
          >
            <div
              className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200"
              style={{ left: isDark ? '17px' : '2px' }}
            />
          </div>
        </button>

      </div>
    </div>
  );
}
