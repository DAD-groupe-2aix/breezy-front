'use client';
import { useRouter } from 'next/navigation';
import { Wind, ArrowLeft } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

export default function AccessibilityPage() {
  const router = useRouter();
  const { lang } = useLang();
  const fr = lang === 'fr';

  return (
    <div className="min-h-screen bg-white max-w-2xl mx-auto px-6 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Wind size={24} className="text-[#3B82F6]" />
        <span className="text-lg font-bold text-[#0F172A]">Breezy</span>
      </div>
      <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-[#64748B] hover:text-[#3B82F6] mb-6">
        <ArrowLeft size={16} /> {fr ? 'Retour' : 'Back'}
      </button>
      <h1 className="text-2xl font-bold text-[#0F172A] mb-2">{fr ? 'Accessibilité' : 'Accessibility'}</h1>
      <p className="text-sm text-[#64748B] mb-8">{fr ? 'Notre engagement pour une plateforme inclusive' : 'Our commitment to an inclusive platform'}</p>
      <div className="flex flex-col gap-6 text-sm text-[#334155] leading-relaxed">
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">{fr ? 'Notre engagement' : 'Our Commitment'}</h2>
          <p>{fr ? "Breezy s'engage à rendre sa plateforme accessible à tous les utilisateurs, y compris les personnes en situation de handicap. Nous travaillons continuellement à améliorer l'accessibilité de nos services." : 'Breezy is committed to making its platform accessible to all users, including people with disabilities. We continuously work to improve the accessibility of our services.'}</p>
        </section>
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">{fr ? "Fonctionnalités d'accessibilité" : 'Accessibility Features'}</h2>
          <ul className="list-disc list-inside flex flex-col gap-2">
            <li>{fr ? 'Mode sombre pour réduire la fatigue oculaire' : 'Dark mode to reduce eye strain'}</li>
            <li>{fr ? 'Interface multilingue (français et anglais)' : 'Multilingual interface (French and English)'}</li>
            <li>{fr ? 'Navigation au clavier sur toutes les pages' : 'Keyboard navigation on all pages'}</li>
            <li>{fr ? 'Contrastes de couleurs conformes aux recommandations WCAG 2.1' : 'Color contrasts compliant with WCAG 2.1 guidelines'}</li>
            <li>{fr ? 'Textes alternatifs sur les images' : 'Alternative text on images'}</li>
            <li>{fr ? 'Interface responsive adaptée à tous les appareils' : 'Responsive interface adapted to all devices'}</li>
          </ul>
        </section>
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">{fr ? 'Signaler un problème' : 'Report an Issue'}</h2>
          <p>{fr ? "Si vous rencontrez des difficultés d'accessibilité sur Breezy, contactez notre équipe à :" : 'If you encounter any accessibility difficulties on Breezy, contact our team at:'} <span className="text-[#3B82F6]">accessibility@breezy.app</span></p>
          <p className="mt-2">{fr ? 'Nous nous engageons à vous répondre dans un délai de 5 jours ouvrés.' : 'We are committed to responding within 5 business days.'}</p>
        </section>
      </div>
      <p className="text-xs text-[#64748B] mt-10 border-t border-[#E2E8F0] pt-4">© 2026 Breezy</p>
    </div>
  );
}
