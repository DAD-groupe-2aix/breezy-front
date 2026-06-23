'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useLang } from '@/context/LanguageContext';
import { userService } from '@/services/userService';

function UserAvatar({ name, avatar }) {
  if (avatar) {
    return <img src={avatar} alt={name} className="w-9 h-9 rounded-full object-cover shrink-0" />;
  }
  return (
    <div className="w-9 h-9 rounded-full bg-[#E2E8F0] flex items-center justify-center text-xs font-bold text-[#64748B] shrink-0">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

export default function RightSidebar() {
  const { user } = useAuth();
  const { t } = useLang();
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    if (!user) return;
    userService.getProfile(user.id)
      .then((profile) => {
        const ids = profile.following || [];
        return Promise.all(ids.map((id) => userService.getProfile(id).catch(() => null)));
      })
      .then((profiles) => setFollowing(profiles.filter(Boolean)))
      .catch(() => setFollowing([]));
  }, [user]);

  return (
    <aside className="sidebar-right hidden lg:flex w-72 shrink-0 border-l border-[#E2E8F0] px-4 py-6 flex-col sticky top-0 h-screen">
      <h2 className="font-bold text-[#0F172A] mb-4">{t.following}</h2>
      <div className="flex flex-col gap-3">
        {following.length === 0 ? (
          <p className="text-sm text-[#64748B]">Tu ne suis personne pour l&apos;instant.</p>
        ) : (
          following.map((profile) => (
            <Link key={profile.authId} href={`/profile/${profile.authId}`} className="flex items-center gap-3 hover:bg-[#F8FAFC] rounded-lg p-1 transition-colors">
              <UserAvatar name={profile.username} avatar={profile.profilePicture === 'default-avatar.png' ? null : profile.profilePicture} />
              <div>
                <p className="text-sm font-medium text-[#0F172A]">{profile.username}</p>
                <p className="text-xs text-[#64748B]">@{profile.username}</p>
              </div>
            </Link>
          ))
        )}
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
