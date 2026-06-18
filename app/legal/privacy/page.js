'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Wind, ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
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

      <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Politique de confidentialité</h1>
      <p className="text-sm text-[#64748B] mb-8">Dernière mise à jour : 1er janvier 2026</p>

      <div className="flex flex-col gap-6 text-sm text-[#334155] leading-relaxed">
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">1. Données collectées</h2>
          <p>Breezy collecte les données que vous nous fournissez directement : nom d'utilisateur, adresse e-mail, mot de passe (chiffré), photo de profil, biographie, et les messages que vous publiez. Nous collectons également des données techniques comme votre adresse IP et les informations de votre navigateur.</p>
        </section>

        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">2. Utilisation des données</h2>
          <p>Vos données sont utilisées pour : fournir et améliorer le service, personnaliser votre expérience, vous envoyer des notifications, détecter et prévenir les fraudes, et respecter nos obligations légales.</p>
        </section>

        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">3. Partage des données</h2>
          <p>Nous ne vendons pas vos données personnelles à des tiers. Nous pouvons partager vos données avec des prestataires de services qui nous aident à exploiter la plateforme, sous réserve d'accords de confidentialité stricts.</p>
        </section>

        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">4. Sécurité</h2>
          <p>Nous utilisons des technologies de chiffrement standard (JWT, HTTPS) pour protéger vos données. Vos mots de passe ne sont jamais stockés en clair.</p>
        </section>

        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">5. Vos droits (RGPD)</h2>
          <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ces droits, contactez : <span className="text-[#3B82F6]">privacy@breezy.app</span></p>
        </section>

        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">6. Conservation des données</h2>
          <p>Vos données sont conservées tant que votre compte est actif. Après suppression de votre compte, vos données sont effacées dans un délai de 30 jours, sauf obligation légale contraire.</p>
        </section>
      </div>

      <p className="text-xs text-[#64748B] mt-10 border-t border-[#E2E8F0] pt-4">© 2026 Breezy</p>
    </div>
  );
}
