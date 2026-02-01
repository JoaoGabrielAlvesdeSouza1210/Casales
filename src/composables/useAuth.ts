import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { LoginCredentials } from '@/types/auth'

/**
 * Composable para autenticação
 * Encapsula lógica de autenticação reutilizável
 */
export function useAuth() {
  const authStore = useAuthStore()
  const router = useRouter()

  const user = computed(() => authStore.user)
  const isAuthenticated = computed(() => authStore.isAuthenticated)

  /**
   * Realiza login
   */
  async function login(credentials: LoginCredentials): Promise<void> {
    await authStore.login(credentials)
    await router.push({ name: 'admin-dashboard' })
  }

  /**
   * Realiza logout
   */
  async function logout(): Promise<void> {
    authStore.logout()
    await router.push({ name: 'login' })
  }

  /**
   * Verifica autenticação
   */
  function checkAuth(): boolean {
    return authStore.checkAuth()
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
    checkAuth
  }
}
