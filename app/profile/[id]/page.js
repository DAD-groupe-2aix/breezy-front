'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import PostCard from '@/components/post/PostCard';
import { userService } from '@/services/userService';
import { postService } from '@/services/postService';
import { useAuth } from '@/context/AuthContext';
import { useLang } from '@/context/LanguageContext';

export default function UserProfilePage() {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const { t } = useLang();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const [popping, setPopping] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    setLoading(true);
    Promise.all([
      userService.getProfile(id),
      postService.getUserPosts(id, currentUser.id),
    ])
      .then(([profileData, userPosts]) => {
        setProfile(profileData);
        setPosts(userPosts);
        setFollowing(profileData.followers?.includes(currentUser.id) ?? false);
      })
      .catch(() => setProfile(null))
      .finally(() => setLoading(false));
  }, [id, currentUser]);

  async function handleFollowToggle() {
    const targetId = Number(id);
    setPopping(true);
    try {
      if (following) {
        await userService.unfollowUser(targetId, currentUser.id);
      } else {
        await userService.followUser(targetId, currentUser.id);
      }
      setFollowing(!following);
    } catch {
      // état affiché inchangé si l'appel échoue
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="px-4 py-6">
          <p className="text-[#64748B]">{t.loading}</p>

        </div>
      </MainLayout>
    );
  }

  if (!profile) {
    return (
      <MainLayout>
        <div className="px-4 py-6">
          <p className="text-[#64748B]">{t.userNotFound}</p>

        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="px-4 py-6">
        <h1 className="text-xl font-bold text-[#0F172A] mb-6">{profile.username}</h1>

        <div className="border border-[#E2E8F0] rounded-xl p-6 mb-4 flex gap-4">
          <div className="w-16 h-16 rounded-full bg-[#E2E8F0] flex items-center justify-center text-xl font-bold text-[#64748B] shrink-0">
            {profile.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-bold text-[#0F172A]">{profile.username}</p>
            <p className="text-sm text-[#64748B]">@{profile.username}</p>
            {profile.bio && <p className="text-sm text-[#0F172A] mt-1">{profile.bio}</p>}
          </div>
        </div>

        <button
          onClick={handleFollowToggle}
          onAnimationEnd={() => setPopping(false)}
          className={`font-semibold px-5 py-2 rounded-full transition-colors mb-6 ${popping ? 'animate-button-pop' : ''} ${following
            ? 'border border-[#E2E8F0] text-[#0F172A] hover:border-[#EF4444] hover:text-[#EF4444]'
            : 'bg-[#0F172A] text-white hover:bg-[#1E293B]'
            }`}
        >
          {following ? t.unfollow : t.follow}
        </button>

        <div>
          {posts.length === 0 ? (
            <p className="text-center text-[#64748B] py-10">{t.noPost}</p>
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </div>
      </div>
    </MainLayout>
  );
}
