'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wind, Home, User, Bell, MessageCircle } from 'lucide-react';

const navItems = [
  { label: 'Page d\'accueil', href: '/home', icon: Home },
  { label: 'Profil', href: '/profile', icon: User },
  { label: 'Notifications', href: '/notifications', icon: Bell },
  { label: 'Messages', href: '/messages', icon: MessageCircle },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 min-h-screen bg-white border-r border-[#E2E8F0] px-4 py-6 flex flex-col gap-8 fixed top-0 left-0">
      <div className="flex items-center gap-2">
        <Wind size={28} className="text-[#3B82F6]" />
        <span className="text-xl font-bold text-[#0F172A]">Breezy, le réseau pour les gays</span>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-[#EFF6FF] text-[#3B82F6]'
                  : 'text-[#0F172A] hover:bg-[#F8FAFC]'
                }`}
            >
              <Icon size={20} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
