import apiClient from './api'
import type { LoginCredentials, LoginResponse } from '@/types/auth'

/**
 * Serviço de autenticação
 * Gerencia requisições de login/logout
 */
export const authService = {
  /**
   * Realiza login do usuário
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/login', credentials)
    return response.data
  },

  /**
   * Realiza logout do usuário
   */
  async logout(): Promise<void> {
    await apiClient.post('/logout')
  },

  /**
   * Busca dados do usuário autenticado
   */
  async me(): Promise<{ user: any }> {
    const response = await apiClient.get('/me')
    return response.data
  }
}
