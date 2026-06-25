'use client';
import { useEffect, useState } from 'react';
import { Bell, Heart, UserPlus } from 'lucide-react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import MainHeader from '@/components/layout/MainHeader';
import { useLang } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { notifService } from '@/services/notifService';

function timeAgo(isoString) {
  const diff = Math.floor((Date.now() - new Date(isoString)) / 1000);
  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}min`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}j`;
}

function Avatar({ username, avatar }) {
  if (avatar) return <img src={avatar} alt={username} className="w-10 h-10 rounded-full object-cover shrink-0" />;
  return (
    <div className="w-10 h-10 rounded-full bg-[#E2E8F0] flex items-center justify-center text-sm font-bold text-[#64748B] shrink-0">
      {username.charAt(0).toUpperCase()}
    </div>
  );
}

function NotifIcon({ type }) {
  if (type === 'like') return <Heart size={14} className="text-[#EF4444]" fill="#EF4444" />;
  return <UserPlus size={14} className="text-[#3B82F6]" />;
}

export default function NotificationsPage() {
  const { t } = useLang();
  const { user } = useAuth();
  const [notifs, setNotifs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    notifService.getNotifications(user.id)
      .then(setNotifs)
      .finally(() => setLoading(false));
  }, [user]);

  async function handleMarkAllRead() {
    await notifService.markAllRead(user.id);
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  const unreadCount = notifs.filter((n) => !n.read).length;

  return (
    <MainLayout>
      <MainHeader title={t.notifications} />
      <div className="px-4 py-4">

        {!loading && notifs.length > 0 && unreadCount > 0 && (
          <div className="flex justify-end mb-3">
            <button
              onClick={handleMarkAllRead}
              className="text-xs text-[#3B82F6] hover:underline"
            >
              {t.markAllRead}
            </button>
          </div>
        )}

        {loading ? (
          <p className="text-center text-[#64748B] py-10">{t.loading}</p>
        ) : notifs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-[#64748B]">
            <Bell size={48} className="mb-4 text-[#E2E8F0]" />
            <p className="font-medium">{t.noNotif}</p>
            <p className="text-sm mt-1">{t.notifDesc}</p>
          </div>
        ) : (
          <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
            {notifs.map((notif) => (
              <div
                key={notif.id}
                className={`flex items-start gap-3 px-4 py-3 border-b border-[#E2E8F0] last:border-0 transition-colors ${
                  notif.read ? 'bg-white' : 'bg-[#EFF6FF]'
                }`}
              >
                <div className="relative shrink-0">
                  <Avatar username={notif.sender.username} avatar={notif.sender.avatar} />
                  <span className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-0.5">
                    <NotifIcon type={notif.type} />
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#0F172A]">
                    <Link
                      href={`/profile/${notif.sender.id}`}
                      className="font-semibold hover:underline"
                    >
                      {notif.sender.username}
                    </Link>
                    {' '}{notif.type === 'like' ? t.notifLike : t.notifFollow}
                    {notif.type === 'like' && notif.postId && (
                      <Link href={`/post/${notif.postId}`} className="text-[#3B82F6] hover:underline ml-1">
                        →
                      </Link>
                    )}
                  </p>
                  <p className="text-xs text-[#94A3B8] mt-0.5">{timeAgo(notif.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
