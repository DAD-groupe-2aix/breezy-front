'use client';
import { useRouter } from 'next/navigation';
import { Wind, ArrowLeft } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

export default function CookiesPage() {
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
      <h1 className="text-2xl font-bold text-[#0F172A] mb-2">{fr ? 'Politique relative aux cookies' : 'Cookie Policy'}</h1>
      <p className="text-sm text-[#64748B] mb-8">{fr ? 'Dernière mise à jour : 1er janvier 2026' : 'Last updated: January 1, 2026'}</p>
      <div className="flex flex-col gap-6 text-sm text-[#334155] leading-relaxed">
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">{fr ? "Qu'est-ce qu'un cookie ?" : 'What is a cookie?'}</h2>
          <p>{fr ? "Un cookie est un petit fichier texte stocké sur votre appareil lorsque vous visitez un site web. Il permet au site de mémoriser vos préférences et d'améliorer votre expérience de navigation." : 'A cookie is a small text file stored on your device when you visit a website. It allows the site to remember your preferences and improve your browsing experience.'}</p>
        </section>
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">{fr ? 'Cookies utilisés par Breezy' : 'Cookies used by Breezy'}</h2>
          <div className="flex flex-col gap-3">
            <div className="bg-[#F8FAFC] rounded-lg p-3">
              <p className="font-medium text-[#0F172A]">{fr ? 'Cookies essentiels' : 'Essential cookies'}</p>
              <p className="text-[#64748B] mt-1">{fr ? "Nécessaires au fonctionnement de la plateforme. Ils gèrent votre session de connexion (JWT) et vos préférences de thème. Ils ne peuvent pas être désactivés." : 'Required for the platform to function. They manage your login session (JWT) and theme preferences. They cannot be disabled.'}</p>
            </div>
            <div className="bg-[#F8FAFC] rounded-lg p-3">
              <p className="font-medium text-[#0F172A]">{fr ? 'Cookies de préférences' : 'Preference cookies'}</p>
              <p className="text-[#64748B] mt-1">{fr ? "Mémorisent vos choix de langue (FR/EN) et de thème (clair/sombre) pour personnaliser votre expérience." : 'Remember your language (FR/EN) and theme (light/dark) choices to personalize your experience.'}</p>
            </div>
            <div className="bg-[#F8FAFC] rounded-lg p-3">
              <p className="font-medium text-[#0F172A]">{fr ? 'Cookies analytiques' : 'Analytics cookies'}</p>
              <p className="text-[#64748B] mt-1">{fr ? "Nous aident à comprendre comment la plateforme est utilisée pour l'améliorer. Ces données sont anonymisées." : 'Help us understand how the platform is used so we can improve it. This data is anonymized.'}</p>
            </div>
          </div>
        </section>
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">{fr ? 'Gérer vos cookies' : 'Managing your cookies'}</h2>
          <p>{fr ? "Vous pouvez configurer votre navigateur pour refuser les cookies ou vous alerter lorsque des cookies sont envoyés. Notez que désactiver les cookies essentiels peut affecter le fonctionnement de Breezy." : 'You can configure your browser to refuse cookies or alert you when cookies are sent. Note that disabling essential cookies may affect the functioning of Breezy.'}</p>
        </section>
      </div>
      <p className="text-xs text-[#64748B] mt-10 border-t border-[#E2E8F0] pt-4">© 2026 Breezy</p>
    </div>
  );
}
