'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Wind, ArrowLeft } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

export default function MorePage() {
  const router = useRouter();
  const { lang } = useLang();
  const fr = lang === 'fr';

  const links = [
    { label: fr ? "Conditions d'utilisation" : 'Terms of Use', href: '/legal/terms' },
    { label: fr ? 'Politique de confidentialité' : 'Privacy Policy', href: '/legal/privacy' },
    { label: fr ? 'Politique relative aux cookies' : 'Cookie Policy', href: '/legal/cookies' },
    { label: fr ? 'Accessibilité' : 'Accessibility', href: '/legal/accessibility' },
    { label: fr ? 'Informations sur les publicités' : 'Advertising Information', href: '/legal/ads' },
  ];

  return (
    <div className="min-h-screen bg-white max-w-2xl mx-auto px-6 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Wind size={24} className="text-[#3B82F6]" />
        <span className="text-lg font-bold text-[#0F172A]">Breezy</span>
      </div>
      <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-[#64748B] hover:text-[#3B82F6] mb-6">
        <ArrowLeft size={16} /> {fr ? 'Retour' : 'Back'}
      </button>
      <h1 className="text-2xl font-bold text-[#0F172A] mb-2">{fr ? 'À propos de Breezy' : 'About Breezy'}</h1>
      <p className="text-sm text-[#64748B] mb-8">{fr ? 'Toutes les informations sur notre plateforme' : 'All information about our platform'}</p>
      <div className="flex flex-col gap-6 text-sm text-[#334155] leading-relaxed">
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">{fr ? 'Qui sommes-nous ?' : 'Who are we?'}</h2>
          <p>{fr ? "Breezy est un réseau social léger et réactif, conçu pour des environnements à faibles ressources. Notre mission est de permettre à chacun de partager ses idées rapidement et simplement." : 'Breezy is a lightweight and responsive social network, designed for low-resource environments. Our mission is to allow everyone to share their ideas quickly and simply.'}</p>
        </section>
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">Contact</h2>
          <div className="flex flex-col gap-1">
            <p>{fr ? 'Support :' : 'Support:'} <span className="text-[#3B82F6]">support@breezy.app</span></p>
            <p>{fr ? 'Presse :' : 'Press:'} <span className="text-[#3B82F6]">press@breezy.app</span></p>
            <p>{fr ? 'Partenariats :' : 'Partnerships:'} <span className="text-[#3B82F6]">partners@breezy.app</span></p>
          </div>
        </section>
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">{fr ? 'Pages légales' : 'Legal pages'}</h2>
          <div className="flex flex-col gap-2">
            {links.map(({ label, href }) => (
              <Link key={href} href={href} className="text-[#3B82F6] hover:underline">{label}</Link>
            ))}
          </div>
        </section>
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">Version</h2>
          <p>Breezy v1.0.0 — © 2026 Breezy. {fr ? 'Tous droits réservés.' : 'All rights reserved.'}</p>
        </section>
      </div>
      <p className="text-xs text-[#64748B] mt-10 border-t border-[#E2E8F0] pt-4">© 2026 Breezy</p>
    </div>
  );
}
