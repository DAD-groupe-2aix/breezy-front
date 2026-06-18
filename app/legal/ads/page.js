'use client';
import { useRouter } from 'next/navigation';
import { Wind, ArrowLeft } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

export default function AdsPage() {
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
      <h1 className="text-2xl font-bold text-[#0F172A] mb-2">{fr ? 'Informations sur les publicités' : 'Advertising Information'}</h1>
      <p className="text-sm text-[#64748B] mb-8">{fr ? 'Comment la publicité fonctionne sur Breezy' : 'How advertising works on Breezy'}</p>
      <div className="flex flex-col gap-6 text-sm text-[#334155] leading-relaxed">
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">{fr ? 'Publicité sur Breezy' : 'Advertising on Breezy'}</h2>
          <p>{fr ? "Breezy est actuellement en phase de développement. La plateforme n'affiche pas encore de publicités. Cette page sera mise à jour lorsque notre système publicitaire sera déployé." : 'Breezy is currently in development. The platform does not yet display advertisements. This page will be updated when our advertising system is deployed.'}</p>
        </section>
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">{fr ? 'Notre approche' : 'Our Approach'}</h2>
          <p>{fr ? "Lorsque des publicités seront introduites, Breezy s'engage à :" : 'When advertising is introduced, Breezy commits to:'}</p>
          <ul className="list-disc list-inside flex flex-col gap-2 mt-2">
            <li>{fr ? 'Toujours clairement identifier les contenus sponsorisés' : 'Always clearly identify sponsored content'}</li>
            <li>{fr ? 'Ne jamais vendre vos données personnelles à des annonceurs' : 'Never sell your personal data to advertisers'}</li>
            <li>{fr ? 'Vous donner le contrôle sur vos préférences publicitaires' : 'Give you control over your advertising preferences'}</li>
            <li>{fr ? 'Respecter le RGPD dans toutes nos pratiques publicitaires' : 'Comply with GDPR in all advertising practices'}</li>
          </ul>
        </section>
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">{fr ? 'Annonceurs' : 'Advertisers'}</h2>
          <p>{fr ? 'Vous souhaitez faire de la publicité sur Breezy ? Contactez-nous à :' : 'Want to advertise on Breezy? Contact us at:'} <span className="text-[#3B82F6]">ads@breezy.app</span></p>
        </section>
      </div>
      <p className="text-xs text-[#64748B] mt-10 border-t border-[#E2E8F0] pt-4">© 2026 Breezy</p>
    </div>
  );
}
