import api from './api';
import { userService } from './userService';

const profileCache = new Map();

async function getAuthorProfile(authId) {
  if (profileCache.has(authId)) return profileCache.get(authId);
  const profile = await userService.getProfile(authId).catch(() => null);
  profileCache.set(authId, profile);
  return profile;
}

async function transformPost(p, currentUserId) {
  const [profile, myProfile] = await Promise.all([
    getAuthorProfile(p.authId),
    getAuthorProfile(currentUserId),
  ]);
  return {
    id: p._id,
    author: {
      id: p.authId,
      name: profile?.username ?? `Utilisateur ${p.authId}`,
      username: profile?.username ?? `user_${p.authId}`,
      avatar: profile?.profilePicture && profile.profilePicture !== 'default-avatar.png' ? profile.profilePicture : null,
    },
    content: p.content,
    likesCount: p.likes?.length ?? 0,
    commentsCount: p.comments?.length ?? 0,
    liked: p.likes?.includes(currentUserId) ?? false,
    following: myProfile?.following?.includes(p.authId) ?? false,
    createdAt: p.createdAt,
  };
}

async function transformComment(c, postId, currentUserId) {
  const profile = await getAuthorProfile(c.authId);
  return {
    id: c._id,
    postId,
    author: {
      id: c.authId,
      name: profile?.username ?? `Utilisateur ${c.authId}`,
      username: profile?.username ?? `user_${c.authId}`,
      avatar: profile?.profilePicture && profile.profilePicture !== 'default-avatar.png' ? profile.profilePicture : null,
    },
    content: c.text,
    likesCount: c.likes?.length ?? 0,
    liked: c.likes?.includes(currentUserId) ?? false,
    createdAt: c.createdAt,
  };
}



export const postService = {
  async getFeed(currentUserId) {
    const { data } = await api.get('/posts/');
    return Promise.all(data.map((p) => transformPost(p, currentUserId)));
  },

  async getUserPosts(authId, currentUserId) {
    const { data } = await api.get(`/posts/user/${authId}`);
    return Promise.all(data.map((p) => transformPost(p, currentUserId)));
  },

  async createPost(authId, content) {
    const { data } = await api.post('/posts/', { authId, content });
    return transformPost(data.post, authId);
  },

  async likePost(postId, authId) {
    await api.post(`/posts/${postId}/like`, { authId });
  },

  async getPost(postId, currentUserId) {
    const { data } = await api.get('/posts/');
    const post = data.find((p) => p._id === postId);
    if (!post) return null;
    return transformPost(post, currentUserId);
  },

  async getComments(postId, currentUserId) {
    const { data } = await api.get('/posts/');
    const post = data.find((p) => p._id === postId);
    if (!post) return [];
    return Promise.all((post.comments ?? []).map((c) => transformComment(c, postId, currentUserId)));
  },

  async createComment(postId, authId, text) {
    const { data } = await api.post(`/posts/${postId}/comment`, { authId, text });
    const comments = data.post.comments;
    const newComment = comments[comments.length - 1];
    return transformComment(newComment, postId, authId);
  },

  async likeComment(postId, commentId, authId) {
    await api.post(`/posts/${postId}/comments/${commentId}/like`, { authId });
  },

  async deletePost(postId) {
    await api.delete(`/posts/${postId}`);
  },
};
