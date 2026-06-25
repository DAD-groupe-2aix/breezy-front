'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Wind, Home, User, Bell, MessageCircle, LogOut, Shield } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLang } from '@/context/LanguageContext';
import { notifService } from '@/services/notifService';

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { t } = useLang();
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    function fetchUnread() {
      notifService.getNotifications(user.id)
        .then((notifs) => setUnreadCount(notifs.filter((n) => !n.read).length))
        .catch(() => {});
    }

    fetchUnread();
    const interval = setInterval(fetchUnread, 30000);
    return () => clearInterval(interval);
  }, [user]);

  // Reset badge quand on arrive sur la page notifications
  useEffect(() => {
    if (pathname === '/notifications' && unreadCount > 0 && user) {
      notifService.markAllRead(user.id).then(() => setUnreadCount(0)).catch(() => {});
    }
  }, [pathname]);

  const navItems = [
    { label: t.home, href: '/home', icon: Home },
    { label: t.profile, href: '/profile', icon: User },
    { label: t.notifications, href: '/notifications', icon: Bell, badge: unreadCount },
    { label: t.messages, href: '/messages', icon: MessageCircle },
    ...(user && (user.role === 'admin' || user.role === 'moderator')
      ? [{ label: 'Administration', href: '/admin', icon: Shield }]
      : []),
  ];

  function handleLogout() {
    logout();
    router.push('/');
  }

  return (
    <aside className="sidebar-left hidden md:flex w-60 shrink-0 bg-white border-r border-[#E2E8F0] px-4 py-6 flex-col sticky top-0 h-screen">
      <Link href="/home" className="flex items-center gap-2 mb-8">
        <Wind size={28} className="text-[#3B82F6]" />
        <span className="text-xl font-bold text-[#0F172A]">Breezy</span>
      </Link>

      <nav className="flex flex-col gap-1">
        {navItems.map(({ label, href, icon: Icon, badge }) => {
          const isActive = pathname === href;
          return (
            <Link key={href} href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${isActive ? 'bg-[#EFF6FF] text-[#3B82F6]' : 'text-[#0F172A] hover:bg-[#F8FAFC]'}`}
            >
              <span className="relative">
                <Icon size={20} />
                {badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#EF4444] text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-0.5">
                    {badge > 9 ? '9+' : badge}
                  </span>
                )}
              </span>
              {label}
            </Link>
          );
        })}
      </nav>

      {user && (
        <div className="mt-auto flex items-center justify-between gap-2 pt-4 border-t border-[#E2E8F0]">
          <div className="flex items-center gap-2 min-w-0">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#E2E8F0] flex items-center justify-center text-xs font-bold text-[#64748B] shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-medium text-[#0F172A] truncate">{user.name}</p>
              <p className="text-xs text-[#64748B] truncate">@{user.username}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="text-[#64748B] hover:text-[#EF4444] transition-colors shrink-0">
            <LogOut size={18} />
          </button>
        </div>
      )}
    </aside>
  );
}
