'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Wind, ArrowLeft } from 'lucide-react';

export default function AdsPage() {
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

      <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Informations sur les publicités</h1>
      <p className="text-sm text-[#64748B] mb-8">Comment la publicité fonctionne sur Breezy</p>

      <div className="flex flex-col gap-6 text-sm text-[#334155] leading-relaxed">
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">Publicité sur Breezy</h2>
          <p>Breezy est actuellement en phase de développement. La plateforme n'affiche pas encore de publicités. Cette page sera mise à jour lorsque notre système publicitaire sera déployé.</p>
        </section>

        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">Notre approche</h2>
          <p>Lorsque des publicités seront introduites, Breezy s'engage à :</p>
          <ul className="list-disc list-inside flex flex-col gap-2 mt-2 text-[#334155]">
            <li>Toujours clairement identifier les contenus sponsorisés</li>
            <li>Ne jamais vendre vos données personnelles à des annonceurs</li>
            <li>Vous donner le contrôle sur vos préférences publicitaires</li>
            <li>Respecter le RGPD dans toutes nos pratiques publicitaires</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">Annonceurs</h2>
          <p>Vous souhaitez faire de la publicité sur Breezy ? Contactez-nous à : <span className="text-[#3B82F6]">ads@breezy.app</span></p>
        </section>
      </div>

      <p className="text-xs text-[#64748B] mt-10 border-t border-[#E2E8F0] pt-4">© 2026 Breezy</p>
    </div>
  );
}
