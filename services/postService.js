import api from './api';
import { mockPosts, mockComments } from '@/mock/post';

export const postService = {
  async getFeed() {
    // const { data } = await api.get('/posts/feed');
    // return data;
    return mockPosts;
  },

  async createPost(content) {
    // const { data } = await api.post('/posts', { content });
    // return data;
    return {
      id: String(Date.now()),
      author: { id: '1', name: 'Rayene Med', username: 'rayene', avatar: null },
      content,
      likesCount: 0,
      commentsCount: 0,
      liked: false,
      following: false,
      createdAt: new Date().toISOString(),
    };
  },

  async likePost(postId) {
    // await api.post(`/posts/${postId}/like`);
  },

  async unlikePost(postId) {
    // await api.delete(`/posts/${postId}/like`);
  },

  async getPost(postId) {
    // const { data } = await api.get(`/posts/${postId}`);
    // return data;
    return mockPosts.find((p) => p.id === postId) || null;
  },

  async getComments(postId) {
    // const { data } = await api.get(`/posts/${postId}/comments`);
    // return data;
    return mockComments.filter((c) => c.postId === postId);
  },

  async createComment(postId, content) {
    // const { data } = await api.post(`/posts/${postId}/comments`, { content });
    // return data;
    return {
      id: `c${Date.now()}`,
      postId,
      author: { id: '1', name: 'Rayene Med', username: 'rayene', avatar: null },
      content,
      likesCount: 0,
      liked: false,
      createdAt: new Date().toISOString(),
    };
  },
};
