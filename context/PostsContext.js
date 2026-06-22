'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { postService } from '@/services/postService';

const PostsContext = createContext(null);

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postService.getFeed().then(setPosts).catch(() => setPosts([]));
  }, []);

  function addPost(newPost) {
    setPosts((prev) => [newPost, ...prev]);
  }

  return (
    <PostsContext.Provider value={{ posts, addPost }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) throw new Error('usePosts doit être utilisé dans PostsProvider');
  return context;
}
