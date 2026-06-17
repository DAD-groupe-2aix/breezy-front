'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';

function Avatar({ name }) {
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

export default function CommentCard({ comment }) {
  const [liked, setLiked] = useState(comment.liked);
  const [likesCount, setLikesCount] = useState(comment.likesCount);

  function handleLike() {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  }

  return (
    <div className="border-b border-[#E2E8F0] px-4 py-3 flex gap-3">
      <Avatar name={comment.author.name} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <Link href={`/profile/${comment.author.id}`} className="font-semibold text-sm text-[#0F172A] hover:underline">
            {comment.author.name}
          </Link>
          <span className="text-sm text-[#64748B]">@{comment.author.username}</span>
          <span className="text-sm text-[#64748B]">· {formatDate(comment.createdAt)}</span>
        </div>
        <p className="mt-1 text-sm text-[#0F172A] leading-relaxed">{comment.content}</p>
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
