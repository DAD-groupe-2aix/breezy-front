'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, User, Bell, MessageCircle, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { href: '/home', icon: Home },
  { href: '/profile', icon: User },
  { href: '/notifications', icon: Bell },
  { href: '/messages', icon: MessageCircle },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push('/');
  }

  return (
    <div className="bottom-nav-wrapper md:hidden">

      <nav
        style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50 }}
        className="flex bg-white border-t border-[#E2E8F0] items-center justify-around px-2 py-2"
      >
        {navItems.map(({ href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`p-2 rounded-lg transition-colors ${isActive ? 'text-[#3B82F6]' : 'text-[#64748B] hover:text-[#0F172A]'}`}
            >
              <Icon size={24} className={isActive ? 'animate-nav-bounce' : ''} />
            </Link>
          );
        })}
        <button
          onClick={handleLogout}
          className="p-2 text-[#64748B] hover:text-[#EF4444] transition-colors"
        >
          <LogOut size={24} />
        </button>
      </nav>
    </div>
  );
}
