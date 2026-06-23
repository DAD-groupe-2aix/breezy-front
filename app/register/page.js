'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Wind } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/authService';
import { userService, toAuthFields } from '@/services/userService';


export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, logout, updateUser } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');


  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token, user } = await authService.register(email, password);
      login(user, token);
      const profile = await userService.createProfile(user.id, username.trim());
      updateUser(toAuthFields(profile));
      router.push('/home');
    } catch (err) {
      logout();
      setError(err?.response?.data?.message || 'Erreur lors de la création du compte.');
    } finally {

      setLoading(false);
    }
  }


  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">

      <div className="flex md:hidden items-center justify-center gap-2 pt-10 pb-4">
        <Wind size={28} className="text-[#0F172A]" />
        <span className="text-2xl font-bold text-[#0F172A]">Breezy</span>
      </div>

      <div className="hidden md:flex flex-1 bg-[#E2E8F0] flex-col items-center justify-center">
        <Wind size={48} className="text-[#0F172A] mb-3" />
        <span className="text-3xl font-bold text-[#0F172A]">Breezy</span>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 pb-10">
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
            <label className="text-sm font-medium text-[#0F172A]">Nom d&apos;utilisateur</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
