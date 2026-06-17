'use client';

import MainLayout from '@/components/layout/MainLayout';
import PostCard from '@/components/post/PostCard';
import { currentUser } from '@/mock/user';
import { mockPosts } from '@/mock/post';

export default function ProfilePage() {
  const userPosts = mockPosts.filter((p) => p.author.id === currentUser.id);

  return (
    <MainLayout>
      <div className="px-4 py-6">
        <h1 className="text-xl font-bold text-[#0F172A] mb-6">{currentUser.name}</h1>

        {/* Carte profil */}
        <div className="border border-[#E2E8F0] rounded-xl p-6 mb-4 flex gap-4">
          <div className="w-16 h-16 rounded-full bg-[#E2E8F0] flex items-center justify-center text-xl font-bold text-[#64748B] shrink-0">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-bold text-[#0F172A]">{currentUser.name}</p>
            <p className="text-sm text-[#64748B]">@{currentUser.username}</p>
            {currentUser.bio && (
              <p className="text-sm text-[#0F172A] mt-1">{currentUser.bio}</p>
            )}
            <div className="flex gap-4 mt-2">
              <span className="text-sm text-[#64748B]">
                <span className="font-bold text-[#0F172A]">{currentUser.followingCount}</span> abonnements
              </span>
              <span className="text-sm text-[#64748B]">
                <span className="font-bold text-[#0F172A]">{currentUser.followersCount}</span> abonnés
              </span>
            </div>
          </div>
        </div>

        <button className="border border-[#0F172A] text-[#0F172A] font-semibold px-5 py-2 rounded-full hover:bg-[#F8FAFC] transition-colors mb-6">
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
    </MainLayout>
  );
}
