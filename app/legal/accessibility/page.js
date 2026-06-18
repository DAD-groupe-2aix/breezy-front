'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Wind, ArrowLeft } from 'lucide-react';

export default function AccessibilityPage() {
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

      <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Accessibilité</h1>
      <p className="text-sm text-[#64748B] mb-8">Notre engagement pour une plateforme inclusive</p>

      <div className="flex flex-col gap-6 text-sm text-[#334155] leading-relaxed">
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">Notre engagement</h2>
          <p>Breezy s'engage à rendre sa plateforme accessible à tous les utilisateurs, y compris les personnes en situation de handicap. Nous travaillons continuellement à améliorer l'accessibilité de nos services.</p>
        </section>

        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">Fonctionnalités d'accessibilité</h2>
          <ul className="list-disc list-inside flex flex-col gap-2 text-[#334155]">
            <li>Mode sombre pour réduire la fatigue oculaire</li>
            <li>Interface multilingue (français et anglais)</li>
            <li>Navigation au clavier sur toutes les pages</li>
            <li>Contrastes de couleurs conformes aux recommandations WCAG 2.1</li>
            <li>Textes alternatifs sur les images</li>
            <li>Interface responsive adaptée à tous les appareils</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">Signaler un problème</h2>
          <p>Si vous rencontrez des difficultés d'accessibilité sur Breezy, contactez notre équipe à : <span className="text-[#3B82F6]">accessibility@breezy.app</span></p>
          <p className="mt-2">Nous nous engageons à vous répondre dans un délai de 5 jours ouvrés.</p>
        </section>
      </div>

      <p className="text-xs text-[#64748B] mt-10 border-t border-[#E2E8F0] pt-4">© 2026 Breezy</p>
    </div>
  );
}
