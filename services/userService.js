import api from './api';

export const userService = {
  async createProfile(authId, username, extra = {}) {
    const { data } = await api.post('/users/profile', { authId, username, ...extra });
    return data.profile;
  },


  async getProfile(authId) {
    const { data } = await api.get(`/users/profile/${authId}`);
    return data;
  },
  async getAllProfiles() {
    const { data } = await api.get('/users/profile');
    return data;
  },

  async updateStatus(authId, status) {
    const { data } = await api.put(`/users/profile/${authId}/status`, { status });
    return data.profile;
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

export function toAuthFields(profile) {
  return {
    username: profile.username,
    name: profile.username,
    avatar: profile.profilePicture === 'default-avatar.png' ? null : profile.profilePicture,
    bio: profile.bio,
    birthdate: profile.birthdate ? profile.birthdate.slice(0, 10) : null,
    followersCount: profile.followers?.length ?? 0,
    followingCount: profile.following?.length ?? 0,
  };
}

