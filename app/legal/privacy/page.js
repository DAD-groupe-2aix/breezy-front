'use client';
import { useRouter } from 'next/navigation';
import { Wind, ArrowLeft } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

export default function PrivacyPage() {
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
      <h1 className="text-2xl font-bold text-[#0F172A] mb-2">{fr ? 'Politique de confidentialité' : 'Privacy Policy'}</h1>
      <p className="text-sm text-[#64748B] mb-8">{fr ? 'Dernière mise à jour : 1er janvier 2026' : 'Last updated: January 1, 2026'}</p>
      <div className="flex flex-col gap-6 text-sm text-[#334155] leading-relaxed">
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">{fr ? '1. Données collectées' : '1. Data We Collect'}</h2>
          <p>{fr ? "Breezy collecte les données que vous nous fournissez directement : nom d'utilisateur, adresse e-mail, mot de passe (chiffré), photo de profil, biographie, et les messages que vous publiez. Nous collectons également des données techniques comme votre adresse IP et les informations de votre navigateur." : "Breezy collects data you provide directly: username, email address, password (encrypted), profile photo, biography, and the messages you post. We also collect technical data such as your IP address and browser information."}</p>
        </section>
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">{fr ? '2. Utilisation des données' : '2. How We Use Your Data'}</h2>
          <p>{fr ? "Vos données sont utilisées pour : fournir et améliorer le service, personnaliser votre expérience, vous envoyer des notifications, détecter et prévenir les fraudes, et respecter nos obligations légales." : 'Your data is used to: provide and improve the service, personalize your experience, send you notifications, detect and prevent fraud, and comply with our legal obligations.'}</p>
        </section>
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">{fr ? '3. Partage des données' : '3. Data Sharing'}</h2>
          <p>{fr ? "Nous ne vendons pas vos données personnelles à des tiers. Nous pouvons partager vos données avec des prestataires de services qui nous aident à exploiter la plateforme, sous réserve d'accords de confidentialité stricts." : 'We do not sell your personal data to third parties. We may share your data with service providers who help us operate the platform, subject to strict confidentiality agreements.'}</p>
        </section>
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">{fr ? '4. Sécurité' : '4. Security'}</h2>
          <p>{fr ? "Nous utilisons des technologies de chiffrement standard (JWT, HTTPS) pour protéger vos données. Vos mots de passe ne sont jamais stockés en clair." : 'We use standard encryption technologies (JWT, HTTPS) to protect your data. Your passwords are never stored in plain text.'}</p>
        </section>
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">{fr ? '5. Vos droits (RGPD)' : '5. Your Rights (GDPR)'}</h2>
          <p>{fr ? "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ces droits, contactez :" : 'Under the GDPR, you have the right to access, rectify, delete, and port your data. To exercise these rights, contact:'} <span className="text-[#3B82F6]">privacy@breezy.app</span></p>
        </section>
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">{fr ? '6. Conservation des données' : '6. Data Retention'}</h2>
          <p>{fr ? "Vos données sont conservées tant que votre compte est actif. Après suppression de votre compte, vos données sont effacées dans un délai de 30 jours, sauf obligation légale contraire." : 'Your data is retained for as long as your account is active. After account deletion, your data is erased within 30 days, unless otherwise required by law.'}</p>
        </section>
      </div>
      <p className="text-xs text-[#64748B] mt-10 border-t border-[#E2E8F0] pt-4">© 2026 Breezy</p>
    </div>
  );
}
