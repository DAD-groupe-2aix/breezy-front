'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Wind } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/authService';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(e) { //async avec try et catch pour attraper les erreurs et afficher un mess vu que les fonctions sont asynchrones (vraies appels reseaux)
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token, user } = await authService.register(email, password);
      login(user, token);
      router.push('/home');
    } catch {
      setError('Erreur lors de la création du compte.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <div className="flex-1 bg-[#E2E8F0] flex flex-col items-center justify-center">
        <Wind size={48} className="text-[#0F172A] mb-3" />
        <span className="text-3xl font-bold text-[#0F172A]">Breezy</span>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-white border border-[#E2E8F0] rounded-2xl p-8 w-full max-w-sm flex flex-col gap-4">

          {error && (
            <p className="text-sm text-[#EF4444] bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

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
            disabled={loading}
            className="mt-2 bg-[#0F172A] hover:bg-[#1E293B] disabled:opacity-50 text-white font-semibold py-3 rounded-full transition-colors"
          >
            {loading ? 'Création...' : 'Créer mon compte'}
          </button>

          <p className="text-sm text-center text-[#64748B]">
            Déjà un compte ?{' '}
            <Link href="/login" className="text-[#3B82F6] hover:underline">Se connecter</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
