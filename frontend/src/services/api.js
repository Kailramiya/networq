import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://networq-bi3h.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include token in every request dynamically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // <-- fetch token fresh each time
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Error logging for responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
