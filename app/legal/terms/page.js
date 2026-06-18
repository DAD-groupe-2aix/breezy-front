'use client';
import { useRouter } from 'next/navigation';
import { Wind, ArrowLeft } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

export default function TermsPage() {
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
      <h1 className="text-2xl font-bold text-[#0F172A] mb-2">{fr ? "Conditions d'utilisation" : 'Terms of Use'}</h1>
      <p className="text-sm text-[#64748B] mb-8">{fr ? 'Dernière mise à jour : 1er janvier 2026' : 'Last updated: January 1, 2026'}</p>
      <div className="flex flex-col gap-6 text-sm text-[#334155] leading-relaxed">
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">{fr ? '1. Acceptation des conditions' : '1. Acceptance of Terms'}</h2>
          <p>{fr ? "En accédant à Breezy et en utilisant nos services, vous acceptez d'être lié par les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre plateforme." : "By accessing Breezy and using our services, you agree to be bound by these terms of use. If you do not accept these terms, please do not use our platform."}</p>
        </section>
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">{fr ? '2. Description du service' : '2. Service Description'}</h2>
          <p>{fr ? "Breezy est un réseau social permettant aux utilisateurs de publier des messages courts, de suivre d'autres utilisateurs et d'interagir avec du contenu. Le service est fourni tel quel, sans garantie de disponibilité continue." : 'Breezy is a social network that allows users to publish short messages, follow other users, and interact with content. The service is provided as-is, without any guarantee of continuous availability.'}</p>
        </section>
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">{fr ? '3. Création de compte' : '3. Account Creation'}</h2>
          <p>{fr ? "Vous devez avoir au moins 13 ans pour créer un compte Breezy. Vous êtes responsable de maintenir la confidentialité de vos identifiants de connexion et de toutes les activités réalisées depuis votre compte." : 'You must be at least 13 years old to create a Breezy account. You are responsible for maintaining the confidentiality of your login credentials and all activities performed from your account.'}</p>
        </section>
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">{fr ? '4. Contenu des utilisateurs' : '4. User Content'}</h2>
          <p>{fr ? "Vous conservez la propriété du contenu que vous publiez sur Breezy. En publiant du contenu, vous accordez à Breezy une licence non exclusive pour l'afficher et le distribuer au sein de la plateforme." : 'You retain ownership of the content you post on Breezy. By posting content, you grant Breezy a non-exclusive license to display and distribute it within the platform.'}</p>
        </section>
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">{fr ? '5. Comportement interdit' : '5. Prohibited Conduct'}</h2>
          <p>{fr ? "Il est interdit d'utiliser Breezy pour publier du contenu illégal, haineux, diffamatoire, ou portant atteinte aux droits d'autrui. Breezy se réserve le droit de supprimer tout contenu inapproprié et de suspendre les comptes contrevenants." : 'It is prohibited to use Breezy to post illegal, hateful, defamatory, or rights-infringing content. Breezy reserves the right to remove any inappropriate content and suspend offending accounts.'}</p>
        </section>
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">{fr ? '6. Modifications' : '6. Modifications'}</h2>
          <p>{fr ? "Breezy peut modifier ces conditions à tout moment. Nous vous informerons des changements importants. L'utilisation continue de la plateforme après notification vaut acceptation des nouvelles conditions." : 'Breezy may modify these terms at any time. We will notify you of significant changes. Continued use of the platform after notification constitutes acceptance of the new terms.'}</p>
        </section>
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">{fr ? '7. Contact' : '7. Contact'}</h2>
          <p>{fr ? 'Pour toute question concernant ces conditions, contactez-nous à :' : 'For any questions regarding these terms, contact us at:'} <span className="text-[#3B82F6]">legal@breezy.app</span></p>
        </section>
      </div>
      <p className="text-xs text-[#64748B] mt-10 border-t border-[#E2E8F0] pt-4">© 2026 Breezy</p>
    </div>
  );
}
