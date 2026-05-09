import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

// Request interceptor — attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('portfolio_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor — handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('portfolio_token')
      localStorage.removeItem('portfolio_admin')
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)

// Public API
export const publicApi = {
  getAbout: () => api.get('/about'),
  getProjects: (category) => api.get('/projects', { params: category ? { category } : {} }),
  getFeaturedProjects: () => api.get('/projects/featured'),
  getProject: (id) => api.get(`/projects/${id}`),
  getSkills: () => api.get('/skills'),
  getServices: () => api.get('/services'),
  getExperience: () => api.get('/experience'),
  getTestimonials: () => api.get('/testimonials'),
  submitContact: (data) => api.post('/contact', data),
}

// Auth API
export const authApi = {
  login: (data) => api.post('/auth/login', data),
}

// Admin API
export const adminApi = {
  getStats: () => api.get('/admin/stats'),
  // Projects
  getProjects: () => api.get('/admin/projects'),
  createProject: (data) => api.post('/admin/projects', data),
  updateProject: (id, data) => api.put(`/admin/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/admin/projects/${id}`),
  // Skills
  getSkills: () => api.get('/admin/skills'),
  createSkill: (data) => api.post('/admin/skills', data),
  updateSkill: (id, data) => api.put(`/admin/skills/${id}`, data),
  deleteSkill: (id) => api.delete(`/admin/skills/${id}`),
  // Services
  getServices: () => api.get('/admin/services'),
  createService: (data) => api.post('/admin/services', data),
  updateService: (id, data) => api.put(`/admin/services/${id}`, data),
  deleteService: (id) => api.delete(`/admin/services/${id}`),
  // Experience
  getExperience: () => api.get('/admin/experience'),
  createExperience: (data) => api.post('/admin/experience', data),
  updateExperience: (id, data) => api.put(`/admin/experience/${id}`, data),
  deleteExperience: (id) => api.delete(`/admin/experience/${id}`),
  // Testimonials
  getTestimonials: () => api.get('/admin/testimonials'),
  createTestimonial: (data) => api.post('/admin/testimonials', data),
  updateTestimonial: (id, data) => api.put(`/admin/testimonials/${id}`, data),
  deleteTestimonial: (id) => api.delete(`/admin/testimonials/${id}`),
  // Messages
  getMessages: () => api.get('/admin/messages'),
  markRead: (id) => api.patch(`/admin/messages/${id}/read`),
  deleteMessage: (id) => api.delete(`/admin/messages/${id}`),
  // About
  getAbout: () => api.get('/admin/about'),
  updateAbout: (data) => api.put('/admin/about', data),
  // Upload
  uploadImage: (file, folder = 'general') => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)
    return api.post('/admin/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
}

export default api
