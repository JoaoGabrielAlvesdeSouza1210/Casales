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
 * Interceptor para tratamento de erros
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na requisição:', error)
    return Promise.reject(error)
  }
)

export default api
