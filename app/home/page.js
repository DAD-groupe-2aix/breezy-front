'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PostCard from '@/components/post/PostCard';
import { usePosts } from '@/context/PostsContext';
import { useAuth } from '@/context/AuthContext';
import MainHeader from '@/components/layout/MainHeader';
import { useLang } from '@/context/LanguageContext';


function Avatar({ name }) {
  return (
    <div className="w-10 h-10 rounded-full bg-[#E2E8F0] flex items-center justify-center text-sm font-bold text-[#64748B] shrink-0">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

export default function HomePage() {
  const { posts, addPost } = usePosts();
  const { user } = useAuth();
  const [content, setContent] = useState(''); 
  const { t } = useLang();

  if (!user) return null;




  function handlePublish() {
    if (!content.trim()) return;
    addPost({
      id: Date.now().toString(),
      author: { id: user.id, name: user.name, username: user.username, avatar: null },
      content: content.trim(),
      likesCount: 0,
      commentsCount: 0,
      liked: false,
      following: false,
      createdAt: new Date().toISOString(),
    });
    setContent('');
  }

    return (
    <MainLayout>
      <MainHeader title={t.home} />
      <div className="px-4 py-6">
        <div className="border border-[#E2E8F0] rounded-xl p-4 mb-6 flex gap-3">
          <Avatar name={user.name} />
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={t.placeholder}
              maxLength={280}
              rows={3}
              className="w-full resize-none text-sm text-[#0F172A] placeholder-[#64748B] outline-none"
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handlePublish}
                disabled={!content.trim()}
                className="bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-40 text-white text-sm font-medium px-4 py-1.5 rounded-full transition-colors"
              >
                {t.publish}
              </button>
            </div>
          </div>
        </div>
        <div>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </MainLayout>
  );

}
