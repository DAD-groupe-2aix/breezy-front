'use client';
import Link from 'next/link';
import { useState } from 'react';
import { MessageCircle, Heart, UserPlus, UserCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { usePosts } from '@/context/PostsContext';
import { userService } from '@/services/userService';
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

export default function PostCard({ post }) {
  const { user, updateUser } = useAuth();
  const { updatePost } = usePosts();
  const [liked, setLiked] = useState(post.liked);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [following, setFollowing] = useState(post.following);
  const [popping, setPopping] = useState(false);
  const [followPopping, setFollowPopping] = useState(false);

  async function handleLike() {
    const wasLiked = liked;
    const prevCount = likesCount;
    const nextLiked = !wasLiked;
    const nextCount = wasLiked ? prevCount - 1 : prevCount + 1;
    setLiked(nextLiked);
    setLikesCount(nextCount);
    setPopping(true);
    try {
      await postService.likePost(post.id, user.id);
      updatePost(post.id, { liked: nextLiked, likesCount: nextCount });
    } catch {
      setLiked(wasLiked);
      setLikesCount(prevCount);
    }
  }

  async function handleFollow() {
    const next = !following;
    setFollowing(next);
    setFollowPopping(true);
    try {
      if (next) {
        await userService.followUser(post.author.id, user.id);
      } else {
        await userService.unfollowUser(post.author.id, user.id);
      }
      updatePost(post.id, { following: next });
      updateUser({ followingCount: (user.followingCount ?? 0) + (next ? 1 : -1) });
    } catch {
      setFollowing(!next);
    }
  }

  return (
    <article className="border-b border-[#E2E8F0] px-4 py-4 hover:bg-[#F8FAFC] transition-colors">
      <div className="flex gap-3">
        <Avatar name={post.author.name} avatar={post.author.avatar} />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Link href={`/profile/${post.author.id}`} className="font-semibold text-sm text-[#0F172A] hover:underline">
                {post.author.name}
              </Link>
              <span className="text-sm text-[#64748B]">@{post.author.username}</span>

              <span className="text-sm text-[#64748B]">· {formatDate(post.createdAt)}</span>
            </div>

            {post.author.id !== user.id && (
              <button
                onClick={handleFollow}
                className={`flex items-center gap-1 text-xs text-[#64748B] hover:text-[#3B82F6] transition-colors shrink-0 ${followPopping ? 'animate-follow-pop' : ''}`}
                onAnimationEnd={() => setFollowPopping(false)}
              >
                {following ? <UserCheck size={16} /> : <UserPlus size={16} />}
              </button>
            )}
          </div>

          <p className="mt-1 text-sm text-[#0F172A] leading-relaxed">{post.content}</p>

          <div className="flex items-center gap-6 mt-3">
            <Link href={`/post/${post.id}`} className="flex items-center gap-1.5 text-[#64748B] hover:text-[#3B82F6] transition-colors">
              <MessageCircle size={18} />
              <span className="text-xs">{post.commentsCount}</span>
            </Link>

            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 transition-colors ${liked ? 'text-[#EF4444]' : 'text-[#64748B] hover:text-[#EF4444]'}`}
            >
              <Heart
                size={18}
                fill={liked ? '#EF4444' : 'none'}
                className={popping ? 'animate-heart-pop' : ''}
                onAnimationEnd={() => setPopping(false)}
              />
              <span className="text-xs">{likesCount}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
