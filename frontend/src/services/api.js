import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://networq-bi3h.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  },
   
  withCredentials: true // This is important for cookies
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);