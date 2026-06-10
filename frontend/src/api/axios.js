import axios from 'axios';
import { Capacitor } from '@capacitor/core';

// Backend URL (sadece image fallback için)
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://temiz-iz.vercel.app';

// Capacitor (Android APK) ortamında Vercel proxy yok → doğrudan backend'e git
// Web ortamında Vercel proxy üzerinden gider → CORS sorunu olmaz
const isNative = Capacitor.isNativePlatform();
const API_BASE_URL = isNative
  ? 'https://temiz-iz.vercel.app/v1'
  : (import.meta.env.VITE_API_URL || '/api/v1');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
