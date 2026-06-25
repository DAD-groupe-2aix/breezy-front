'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Home, User, Bell, MessageCircle, Settings2, Shield } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { notifService } from '@/services/notifService';

export default function BottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();
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

  useEffect(() => {
    if (pathname === '/notifications' && unreadCount > 0 && user) {
      notifService.markAllRead(user.id).then(() => setUnreadCount(0)).catch(() => {});
    }
  }, [pathname]);

  const navItems = [
    { href: '/home', icon: Home },
    { href: '/profile', icon: User },
    { href: '/notifications', icon: Bell, badge: unreadCount },
    { href: '/messages', icon: MessageCircle },
    { href: '/settings', icon: Settings2 },
    ...(user && (user.role === 'admin' || user.role === 'moderator')
      ? [{ href: '/admin', icon: Shield }]
      : []),
  ];

  return (
    <div className="bottom-nav-wrapper md:hidden">
      <nav
        style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50 }}
        className="flex bg-white border-t border-[#E2E8F0] items-center justify-around px-2 py-2"
      >
        {navItems.map(({ href, icon: Icon, badge }) => {
          const isActive = pathname === href || (href === '/settings' && pathname.startsWith('/settings'));
          return (
            <Link
              key={href}
              href={href}
              className={`relative p-2 rounded-lg transition-colors ${isActive ? 'text-[#3B82F6]' : 'text-[#64748B] hover:text-[#0F172A]'}`}
            >
              <Icon size={24} className={isActive ? 'animate-nav-bounce' : ''} />
              {badge > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-[#EF4444] text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-0.5">
                  {badge > 9 ? '9+' : badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
