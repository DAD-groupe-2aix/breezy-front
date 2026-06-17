'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Wind } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: appel API authService.login() quand le back sera prêt
    // Pour l'instant on redirige directement vers /home
    window.location.href = '/home';
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Partie gauche — logo */}
      <div className="flex-1 bg-[#E2E8F0] flex flex-col items-center justify-center">
        <Wind size={48} className="text-[#0F172A] mb-3" />
        <span className="text-3xl font-bold text-[#0F172A]">Breezy</span>
      </div>

      {/* Partie droite — formulaire */}
      <div className="flex-1 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#E2E8F0] rounded-2xl p-8 w-full max-w-sm flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#0F172A]">Courriel</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="écrire ici"
              required
              className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#0F172A] placeholder-[#64748B] outline-none focus:border-[#3B82F6]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#0F172A]">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="écrire ici"
              required
              className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#0F172A] placeholder-[#64748B] outline-none focus:border-[#3B82F6]"
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold py-3 rounded-full transition-colors"
          >
            Se connecter
          </button>

          <p className="text-sm text-center text-[#64748B]">
            Pas encore de compte ?{' '}
            <Link href="/register" className="text-[#3B82F6] hover:underline">
              Créer un compte
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
