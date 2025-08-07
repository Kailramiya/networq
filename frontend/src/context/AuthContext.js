import { createContext, useContext, useState, useEffect } from 'react';

import { api} from '../services/api';
import {create} from 'zustand';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useAuth = create((set)=>({
  
  authUser:null,
  isSigningUp :false ,
  isLoggingIn :false,
  isCheckingAuth: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await api.get("/auth/check");
      set({ authUser: res.data, isCheckingAuth: false });
      
    } catch (error) {
     
      set({ authUser: null, isCheckingAuth: false });
    }
  },

 createPost : async (content) => {
    try {
      
      const newPost = await api.post('/posts/createpost', { content });
      
      toast.success('Post created successfully');
      
      return newPost;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create post');
    }
  },

loginUser: async (credentials) => {
  try {
    const { data } = await api.post('/auth/login', credentials);
    
    if (data.token) {
      localStorage.setItem('token', data.token);
    }

    set({ authUser: data.user });
    console.log("login", data);
    return data;
  } catch (error) {
    throw error;
  }
},


registerUser : async (userData) => {
  try {
    const { data } = await api.post('/auth/register', userData);
    toast.success('Registration successful');
    return data;
  } catch (error) {
     toast.error('Registration failed:', error);
  }
},

getCurrentUser : async () => {
  try {
    const { data } = await api.get('/auth/me');
    return data;
  } catch (error) {
    throw error;
  }
},



getPosts : async () => {
  try {
    const { data } = await api.get('/posts');
    return data;
  } catch (error) {
    throw error;
  }
},

getUserPosts : async (userId) => {
  
  try {
    const { data } = await api.get(`/profile/${userId}/posts`);
    return data;
  } catch (error) {
    throw error;
  }
},

getUserProfile : async (userId) => {
  
  try {
    const { data } = await api.get(`/profile/${userId}`);
    return data;
  } catch (error) {
    throw error;
  }
},



 

  logout : async () => {
    try {
      set({ authUser: null });
      // Clear cookies by making a request to backend logout endpoint
      localStorage.removeItem('token');


    } catch (error) {
      console.error('Logout failed:', error);
    }
  },

   
}))