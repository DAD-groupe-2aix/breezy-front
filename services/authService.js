import api from './api';

export const authService = {
  async login(email, password) {
    // TODO: décommenter quand le backend est prêt et supprimer le mock
    // const { data } = await api.post('/auth/login', { email, password });
    // return data; // attend { token, user }

    return {
      token: 'mock-jwt-token',
      user: { id: '1', name: 'Rayene Med', username: 'rayene', bio: 'Mangaka' },
    };
  },

  async register(email, password) {
    // const { data } = await api.post('/auth/register', { email, password });
    // return data;

    return {
      token: 'mock-jwt-token',
      user: { id: '1', name: 'Rayene Med', username: 'rayene', bio: 'Mangaka' },
    };
  },
};
