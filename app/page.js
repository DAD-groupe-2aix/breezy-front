import Link from 'next/link';
import { Wind } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Partie gauche — logo */}
      <div className="flex-1 bg-[#E2E8F0] flex flex-col items-center justify-center">
        <Wind size={48} className="text-[#0F172A] mb-3" />
        <span className="text-3xl font-bold text-[#0F172A]">Breezy</span>
      </div>

      {/* Partie droite — boutons */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <Link
          href="/login"
          className="w-64 text-center bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold py-3 rounded-full transition-colors"
        >
          S'authentifier
        </Link>
        <Link
          href="/register"
          className="w-64 text-center bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold py-3 rounded-full transition-colors"
        >
          Créer un compte
        </Link>
      </div>
    </div>
  );
}
