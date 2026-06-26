import api from './api';

export const authService = {
  async login(email, password) {
    const { data } = await api.post('/auth/login', { email, password });
    // Le serveur pose les cookies HttpOnly — il ne renvoie plus les tokens dans le body.
    return {
      user: { id: data.userId, email: data.email, name: data.email.split('@')[0], role: data.role },
    };
  },

  async register(email, password) {
    const { data } = await api.post('/auth/register', { email, password });
    return {
      user: { id: data.userId, email: data.email, name: data.email.split('@')[0], role: data.role },
    };
  },

  async logout() {
    // Demande au serveur d'effacer les cookies HttpOnly (Set-Cookie: maxAge=0).
    await api.post('/auth/logout');
  },
};
