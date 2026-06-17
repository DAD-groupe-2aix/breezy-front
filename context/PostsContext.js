'use client';

import { createContext, useContext, useState } from 'react';
import { mockPosts } from '@/mock/post';

const PostsContext = createContext(null);

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState(mockPosts);

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
