'use client';
import Link from 'next/link';
import { suggestedUsers } from '@/mock/user';
import { useLang } from '@/context/LanguageContext';

function UserAvatar({ name }) {
  return (
    <div className="w-9 h-9 rounded-full bg-[#E2E8F0] flex items-center justify-center text-xs font-bold text-[#64748B] shrink-0">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

export default function RightSidebar() {
  const { t } = useLang();
  return (
    <aside className="sidebar-right hidden lg:flex w-72 shrink-0 border-l border-[#E2E8F0] px-4 py-6 flex-col sticky top-0 h-screen">
      <h2 className="font-bold text-[#0F172A] mb-4">{t.following}</h2>
      <div className="flex flex-col gap-3">
        {suggestedUsers.map((user) => (
          <Link key={user.id} href={`/profile/${user.id}`} className="flex items-center gap-3 hover:bg-[#F8FAFC] rounded-lg p-1 transition-colors">
            <UserAvatar name={user.name} />
            <div>
              <p className="text-sm font-medium text-[#0F172A]">{user.name}</p>
              <p className="text-xs text-[#64748B]">@{user.username}</p>
            </div>
          </Link>
        ))}
      </div>

            <footer className="mt-auto pt-4">
        <nav className="flex flex-wrap gap-x-2 gap-y-1">
          <Link href="/legal/terms" className="text-[11px] text-[#64748B] hover:underline cursor-pointer">{t.terms}</Link>
          <Link href="/legal/privacy" className="text-[11px] text-[#64748B] hover:underline cursor-pointer">{t.privacy}</Link>
          <Link href="/legal/cookies" className="text-[11px] text-[#64748B] hover:underline cursor-pointer">{t.cookies}</Link>
          <Link href="/legal/accessibility" className="text-[11px] text-[#64748B] hover:underline cursor-pointer">{t.accessibility}</Link>
          <Link href="/legal/ads" className="text-[11px] text-[#64748B] hover:underline cursor-pointer">{t.ads}</Link>
          <Link href="/legal/more" className="text-[11px] text-[#64748B] hover:underline cursor-pointer">{t.moreAbout}</Link>
        </nav>
        <p className="text-[11px] text-[#64748B] mt-2">© 2026 Breezy</p>
      </footer>

    </aside>
  );
}
