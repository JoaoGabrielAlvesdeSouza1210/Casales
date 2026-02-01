import axios from 'axios'

/**
 * Cria instância do axios com configurações base
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

/**
 * Interceptor para adicionar token de autenticação
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * Interceptor para tratamento de erros
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na requisição:', error)
    
    // Se receber 401 (não autorizado), limpar sessão
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    
    return Promise.reject(error)
  }
)

export default api
