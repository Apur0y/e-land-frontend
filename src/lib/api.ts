import axios from 'axios';
import Cookies from 'js-cookie';


const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
  withCredentials:true
});

// Request interceptor - attach token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = Cookies.get('landiq_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handle 401
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401 && typeof window !== 'undefined') {
//       localStorage.removeItem('landiq_token');
//       localStorage.removeItem('landiq_user');
//       if (!window.location.pathname.includes('/login')) {
//         window.location.href = '/login';
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// Auth
export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  me: () => api.get('/auth/me'),
  updateProfile: (data: any) => api.put('/auth/profile', data),
  changePassword: (data: any) => api.put('/auth/change-password', data),
  saveProperty: (landId: string) => api.post(`/auth/save-property/${landId}`),
};

// Land
export const landAPI = {
  list: (params?: any) => api.get('/land', { params }),
  featured: () => api.get('/land/featured'),
  stats: () => api.get('/land/stats'),
  get: (slug: string) => api.get(`/land/${slug}`),
  create: (data: any) => api.post('/land', data),
  update: (id: string, data: any) => api.put(`/land/${id}`, data),
  delete: (id: string) => api.delete(`/land/${id}`),
  myListings: () => api.get('/land/user/my-listings'),
};

// AI
export const aiAPI = {
  analyzeLand: (data: any) => api.post('/ai/analyze-land', data),
  pricePrediction: (data: any) => api.post('/ai/price-prediction', data),
  riskAnalysis: (data: any) => api.post('/ai/risk-analysis', data),
  rentalYield: (data: any) => api.post('/ai/rental-yield', data),
  compareProperties: (data: any) => api.post('/ai/compare-properties', data),
  constructionROI: (data: any) => api.post('/ai/construction-roi', data),
  myReports: () => api.get('/ai/my-reports'),
  credits: () => api.get('/ai/credits'),
};

// Reports
export const reportAPI = {
  myReports: () => api.get('/reports/my'),
  get: (id: string) => api.get(`/reports/${id}`),
  delete: (id: string) => api.delete(`/reports/${id}`),
};

// Inquiries
export const inquiryAPI = {
  submit: (data: any) => api.post('/inquiries', data),
  myInquiries: () => api.get('/inquiries/my'),
};

// Admin
export const adminAPI = {
  dashboard: () => api.get('/admin/dashboard'),
  users: (params?: any) => api.get('/admin/users', { params }),
  updateUser: (id: string, data: any) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id: string) => api.delete(`/admin/users/${id}`),
  listings: (params?: any) => api.get('/admin/listings', { params }),
  updateListing: (id: string, data: any) => api.put(`/admin/listings/${id}`, data),
  deleteListing: (id: string) => api.delete(`/admin/listings/${id}`),
  inquiries: (params?: any) => api.get('/admin/inquiries', { params }),
  updateInquiry: (id: string, data: any) => api.put(`/admin/inquiries/${id}`, data),
  reports: (params?: any) => api.get('/admin/reports', { params }),
};

export default api;
