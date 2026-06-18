'use client';
import { useRouter } from 'next/navigation';
import { Wind, ArrowLeft } from 'lucide-react';

export default function CookiesPage() {
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

      <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Politique relative aux cookies</h1>
      <p className="text-sm text-[#64748B] mb-8">Dernière mise à jour : 1er janvier 2026</p>

      <div className="flex flex-col gap-6 text-sm text-[#334155] leading-relaxed">
        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">Qu'est-ce qu'un cookie ?</h2>
          <p>Un cookie est un petit fichier texte stocké sur votre appareil lorsque vous visitez un site web. Il permet au site de mémoriser vos préférences et d'améliorer votre expérience de navigation.</p>
        </section>

        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">Cookies utilisés par Breezy</h2>
          <div className="flex flex-col gap-3">
            <div className="bg-[#F8FAFC] rounded-lg p-3">
              <p className="font-medium text-[#0F172A]">Cookies essentiels</p>
              <p className="text-[#64748B] mt-1">Nécessaires au fonctionnement de la plateforme. Ils gèrent votre session de connexion (JWT) et vos préférences de thème. Ils ne peuvent pas être désactivés.</p>
            </div>
            <div className="bg-[#F8FAFC] rounded-lg p-3">
              <p className="font-medium text-[#0F172A]">Cookies de préférences</p>
              <p className="text-[#64748B] mt-1">Mémorisent vos choix de langue (FR/EN) et de thème (clair/sombre) pour personnaliser votre expérience.</p>
            </div>
            <div className="bg-[#F8FAFC] rounded-lg p-3">
              <p className="font-medium text-[#0F172A]">Cookies analytiques</p>
              <p className="text-[#64748B] mt-1">Nous aident à comprendre comment la plateforme est utilisée pour l'améliorer. Ces données sont anonymisées.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-[#0F172A] mb-2">Gérer vos cookies</h2>
          <p>Vous pouvez configurer votre navigateur pour refuser les cookies ou vous alerter lorsque des cookies sont envoyés. Notez que désactiver les cookies essentiels peut affecter le fonctionnement de Breezy.</p>
        </section>
      </div>

      <p className="text-xs text-[#64748B] mt-10 border-t border-[#E2E8F0] pt-4">© 2026 Breezy</p>
    </div>
  );
}
