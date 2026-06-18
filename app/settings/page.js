'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Wind, LogOut, Moon, Sun, Globe } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useLang } from '@/context/LanguageContext';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLang();
  const router = useRouter();

  const legalLinks = [
    { label: t.terms, href: '/legal/terms' },
    { label: t.privacy, href: '/legal/privacy' },
    { label: t.cookies, href: '/legal/cookies' },
    { label: t.accessibility, href: '/legal/accessibility' },
    { label: t.ads, href: '/legal/ads' },
    { label: t.moreAbout, href: '/legal/more' },
  ];

  function handleLogout() {
    logout();
    router.push('/');
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">

      <div className="flex items-center gap-4 px-4 py-4 bg-white border-b border-[#E2E8F0] sticky top-0 z-10">
        <button onClick={() => router.back()} className="text-[#64748B] hover:text-[#0F172A] transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          <Wind size={20} className="text-[#3B82F6]" />
          <span className="font-bold text-[#0F172A]">{t.settings}</span>
        </div>
      </div>

      {user && (
        <div className="mx-4 mt-4 mb-4 bg-white rounded-xl border border-[#E2E8F0] p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#E2E8F0] flex items-center justify-center text-base font-bold text-[#64748B] shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-[#0F172A]">{user.name}</p>
            <p className="text-sm text-[#64748B]">@{user.username}</p>
          </div>
        </div>
      )}

      <div className="mb-2">
        <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider px-4 py-2">{t.account}</p>
        <div className="bg-white rounded-xl overflow-hidden border border-[#E2E8F0] mx-4">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#EF4444] hover:bg-[#FEF2F2] transition-colors">
            <LogOut size={18} />
            {t.logout}
          </button>
        </div>
      </div>

      <div className="mb-2">
        <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider px-4 py-2">{t.appearance}</p>
        <div className="bg-white rounded-xl overflow-hidden border border-[#E2E8F0] mx-4">
          <button onClick={toggleTheme} className="w-full flex items-center justify-between px-4 py-3 text-sm text-[#0F172A] hover:bg-[#F8FAFC] transition-colors border-b border-[#E2E8F0]">
            <span className="flex items-center gap-3">
              {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
              {t.theme}
            </span>
            <span className="text-xs font-medium text-[#64748B] bg-[#F1F5F9] px-2 py-1 rounded-full">
              {theme === 'dark' ? t.themeDark : t.themeLight}
            </span>
          </button>
          <button onClick={toggleLang} className="w-full flex items-center justify-between px-4 py-3 text-sm text-[#0F172A] hover:bg-[#F8FAFC] transition-colors">
            <span className="flex items-center gap-3">
              <Globe size={18} />
              {t.language}
            </span>
            <span className="text-xs font-medium text-[#64748B] bg-[#F1F5F9] px-2 py-1 rounded-full">
              {lang === 'fr' ? 'Français' : 'English'}
            </span>
          </button>
        </div>
      </div>

      <div className="mb-2">
        <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider px-4 py-2">{t.legal}</p>
        <div className="bg-white rounded-xl overflow-hidden border border-[#E2E8F0] mx-4">
          {legalLinks.map(({ label, href }, i) => (
            <Link key={href} href={href}
              className={`flex items-center justify-between px-4 py-3 text-sm text-[#0F172A] hover:bg-[#F8FAFC] transition-colors ${i < legalLinks.length - 1 ? 'border-b border-[#E2E8F0]' : ''}`}>
              <span>{label}</span>
              <span className="text-[#64748B]">›</span>
            </Link>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-[#64748B] mt-6">Breezy v1.0.0 · © 2026</p>
    </div>
  );
}
