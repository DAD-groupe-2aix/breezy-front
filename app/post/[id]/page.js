'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Image as ImageIcon, X } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import CommentCard from '@/components/post/CommentCard';
import { useAuth } from '@/context/AuthContext';
import { useLang } from '@/context/LanguageContext';
import { postService } from '@/services/postService';
import { usePosts } from '@/context/PostsContext';
import ImageGrid from '@/components/post/ImageGrid';



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

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

export default function PostDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { updatePost } = usePosts();
  const { t } = useLang();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState('');
  const [replyImages, setReplyImages] = useState([]);


  useEffect(() => {
    if (!user) return;
    setLoading(true);
    Promise.all([
      postService.getPost(id, user.id),
      postService.getComments(id, user.id),
    ])
      .then(([postData, commentsData]) => {
        setPost(postData);
        setComments(commentsData);
      })
      .finally(() => setLoading(false));
  }, [id, user]);

  function handleReplyImageChange(e) {
    const files = Array.from(e.target.files).slice(0, 4 - replyImages.length);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setReplyImages((prev) => [...prev, event.target.result].slice(0, 4));
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  }

  function removeReplyImage(index) {
    setReplyImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handlePublishReply() {
    if (!reply.trim()) return;
    try {
      const newComment = await postService.createComment(id, user.id, reply.trim(), replyImages);
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      updatePost(id, { commentsCount: updatedComments.length });
      setReply('');
      setReplyImages([]);
    } catch {
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

  if (!post) {
    return (
      <MainLayout>
        <div className="px-4 py-6">
          <p className="text-[#64748B]">{t.postNotFound}</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="px-4 py-6">

        <Link href="/home" className="flex items-center gap-2 text-sm text-[#64748B] hover:text-[#0F172A] mb-6 transition-colors">
          <ArrowLeft size={18} />
          {t.back}
        </Link>

        <div className="border border-[#E2E8F0] rounded-xl p-5 mb-6">
          <div className="flex gap-3">
            <Avatar name={post.author.name} avatar={post.author.avatar} />
            <div>
              <Link href={post.author.id === user.id ? '/profile' : `/profile/${post.author.id}`} className="font-semibold text-sm text-[#0F172A] hover:underline">
                {post.author.name}
              </Link>
              <span className="text-sm text-[#64748B] ml-2">@{post.author.username}</span>
              <span className="text-sm text-[#64748B] ml-2">· {formatDate(post.createdAt)}</span>
            </div>
          </div>
          <p className="mt-3 text-[#0F172A] leading-relaxed break-words">{post.content}</p>
          <ImageGrid images={post.images} />

          <p className="mt-3 text-sm text-[#64748B]">

            <span className="font-semibold text-[#0F172A]">{comments.length}</span> {t.commentsLabel} ·{' '}
            <span className="font-semibold text-[#0F172A]">{post.likesCount}</span> {t.likesLabel}
          </p>
        </div>

        <div className="border border-[#E2E8F0] rounded-xl p-4 mb-6 flex gap-3">
          <Avatar name={user.name} avatar={user.avatar} />
          <div className="flex-1">
            <p className="text-xs text-[#64748B] mb-1">{t.yourReply}</p>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder={t.writeHere}
              maxLength={280}
              rows={3}
              className="w-full resize-none text-sm text-[#0F172A] placeholder-[#64748B] outline-none"
            />

            {replyImages.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                {replyImages.map((src, i) => (
                  <div key={i} className="relative">
                    <img src={src} alt="" className="w-full h-28 object-cover rounded-lg" />
                    <button
                      onClick={() => removeReplyImage(i)}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between mt-2">
              <label className={`cursor-pointer text-[#3B82F6] ${replyImages.length >= 4 ? 'opacity-40 pointer-events-none' : ''}`}>
                <ImageIcon size={20} />
                <input type="file" accept="image/*" multiple className="hidden" onChange={handleReplyImageChange} disabled={replyImages.length >= 4} />
              </label>

              <button
                onClick={handlePublishReply}
                disabled={!reply.trim()}
                className="bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-40 text-white text-sm font-medium px-4 py-1.5 rounded-full transition-colors"
              >
                {t.publish}
              </button>
            </div>

          </div>
        </div>

        <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
          {comments.length === 0 ? (
            <p className="text-center text-[#64748B] py-10">{t.noComment}</p>
          ) : (
            comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} postId={id} />
            ))
          )}
        </div>

      </div>
    </MainLayout>
  );
}
