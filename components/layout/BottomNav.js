'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Bell, MessageCircle, Settings2 } from 'lucide-react';

const navItems = [
  { href: '/home', icon: Home },
  { href: '/profile', icon: User },
  { href: '/notifications', icon: Bell },
  { href: '/messages', icon: MessageCircle },
  { href: '/settings', icon: Settings2 },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="bottom-nav-wrapper md:hidden">
      <nav
        style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50 }}
        className="flex bg-white border-t border-[#E2E8F0] items-center justify-around px-2 py-2"
      >
        {navItems.map(({ href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith('/settings');
          return (
            <Link
              key={href}
              href={href}
              className={`p-2 rounded-lg transition-colors ${isActive && href === '/settings' ? 'text-[#3B82F6]' : isActive && href !== '/settings' ? 'text-[#3B82F6]' : 'text-[#64748B] hover:text-[#0F172A]'}`}
            >
              <Icon size={24} />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
