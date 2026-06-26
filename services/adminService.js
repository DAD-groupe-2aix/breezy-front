import api from './api';

export const adminService = {
  async listUsers() {
    const { data } = await api.get('/auth/admin/users');
    return data;
  },

  async updateRole(id, role) {
    const { data } = await api.put(`/auth/admin/users/${id}/role`, { role });
    return data.user;
  },

  async createUser(email, password, role) {
    const { data } = await api.post('/auth/admin/users', { email, password, role });
    return data;
  },
};
