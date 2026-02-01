import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, LoginCredentials } from '@/types/auth'
import { authService } from '@/services/authService'

/**
 * Store de autenticação
 * Gerencia estado do usuário autenticado e token JWT
 */
export const useAuthStore = defineStore('auth', () => {
  // Estado
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)

  /**
   * Faz login do usuário
   */
  async function login(credentials: LoginCredentials): Promise<void> {
    try {
      const response = await authService.login(credentials)
      user.value = response.user
      token.value = response.token
      
      // Salva token no localStorage para persistência
      localStorage.setItem('auth_token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      throw error
    }
  }

  /**
   * Faz logout do usuário
   */
  function logout(): void {
    user.value = null
    token.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
  }

  /**
   * Restaura sessão do localStorage
   */
  function restoreSession(): void {
    const savedToken = localStorage.getItem('auth_token')
    const savedUser = localStorage.getItem('user')

    if (savedToken && savedUser) {
      token.value = savedToken
      try {
        user.value = JSON.parse(savedUser)
      } catch (error) {
        console.error('Erro ao restaurar usuário:', error)
        logout()
      }
    }
  }

  /**
   * Verifica se o token é válido
   */
  function checkAuth(): boolean {
    return isAuthenticated.value
  }

  return {
    // Estado
    user,
    token,
    // Getters
    isAuthenticated,
    // Actions
    login,
    logout,
    restoreSession,
    checkAuth
  }
})
