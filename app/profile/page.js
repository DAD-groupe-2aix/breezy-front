'use client';

import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import MainHeader from '@/components/layout/MainHeader';
import PostCard from '@/components/post/PostCard';
import { useAuth } from '@/context/AuthContext';
import { usePosts } from '@/context/PostsContext';
import { useLang } from '@/context/LanguageContext';
import { userService } from '@/services/userService';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const { posts } = usePosts();
  const { t } = useLang();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editBirthdate, setEditBirthdate] = useState('');
  const [saveError, setSaveError] = useState('');
  const fileInputRef = useRef(null);

  const [listType, setListType] = useState(null);
  const [listUsers, setListUsers] = useState([]);
  const [listLoading, setListLoading] = useState(false);

  if (!user) return null;

  const userPosts = posts.filter((p) => p.author.id === user.id);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target.result;
      try {
        await userService.updateProfile(user.id, { profilePicture: dataUrl });
        updateUser({ avatar: dataUrl });
      } catch {
        setSaveError(t.profilePicError);
      }
    };
    reader.readAsDataURL(file);
  }

  async function handleSave() {
    const updates = {
      username: editName.trim() || user.username,
      bio: editBio.trim(),
      birthdate: editBirthdate || undefined,
    };
    try {
      await userService.updateProfile(user.id, updates);
      updateUser({
        name: updates.username,
        username: updates.username,
        bio: updates.bio,
        birthdate: editBirthdate,
      });
      setIsEditing(false);
    } catch (err) {
      setSaveError(err?.response?.data?.message || t.profileUpdateError);
    }
  }


  function openModal() {
    setEditName(user.username || user.name);
    setEditBio(user.bio || '');
    setEditBirthdate(user.birthdate || '');
    setSaveError('');
    setIsEditing(true);
  }

  async function openList(type) {
    setListType(type);
    setListLoading(true);
    try {
      const profile = await userService.getProfile(user.id);
      const ids = profile[type] || [];
      const profiles = await Promise.all(ids.map((id) => userService.getProfile(id).catch(() => null)));
      setListUsers(profiles.filter(Boolean));
    } catch {
      setListUsers([]);
    } finally {
      setListLoading(false);
    }
  }

  return (
    <MainLayout>
      <MainHeader title={user.name} />
      <div className="px-4 py-6">

        <div className="border border-[#E2E8F0] rounded-xl p-6 mb-4 flex gap-4">
          <div className="shrink-0">
            {user.avatar ? (
              <img src={user.avatar} alt="avatar" className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#E2E8F0] flex items-center justify-center text-xl font-bold text-[#64748B]">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <p className="font-bold text-[#0F172A]">{user.name}</p>
            <p className="text-sm text-[#64748B]">@{user.username}</p>
            {user.bio && <p className="text-sm text-[#0F172A] mt-1">{user.bio}</p>}
            {user.birthdate && (
              <p className="text-sm text-[#64748B] mt-1">{t.bornOn} {user.birthdate}</p>
            )}
            <div className="flex gap-4 mt-2">
              <button onClick={() => openList('following')} className="text-sm text-[#64748B] hover:underline cursor-pointer bg-transparent border-none p-0">
                <span className="font-bold text-[#0F172A]">{user.followingCount ?? 0}</span> {t.subscriptions}
              </button>
              <button onClick={() => openList('followers')} className="text-sm text-[#64748B] hover:underline cursor-pointer bg-transparent border-none p-0">
                <span className="font-bold text-[#0F172A]">{user.followersCount ?? 0}</span> {t.followers}
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={openModal}
          className="border border-[#0F172A] text-[#0F172A] font-semibold px-5 py-2 rounded-full hover:bg-[#F8FAFC] transition-colors mb-6"
        >
          {t.editProfile}
        </button>

        <div>
          {userPosts.length === 0 ? (
            <p className="text-center text-[#64748B] py-10">{t.noPost}</p>
          ) : (
            userPosts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
              onClick={(e) => { if (e.target === e.currentTarget) setIsEditing(false); }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 12 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="bg-white rounded-2xl p-6 w-full max-w-[440px] mx-4"
              >
                <div className="flex justify-between items-center mb-5">
                  <span className="font-bold text-lg text-[#0F172A]">{t.editProfile}</span>
                  <button onClick={() => setIsEditing(false)} className="text-[#64748B] cursor-pointer bg-transparent border-none">
                    <X size={20} />
                  </button>
                </div>

                {saveError && (
                  <p className="text-sm text-[#EF4444] bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
                    {saveError}
                  </p>
                )}

                <div className="flex flex-col items-center mb-5">
                  <div
                    className="relative cursor-pointer w-20 h-20 group"
                    onClick={() => fileInputRef.current.click()}
                  >
                    {user.avatar ? (
                      <img src={user.avatar} alt="avatar" className="w-20 h-20 rounded-full object-cover block" />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-[#E2E8F0] flex items-center justify-center text-2xl font-bold text-[#64748B]">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="absolute inset-0 rounded-full bg-black/35 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="text-white text-xs font-semibold">{t.changePic}</span>
                    </div>
                  </div>
                  <span className="text-xs text-[#64748B] mt-1.5">{t.changePic}</span>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </div>

                <div className="flex flex-col gap-3.5">
                  <div>
                    <label className="text-[13px] font-medium text-[#0F172A] block mb-1">{t.name}</label>
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      maxLength={50}
                      className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#0F172A] outline-none box-border focus:border-[#3B82F6]"
                    />
                  </div>
                  <div>
                    <label className="text-[13px] font-medium text-[#0F172A] block mb-1">{t.bio}</label>
                    <textarea
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      maxLength={160}
                      rows={3}
                      placeholder={t.bioPlaceholder}
                      className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#0F172A] outline-none box-border resize-none focus:border-[#3B82F6]"
                    />
                  </div>
                  <div>
                    <label className="text-[13px] font-medium text-[#0F172A] block mb-1">{t.birthdate}</label>
                    <input
                      type="date"
                      value={editBirthdate}
                      onChange={(e) => setEditBirthdate(e.target.value)}
                      className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#0F172A] outline-none box-border focus:border-[#3B82F6]"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-5">
                  <button
                    onClick={handleSave}
                    className="bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold px-5 py-2.5 rounded-full border-none cursor-pointer text-sm transition-colors"
                  >
                    {t.save}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {createPortal(
        <AnimatePresence>
          {listType && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
              onClick={(e) => { if (e.target === e.currentTarget) setListType(null); }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 12 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="bg-white rounded-2xl p-6 w-full max-w-[400px] mx-4 max-h-[70vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-lg text-[#0F172A]">
                    {listType === 'following' ? t.subscriptions : t.followers}
                  </span>
                  <button onClick={() => setListType(null)} className="text-[#64748B] cursor-pointer bg-transparent border-none">
                    <X size={20} />
                  </button>
                </div>

                {listLoading ? (
                  <p className="text-sm text-[#64748B]">{t.loading}</p>
                ) : listUsers.length === 0 ? (
                  <p className="text-sm text-[#64748B]">{listType === 'following' ? t.followingEmpty : t.noFollowers}</p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {listUsers.map((p) => (
                      <Link key={p.authId} href={`/profile/${p.authId}`} onClick={() => setListType(null)}
                        className="flex items-center gap-3 hover:bg-[#F8FAFC] rounded-lg p-1.5 transition-colors">
                        {p.profilePicture && p.profilePicture !== 'default-avatar.png' ? (
                          <img src={p.profilePicture} alt={p.username} className="w-9 h-9 rounded-full object-cover shrink-0" />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-[#E2E8F0] flex items-center justify-center text-xs font-bold text-[#64748B] shrink-0">
                            {p.username.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-[#0F172A]">{p.username}</p>
                          <p className="text-xs text-[#64748B]">@{p.username}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </MainLayout>
  );
}
