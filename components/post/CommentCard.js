'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { postService } from '@/services/postService';
import ImageGrid from './ImageGrid';


function Avatar({ name, avatar }) {
  if (avatar) {
    return <img src={avatar} alt={name} className="w-9 h-9 rounded-full object-cover shrink-0" />;
  }
  return (
    <div className="w-9 h-9 rounded-full bg-[#E2E8F0] flex items-center justify-center text-sm font-bold text-[#64748B] shrink-0">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

export default function CommentCard({ comment, postId }) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(comment.liked);

  const [likesCount, setLikesCount] = useState(comment.likesCount);

  async function handleLike() {
    const wasLiked = liked;
    const prevCount = likesCount;
    setLiked(!wasLiked);
    setLikesCount(wasLiked ? prevCount - 1 : prevCount + 1);
    try {
      await postService.likeComment(postId, comment.id, user.id);
    } catch {
      setLiked(wasLiked);
      setLikesCount(prevCount);
    }
  }

  return (
    <div className="border-b border-[#E2E8F0] px-4 py-3 flex gap-3">
      <Avatar name={comment.author.name} avatar={comment.author.avatar} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <Link href={comment.author.id === user.id ? '/profile' : `/profile/${comment.author.id}`} className="font-semibold text-sm text-[#0F172A] hover:underline">
            {comment.author.name}
          </Link>
          <span className="text-sm text-[#64748B]">@{comment.author.username}</span>
          <span className="text-sm text-[#64748B]">· {formatDate(comment.createdAt)}</span>
        </div>
        <p className="mt-1 text-sm text-[#0F172A] leading-relaxed break-words">{comment.content}</p>
        <ImageGrid images={comment.images} />
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 mt-2 transition-colors ${liked ? 'text-[#EF4444]' : 'text-[#64748B] hover:text-[#EF4444]'}`}
        >
          <Heart size={16} fill={liked ? '#EF4444' : 'none'} />
          <span className="text-xs">{likesCount}</span>
        </button>
      </div>
    </div>
  );
}
