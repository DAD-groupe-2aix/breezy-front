'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Wind, ArrowLeft } from 'lucide-react';

const links = [
  { label: "Conditions d'utilisation", href: '/legal/terms' },
  { label: 'Politique de confidentialité', href: '/legal/privacy' },
  { label: 'Politique relative aux cookies', href: '/legal/cookies' },
  { label: 'Accessibilité', href: '/legal/accessibility' },
  { label: 'Informations sur les publicités', href: '/legal/ads' },
];

export default function MorePage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white max-w-2xl mx-auto px-6 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Wind size={24} className="text-[#3B82F6]" />
        <span className="text-lg font-bold text-[#0F172A]">Breezy</span>
      </div>

      <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-[#64748B] hover:text-[#3B82F6] mb-6">
        <ArrowLeft size={16} /> Retour
      </button>

      <h1 className="text-2xl font-bold text-[#0F172A] mb-2">À propos de Breezy</h1>
      <p className="text-sm text-[#64748B] mb-8">Toutes les informations sur notre plateforme</p>

      <div className="flex flex-col gap-6 text-sm text-[#334155] leading-relaxed">
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">Qui sommes-nous ?</h2>
          <p>Breezy est un réseau social léger et réactif, conçu pour des environnements à faibles ressources. Notre mission est de permettre à chacun de partager ses idées rapidement et simplement.</p>
        </section>

        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">Contact</h2>
          <div className="flex flex-col gap-1">
            <p>Support : <span className="text-[#3B82F6]">support@breezy.app</span></p>
            <p>Presse : <span className="text-[#3B82F6]">press@breezy.app</span></p>
            <p>Partenariats : <span className="text-[#3B82F6]">partners@breezy.app</span></p>
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">Pages légales</h2>
          <div className="flex flex-col gap-2">
            {links.map(({ label, href }) => (
              <Link key={href} href={href} className="text-[#3B82F6] hover:underline">
                {label}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">Version</h2>
          <p>Breezy v1.0.0 — © 2026 Breezy. Tous droits réservés.</p>
        </section>
      </div>

      <p className="text-xs text-[#64748B] mt-10 border-t border-[#E2E8F0] pt-4">© 2026 Breezy</p>
    </div>
  );
}
