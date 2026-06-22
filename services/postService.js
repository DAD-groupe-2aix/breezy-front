import api from './api';

function transformPost(p, currentUserId) {
  return {
    id: p._id,
    author: { id: String(p.authId), name: `User ${p.authId}`, username: `user_${p.authId}`, avatar: null },
    content: p.content,
    likesCount: p.likes?.length ?? 0,
    commentsCount: p.comments?.length ?? 0,
    liked: p.likes?.includes(currentUserId) ?? false,
    following: false,
    createdAt: p.createdAt,
  };
}

export const postService = {
  async getFeed(currentUserId) {
    const { data } = await api.get('/posts/');
    return data.map((p) => transformPost(p, currentUserId));
  },

  async createPost(authId, content) {
    const { data } = await api.post('/posts/', { authId, content });
    return transformPost(data.post, authId);
  },

  async likePost(postId, authId) {
    await api.post(`/posts/${postId}/like`, { authId });
  },

  async getPost(postId) {
    const { data } = await api.get('/posts/');
    return data.find((p) => p._id === postId) || null;
  },

  async getComments(postId) {
    const { data } = await api.get('/posts/');
    const post = data.find((p) => p._id === postId);
    return post?.comments ?? [];
  },

  async createComment(postId, authId, text) {
    const { data } = await api.post(`/posts/${postId}/comment`, { authId, text });
    return data;
  },
};
