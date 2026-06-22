import api from './api';

export const userService = {
  async createProfile(authId, username) {
    const { data } = await api.post('/users/profile', { authId, username });
    return data.profile;
  },

  async getProfile(authId) {
    const { data } = await api.get(`/users/profile/${authId}`);
    return data;
  },

  async updateProfile(authId, updates) {
    const { data } = await api.put(`/users/profile/${authId}`, updates);
    return data.profile;
  },

  async followUser(targetId, authId) {
    await api.post(`/users/profile/${targetId}/follow`, { authId });
  },

  async unfollowUser(targetId, authId) {
    await api.post(`/users/profile/${targetId}/unfollow`, { authId });
  },
};
