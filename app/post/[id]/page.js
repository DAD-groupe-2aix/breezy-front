'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import CommentCard from '@/components/post/CommentCard';
import { mockPosts, mockComments } from '@/mock/post';
import { currentUser } from '@/mock/user';

function Avatar({ name }) {
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
  const post = mockPosts.find((p) => p.id === id);
  const [comments, setComments] = useState(
    mockComments.filter((c) => c.postId === id)
  );
  const [reply, setReply] = useState('');

  if (!post) {
    return (
      <MainLayout>
        <div className="px-4 py-6">
          <p className="text-[#64748B]">Post introuvable.</p>
        </div>
      </MainLayout>
    );
  }

  function handlePublishReply() {
    if (!reply.trim()) return;
    const newComment = {
      id: `c${Date.now()}`,
      postId: id,
      author: currentUser,
      content: reply.trim(),
      likesCount: 0,
      liked: false,
      createdAt: new Date().toISOString(),
    };
    setComments([...comments, newComment]);
    setReply('');
  }

  return (
    <MainLayout>
      <div className="px-4 py-6">

        {/* Bouton retour */}
        <Link href="/home" className="flex items-center gap-2 text-sm text-[#64748B] hover:text-[#0F172A] mb-6 transition-colors">
          <ArrowLeft size={18} />
          Retour
        </Link>

        {/* Post original */}
        <div className="border border-[#E2E8F0] rounded-xl p-5 mb-6">
          <div className="flex gap-3">
            <Avatar name={post.author.name} />
            <div>
              <Link href={`/profile/${post.author.id}`} className="font-semibold text-sm text-[#0F172A] hover:underline">
                {post.author.name}
              </Link>
              <span className="text-sm text-[#64748B] ml-2">@{post.author.username}</span>
              <span className="text-sm text-[#64748B] ml-2">· {formatDate(post.createdAt)}</span>
            </div>
          </div>
          <p className="mt-3 text-[#0F172A] leading-relaxed">{post.content}</p>
          <p className="mt-3 text-sm text-[#64748B]">
            <span className="font-semibold text-[#0F172A]">{post.commentsCount}</span> commentaires ·{' '}
            <span className="font-semibold text-[#0F172A]">{post.likesCount}</span> likes
          </p>
        </div>

        {/* Zone de réponse */}
        <div className="border border-[#E2E8F0] rounded-xl p-4 mb-6 flex gap-3">
          <Avatar name={currentUser.name} />
          <div className="flex-1">
            <p className="text-xs text-[#64748B] mb-1">Votre réponse :</p>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="écrire ici"
              maxLength={280}
              rows={3}
              className="w-full resize-none text-sm text-[#0F172A] placeholder-[#64748B] outline-none"
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handlePublishReply}
                disabled={!reply.trim()}
                className="bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-40 text-white text-sm font-medium px-4 py-1.5 rounded-full transition-colors"
              >
                Publier
              </button>
            </div>
          </div>
        </div>

        {/* Liste des commentaires */}
        <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
          {comments.length === 0 ? (
            <p className="text-center text-[#64748B] py-10">Aucun commentaire pour l'instant.</p>
          ) : (
            comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))
          )}
        </div>

      </div>
    </MainLayout>
  );
}
