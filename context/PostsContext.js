'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { postService } from '@/services/postService';
import { useAuth } from './AuthContext';

const PostsContext = createContext(null);

export function PostsProvider({ children }) {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!user) return;
    postService.getFeed(user.id).then(setPosts).catch(() => setPosts([]));
  }, [user]);

  function addPost(newPost) {
    setPosts((prev) => [newPost, ...prev]);
  }

  function updatePost(postId, changes) {
    setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, ...changes } : p)));
  }

  function removePost(postId) {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  }

  return (
    <PostsContext.Provider value={{ posts, addPost, updatePost, removePost }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) throw new Error('usePosts doit être utilisé dans PostsProvider');
  return context;
}
