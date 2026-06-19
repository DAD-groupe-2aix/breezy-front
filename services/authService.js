import api from './api';

export const authService = {
  async login(email, password) {
    const { data } = await api.post('/auth/login', { email, password });
    return {
      token: data.token,
      user: { id: data.userId, email: data.email, name: data.email.split('@')[0] },
    };
  },

  async register(email, password) {
    const { data } = await api.post('/auth/register', { email, password });
    return {
      token: data.token,
      user: { id: data.userId, email: data.email, name: data.email.split('@')[0] },
    };
  },
};
