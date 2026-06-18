'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import PostCard from '@/components/post/PostCard';
import { mockPosts } from '@/mock/post';
import { suggestedUsers } from '@/mock/user';
import { useLang } from '@/context/LanguageContext';

export default function UserProfilePage() {
    const { id } = useParams();
    const { t } = useLang();
    const user = suggestedUsers.find((u) => u.id === id);
    const storageKey = `following_${id}`;
    const [following, setFollowing] = useState(() => {
        if (typeof window === 'undefined') return false;
        return localStorage.getItem(storageKey) === 'true';
    });
    const [popping, setPopping] = useState(false);


    if (!user) {
        return (
            <MainLayout>
                <div className="px-4 py-6">
                    <p className="text-[#64748B]">Utilisateur introuvable.</p>
                </div>
            </MainLayout>
        );
    }

    const userPosts = mockPosts.filter((p) => p.author.id === id);

    return (
        <MainLayout>
            <div className="px-4 py-6">
                <h1 className="text-xl font-bold text-[#0F172A] mb-6">{user.name}</h1>

                {/* Carte profil */}
                <div className="border border-[#E2E8F0] rounded-xl p-6 mb-4 flex gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#E2E8F0] flex items-center justify-center text-xl font-bold text-[#64748B] shrink-0">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="font-bold text-[#0F172A]">{user.name}</p>
                        <p className="text-sm text-[#64748B]">@{user.username}</p>
                    </div>
                </div>

                <button
                    onClick={() => {
                        const newValue = !following;
                        setFollowing(newValue);
                        setPopping(true);
                        localStorage.setItem(storageKey, String(newValue));
                    }}
                    onAnimationEnd={() => setPopping(false)}
                    className={`font-semibold px-5 py-2 rounded-full transition-colors mb-6 ${popping ? 'animate-button-pop' : ''} ${following
                        ? 'border border-[#E2E8F0] text-[#0F172A] hover:border-[#EF4444] hover:text-[#EF4444]'
                        : 'bg-[#0F172A] text-white hover:bg-[#1E293B]'
                        }`}
                >
                    {following ? t.unfollow : t.follow}
                </button>

                <div>
                    {userPosts.length === 0 ? (
                        <p className="text-center text-[#64748B] py-10">{t.noPost}</p>
                    ) : (
                        userPosts.map((post) => <PostCard key={post.id} post={post} />)
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
