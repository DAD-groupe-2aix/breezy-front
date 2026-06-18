'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Wind, ArrowLeft } from 'lucide-react';

export default function TermsPage() {
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

      <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Conditions d'utilisation</h1>
      <p className="text-sm text-[#64748B] mb-8">Dernière mise à jour : 1er janvier 2026</p>

      <div className="flex flex-col gap-6 text-sm text-[#334155] leading-relaxed">
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">1. Acceptation des conditions</h2>
          <p>En accédant à Breezy et en utilisant nos services, vous acceptez d'être lié par les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre plateforme.</p>
        </section>

        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">2. Description du service</h2>
          <p>Breezy est un réseau social permettant aux utilisateurs de publier des messages courts, de suivre d'autres utilisateurs et d'interagir avec du contenu. Le service est fourni tel quel, sans garantie de disponibilité continue.</p>
        </section>

        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">3. Création de compte</h2>
          <p>Vous devez avoir au moins 13 ans pour créer un compte Breezy. Vous êtes responsable de maintenir la confidentialité de vos identifiants de connexion et de toutes les activités réalisées depuis votre compte.</p>
        </section>

        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">4. Contenu des utilisateurs</h2>
          <p>Vous conservez la propriété du contenu que vous publiez sur Breezy. En publiant du contenu, vous accordez à Breezy une licence non exclusive pour l'afficher et le distribuer au sein de la plateforme.</p>
        </section>

        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">5. Comportement interdit</h2>
          <p>Il est interdit d'utiliser Breezy pour publier du contenu illégal, haineux, diffamatoire, ou portant atteinte aux droits d'autrui. Breezy se réserve le droit de supprimer tout contenu inapproprié et de suspendre les comptes contrevenants.</p>
        </section>

        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">6. Modifications</h2>
          <p>Breezy peut modifier ces conditions à tout moment. Nous vous informerons des changements importants. L'utilisation continue de la plateforme après notification vaut acceptation des nouvelles conditions.</p>
        </section>

        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">7. Contact</h2>
          <p>Pour toute question concernant ces conditions, contactez-nous à : <span className="text-[#3B82F6]">legal@breezy.app</span></p>
        </section>
      </div>

      <p className="text-xs text-[#64748B] mt-10 border-t border-[#E2E8F0] pt-4">© 2026 Breezy</p>
    </div>
  );
}
