'use client';

import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import PostCard from '@/components/post/PostCard';
import { useAuth } from '@/context/AuthContext';
import { usePosts } from '@/context/PostsContext';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const { posts } = usePosts();

  if (!user) return null;

  const userPosts = posts.filter((p) => p.author.id === user.id);
  const avatarKey = `avatar_${user.id}`;

  const [avatarSrc, setAvatarSrc] = useState(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(avatarKey);
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editBio, setEditBio] = useState(user.bio || '');
  const [editBirthdate, setEditBirthdate] = useState(user.birthdate || '');
  const fileInputRef = useRef(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      localStorage.setItem(avatarKey, dataUrl);
      setAvatarSrc(dataUrl);
    };
    reader.readAsDataURL(file);
  }

  function handleSave() {
    updateUser({
      name: editName.trim() || user.name,
      bio: editBio.trim(),
      birthdate: editBirthdate,
    });
    setIsEditing(false);
  }

  function openModal() {
    setEditName(user.name);
    setEditBio(user.bio || '');
    setEditBirthdate(user.birthdate || '');
    setIsEditing(true);
  }

  return (
    <MainLayout>
      <div className="px-4 py-6">
        <h1 className="text-xl font-bold text-[#0F172A] mb-6">{user.name}</h1>

        <div className="border border-[#E2E8F0] rounded-xl p-6 mb-4 flex gap-4">
          <div className="shrink-0">
            {avatarSrc ? (
              <img src={avatarSrc} alt="avatar" className="w-16 h-16 rounded-full object-cover" style={{ width: 64, height: 64 }} />
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
              <p className="text-sm text-[#64748B] mt-1">Né(e) le {user.birthdate}</p>
            )}
            <div className="flex gap-4 mt-2">
              <span className="text-sm text-[#64748B]">
                <span className="font-bold text-[#0F172A]">{user.followingCount ?? 0}</span> abonnements
              </span>
              <span className="text-sm text-[#64748B]">
                <span className="font-bold text-[#0F172A]">{user.followersCount ?? 0}</span> abonnés
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={openModal}
          className="border border-[#0F172A] text-[#0F172A] font-semibold px-5 py-2 rounded-full hover:bg-[#F8FAFC] transition-colors mb-6"
        >
          Modifier le profil
        </button>

        <div>
          {userPosts.length === 0 ? (
            <p className="text-center text-[#64748B] py-10">Aucun post pour l'instant.</p>
          ) : (
            userPosts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </div>
      </div>

      {/* Modal via Portal — rendu directement dans document.body */}
      {isEditing && createPortal(
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}
          onClick={(e) => { if (e.target === e.currentTarget) setIsEditing(false); }}
        >
          <div style={{ background: 'white', borderRadius: 16, padding: 24, width: '100%', maxWidth: 440, margin: '0 16px' }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span style={{ fontWeight: 700, fontSize: 18, color: '#0F172A' }}>Modifier le profil</span>
              <button onClick={() => setIsEditing(false)} style={{ color: '#64748B', cursor: 'pointer', background: 'none', border: 'none' }}>
                <X size={20} />
              </button>
            </div>

            {/* Avatar */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
              <div
                style={{ position: 'relative', cursor: 'pointer', width: 80, height: 80 }}
                onClick={() => fileInputRef.current.click()}
              >
                {avatarSrc ? (
                  <img src={avatarSrc} alt="avatar" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <div style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700, color: '#64748B' }}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0 }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                >
                  <span style={{ color: 'white', fontSize: 12, fontWeight: 600 }}>Changer</span>
                </div>
              </div>
              <span style={{ fontSize: 12, color: '#64748B', marginTop: 6 }}>Clique pour changer la photo</span>
              <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
            </div>

            {/* Champs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#0F172A', display: 'block', marginBottom: 4 }}>Nom</label>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  maxLength={50}
                  style={{ width: '100%', border: '1px solid #E2E8F0', borderRadius: 8, padding: '8px 12px', fontSize: 14, color: '#0F172A', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                  onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
                />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#0F172A', display: 'block', marginBottom: 4 }}>Bio</label>
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  maxLength={160}
                  rows={3}
                  placeholder="Parle de toi en quelques mots"
                  style={{ width: '100%', border: '1px solid #E2E8F0', borderRadius: 8, padding: '8px 12px', fontSize: 14, color: '#0F172A', resize: 'none', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                  onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
                />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#0F172A', display: 'block', marginBottom: 4 }}>Date de naissance</label>
                <input
                  type="date"
                  value={editBirthdate}
                  onChange={(e) => setEditBirthdate(e.target.value)}
                  style={{ width: '100%', border: '1px solid #E2E8F0', borderRadius: 8, padding: '8px 12px', fontSize: 14, color: '#0F172A', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                  onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
                />
              </div>
            </div>

            {/* Bouton enregistrer */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
              <button
                onClick={handleSave}
                style={{ backgroundColor: '#0F172A', color: 'white', fontWeight: 600, padding: '10px 20px', borderRadius: 9999, border: 'none', cursor: 'pointer', fontSize: 14 }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1E293B'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0F172A'}
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </MainLayout>
  );
}
