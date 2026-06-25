import api from './api';

export const notifService = {
  async getNotifications(userId) {
    const { data } = await api.get(`/users/notifications/${userId}`);
    return data;
  },

  async markAllRead(userId) {
    await api.put(`/users/notifications/${userId}/read-all`);
  },
};
