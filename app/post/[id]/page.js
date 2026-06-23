'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import CommentCard from '@/components/post/CommentCard';
import { useAuth } from '@/context/AuthContext';
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

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

export default function PostDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState('');

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

  async function handlePublishReply() {
    if (!reply.trim()) return;
    try {
      const newComment = await postService.createComment(id, user.id, reply.trim());
      setComments([...comments, newComment]);
      setReply('');
    } catch {

    }
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="px-4 py-6">
          <p className="text-[#64748B]">Chargement...</p>
        </div>
      </MainLayout>
    );
  }

  if (!post) {
    return (
      <MainLayout>
        <div className="px-4 py-6">
          <p className="text-[#64748B]">Post introuvable.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="px-4 py-6">

        <Link href="/home" className="flex items-center gap-2 text-sm text-[#64748B] hover:text-[#0F172A] mb-6 transition-colors">
          <ArrowLeft size={18} />
          Retour
        </Link>

        <div className="border border-[#E2E8F0] rounded-xl p-5 mb-6">
          <div className="flex gap-3">
            <Avatar name={post.author.name} avatar={post.author.avatar} />
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
            <span className="font-semibold text-[#0F172A]">{comments.length}</span> commentaires ·{' '}
            <span className="font-semibold text-[#0F172A]">{post.likesCount}</span> likes
          </p>
        </div>

        <div className="border border-[#E2E8F0] rounded-xl p-4 mb-6 flex gap-3">
          <Avatar name={user.name} avatar={user.avatar} />
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

        <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
          {comments.length === 0 ? (
            <p className="text-center text-[#64748B] py-10">Aucun commentaire pour l&apos;instant.</p>
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
