'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import MainHeader from '@/components/layout/MainHeader';
import { useAuth } from '@/context/AuthContext';
import { useLang } from '@/context/LanguageContext';
import { userService } from '@/services/userService';
import { adminService } from '@/services/adminService';

const ROLES = ['user', 'moderator', 'admin'];
const STATUSES = ['active', 'suspended', 'banned'];

const statusStyle = {
  active: { background: '#DCFCE7', color: '#15803D' },
  suspended: { background: '#FEF9C3', color: '#A16207' },
  banned: { background: '#FEE2E2', color: '#B91C1C' },
};

export default function AdminPage() {
  const { user } = useAuth();
  const { t } = useLang();
  const router = useRouter();
  const isAdmin = user?.role === 'admin';
  const isModerator = user?.role === 'moderator';

  const statusLabel = { active: t.statusActive, suspended: t.statusSuspended, banned: t.statusBanned };
  const roleLabel = { user: t.roleUser, moderator: t.roleModerator, admin: t.roleAdmin };

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newRole, setNewRole] = useState('user');
  const [createMsg, setCreateMsg] = useState('');

  useEffect(() => {
    if (user && !isAdmin && !isModerator) router.push('/home');
  }, [user, isAdmin, isModerator, router]);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const profiles = await userService.getAllProfiles();
      let authUsers = [];
      if (isAdmin) authUsers = await adminService.listUsers();
      const byId = {};
      authUsers.forEach((u) => { byId[u.id] = u; });
      const merged = profiles.map((p) => ({
        id: p.authId,
        username: p.username,
        status: p.status,
        email: byId[p.authId]?.email ?? '',
        role: byId[p.authId]?.role ?? null,
      }));
      setRows(merged);
    } catch {
      setError(t.loadUsersError);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user && (isAdmin || isModerator)) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isAdmin, isModerator]);

  async function handleStatusChange(id, status) {
    try {
      await userService.updateStatus(id, status);
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    } catch {
      setError(t.statusChangeError);
    }
  }

  async function handleRoleChange(id, role) {
    try {
      await adminService.updateRole(id, role);
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, role } : r)));
    } catch {
      setError(t.roleChangeError);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    setCreateMsg('');
    try {
      const created = await adminService.createUser(newEmail, newPassword, newRole);
      await userService.createProfile(created.userId, newUsername.trim());
      setCreateMsg(t.accountCreatedOk);
      setNewEmail(''); setNewPassword(''); setNewUsername(''); setNewRole('user');
      load();
    } catch (err) {
      setCreateMsg(err?.response?.data?.message || t.createAccountError);
    }
  }

  if (!user || (!isAdmin && !isModerator)) return null;

  return (
    <MainLayout>
      <MainHeader title={t.admin} />
      <div className="px-4 py-6">

        {error && (
          <p className="text-sm text-[#EF4444] bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">{error}</p>
        )}

        {isAdmin && (
          <div className="border border-[#E2E8F0] rounded-xl p-5 mb-6">
            <h2 className="font-bold text-[#0F172A] mb-3">{t.createAccount}</h2>
            <form onSubmit={handleCreate} className="flex flex-col gap-3">
              <input type="email" required placeholder={t.email} value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#0F172A] outline-none focus:border-[#3B82F6]" />
              <input type="text" required placeholder={t.username} value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#0F172A] outline-none focus:border-[#3B82F6]" />
              <input type="password" required placeholder={t.password} value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#0F172A] outline-none focus:border-[#3B82F6]" />
              <select value={newRole} onChange={(e) => setNewRole(e.target.value)}
                className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#0F172A] outline-none focus:border-[#3B82F6]">
                {ROLES.map((r) => <option key={r} value={r}>{roleLabel[r]}</option>)}
              </select>
              <button type="submit"
                className="bg-[#0F172A] hover:bg-[#1E293B] text-white text-sm font-semibold py-2 rounded-full transition-colors">
                {t.createAccountBtn}
              </button>
              {createMsg && <p className="text-sm text-[#64748B]">{createMsg}</p>}
            </form>
          </div>
        )}

        {isAdmin && (
          <p className="text-xs text-[#64748B] mb-3">ⓘ {t.roleChangeNote}</p>
        )}

        <h2 className="font-bold text-[#0F172A] mb-3">{t.usersList}</h2>
        {loading ? (
          <p className="text-[#64748B]">{t.loading}</p>
        ) : (
          <div className="flex flex-col gap-3">
            {rows.map((row) => (
              <div key={row.id} className="border border-[#E2E8F0] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-[#0F172A] truncate">
                    {row.username}
                    {row.role && (
                      <span className="ml-2 text-[11px] font-medium text-[#3B82F6]">[{roleLabel[row.role]}]</span>
                    )}
                  </p>
                  {row.email && <p className="text-xs text-[#64748B] truncate">{row.email}</p>}
                  <span className="inline-block mt-1 text-[11px] font-medium px-2 py-0.5 rounded-full"
                    style={statusStyle[row.status] || {}}>
                    {statusLabel[row.status] || row.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <select value={row.status} onChange={(e) => handleStatusChange(row.id, e.target.value)}
                    className="border border-[#E2E8F0] rounded-lg px-2 py-1.5 text-xs text-[#0F172A] outline-none focus:border-[#3B82F6]">
                    {STATUSES.map((s) => <option key={s} value={s}>{statusLabel[s]}</option>)}
                  </select>

                  {isAdmin && row.role && (
                    <select value={row.role} disabled={row.id === user.id}
                      onChange={(e) => handleRoleChange(row.id, e.target.value)}
                      className="border border-[#E2E8F0] rounded-lg px-2 py-1.5 text-xs text-[#0F172A] outline-none focus:border-[#3B82F6] disabled:opacity-40">
                      {ROLES.map((r) => <option key={r} value={r}>{roleLabel[r]}</option>)}
                    </select>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
