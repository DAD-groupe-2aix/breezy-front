'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import api from '@/services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Le cookie HttpOnly n'est pas lisible en JS : on interroge le serveur
    // pour savoir si la session est toujours valide au chargement de la page.
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      // On restaure d'abord le profil depuis localStorage pour un affichage immédiat,
      // puis on vérifie auprès du serveur que le cookie est encore valide.
      setUser(JSON.parse(storedUser));
    }
    api.get('/auth/validate')
      .then((res) => {
        // Cookie valide : on s'assure que le profil stocké est cohérent avec le token
        if (!storedUser) {
          // Pas de profil local mais cookie valide → on stocke les infos minimales
          const { id, email, role } = res.data.user;
          const minimalUser = { id, email, name: email.split('@')[0], role };
          setUser(minimalUser);
          localStorage.setItem('user', JSON.stringify(minimalUser));
        }
      })
      .catch(() => {
        // Cookie absent ou expiré → on efface le profil local résiduel
        setUser(null);
        localStorage.removeItem('user');
      })
      .finally(() => setLoading(false));
  }, []);

  function login(userData) {
    // Le cookie est déjà posé par le serveur dans la réponse HTTP.
    // On stocke uniquement le profil (pas le token) pour l'affichage UI.
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('user');
    // Le cookie sera effacé par le serveur lors de l'appel POST /auth/logout
    // (voir authService.logout)
  }

  function updateUser(updatedData) {
    setUser((prevUser) => {
      const newUser = { ...prevUser, ...updatedData };
      localStorage.setItem('user', JSON.stringify(newUser));
      return newUser;
    });
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth doit être utilisé dans AuthProvider');
  return context;
}
