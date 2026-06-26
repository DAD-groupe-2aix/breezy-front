import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  withCredentials: true, // envoie les cookies HttpOnly automatiquement sur chaque requête
});

export default api;
