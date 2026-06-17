import api from './api';
import { currentUser, suggestedUsers } from '@/mock/user';
import { mockPosts } from '@/mock/post';

export const userService = {
  async getMyProfile() {
    // const { data } = await api.get('/users/me');
    // return data;
    return currentUser;
  },

  async getProfile(userId) {
    // const { data } = await api.get(`/users/${userId}`);
    // return data;
    return suggestedUsers.find((u) => u.id === userId) || null;
  },

  async getUserPosts(userId) {
    // const { data } = await api.get(`/users/${userId}/posts`);
    // return data;
    return mockPosts.filter((p) => p.author.id === userId);
  },

  async followUser(userId) {
    // await api.post(`/users/${userId}/follow`);
  },

  async unfollowUser(userId) {
    // await api.delete(`/users/${userId}/follow`);
  },
};
