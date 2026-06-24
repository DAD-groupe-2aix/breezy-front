'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Heart, UserPlus, UserCheck, MoreHorizontal, Trash2, Pencil } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { usePosts } from '@/context/PostsContext';
import { useLang } from '@/context/LanguageContext';
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

function formatEditDate(isoString) {
  const d = new Date(isoString);
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

export default function PostCard({ post }) {
  const { user, updateUser } = useAuth();
  const { updatePost, removePost } = usePosts();
  const { t } = useLang();
  const [liked, setLiked] = useState(post.liked);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [following, setFollowing] = useState(post.following);
  const [popping, setPopping] = useState(false);
  const [followPopping, setFollowPopping] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [editedAt, setEditedAt] = useState(post.editedAt);
  const [content, setContent] = useState(post.content);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  function handleStartEdit() {
    setMenuOpen(false);
    setEditContent(content);
    setIsEditing(true);
  }

  async function handleSaveEdit() {
    if (!editContent.trim() || editContent.trim() === content) {
      setIsEditing(false);
      return;
    }
    try {
      const updated = await postService.editPost(post.id, editContent.trim());
      const newEditedAt = updated.editedAt;
      setContent(updated.content);
      setEditedAt(newEditedAt);
      updatePost(post.id, { content: updated.content, editedAt: newEditedAt });
      setIsEditing(false);
    } catch {
      setIsEditing(false);
    }
  }

  async function handleDelete() {
    setMenuOpen(false);
    try {
      await postService.deletePost(post.id);
      removePost(post.id);
    } catch {
    }
  }

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
              <Link href={post.author.id === user.id ? '/profile' : `/profile/${post.author.id}`} className="font-semibold text-sm text-[#0F172A] hover:underline">
                {post.author.name}
              </Link>
              <span className="text-sm text-[#64748B]">@{post.author.username}</span>
              <span className="text-sm text-[#64748B]">· {formatDate(post.createdAt)}</span>
            </div>

            {post.author.id !== user.id ? (
              <button
                onClick={handleFollow}
                className={`flex items-center gap-1 text-xs text-[#64748B] hover:text-[#3B82F6] transition-colors shrink-0 ${followPopping ? 'animate-follow-pop' : ''}`}
                onAnimationEnd={() => setFollowPopping(false)}
              >
                {following ? <UserCheck size={16} /> : <UserPlus size={16} />}
              </button>
            ) : (
              <div className="relative shrink-0" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((o) => !o)}
                  className="text-[#64748B] hover:text-[#0F172A] p-1 rounded transition-colors"
                >
                  <MoreHorizontal size={18} />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 top-7 bg-white border border-[#E2E8F0] rounded-xl shadow-lg py-1 z-10 min-w-[140px]">
                    <button
                      onClick={handleStartEdit}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"
                    >
                      <Pencil size={15} />
                      {t.editPost}
                    </button>
                    <button
                      onClick={handleDelete}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-[#EF4444] hover:bg-[#FEF2F2] transition-colors"
                    >
                      <Trash2 size={15} />
                      {t.deletePost}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="mt-2">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                maxLength={280}
                rows={3}
                className="w-full resize-none text-sm text-[#0F172A] border border-[#3B82F6] rounded-lg px-3 py-2 outline-none"
              />
              <div className="flex gap-2 mt-1 justify-end">
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-xs text-[#64748B] hover:text-[#0F172A] transition-colors px-3 py-1"
                >
                  {t.cancelEdit}
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={!editContent.trim()}
                  className="text-xs bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-40 text-white px-3 py-1 rounded-full transition-colors"
                >
                  {t.save}
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="mt-1 text-sm text-[#0F172A] leading-relaxed break-words">{content}</p>
              {editedAt && (
                <p className="text-xs text-[#94A3B8] mt-0.5">{t.editedOn} {formatEditDate(editedAt)}</p>
              )}
            </>
          )}

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
