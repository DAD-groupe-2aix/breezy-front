'use client';

import { useState } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import PostCard from '@/components/post/PostCard';
import { usePosts } from '@/context/PostsContext';
import { useAuth } from '@/context/AuthContext';
import MainHeader from '@/components/layout/MainHeader';
import { useLang } from '@/context/LanguageContext';
import { postService } from '@/services/postService';

function Avatar({ name, avatar }) {
  if (avatar) {
    return <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover shrink-0" />;
  }
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
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const { t } = useLang();

  if (!user) return null;

  function handleImageChange(e) {
    const files = Array.from(e.target.files).slice(0, 4 - images.length);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages((prev) => [...prev, event.target.result].slice(0, 4));
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  }

  function removeImage(index) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handlePublish() {
    if (!content.trim()) return;
    try {
      const newPost = await postService.createPost(user.id, content.trim(), images);
      addPost(newPost);
      setContent('');
      setImages([]);
    } catch (err) {
      setError(err?.response?.status === 403 ? t.accountRestricted : t.publishError);
    }
  }

  return (
    <MainLayout>
      <MainHeader title={t.home} />
      {error && (
        <p className="text-sm text-[#EF4444] bg-red-50 border border-red-200 rounded-lg px-3 py-2 mx-4 mt-4">
          {error}
        </p>
      )}

      <div className="px-4 py-6">
        <div className="border border-[#E2E8F0] rounded-xl p-4 mb-6 flex gap-3">
          <Avatar name={user.name} avatar={user.avatar} />

          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={t.placeholder}
              maxLength={280}
              rows={3}
              className="w-full resize-none text-sm text-[#0F172A] placeholder-[#64748B] outline-none"
            />

            {images.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                {images.map((src, i) => (
                  <div key={i} className="relative">
                    <img src={src} alt="" className="w-full h-28 object-cover rounded-lg" />
                    <button
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between mt-2">
              <label className={`cursor-pointer text-[#3B82F6] ${images.length >= 4 ? 'opacity-40 pointer-events-none' : ''}`}>
                <ImageIcon size={20} />
                <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} disabled={images.length >= 4} />
              </label>

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
