import { ref } from 'vue'
import type { Ref } from 'vue'

/**
 * Composable para gerenciar estado de formulários
 * @param submitFn - Função de envio do formulário
 * @returns Objeto com estado e funções de controle
 */
export const useForm = <T>(submitFn: (data: T) => Promise<void>) => {
  const loading: Ref<boolean> = ref(false)
  const error: Ref<string | null> = ref(null)
  const success: Ref<boolean> = ref(false)

  /**
   * Envia o formulário
   * @param data - Dados do formulário
   */
  const handleSubmit = async (data: T): Promise<void> => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      await submitFn(data)
      success.value = true
    } catch (err) {
      error.value = 'Erro ao enviar formulário. Tente novamente.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Reseta o estado do formulário
   */
  const reset = (): void => {
    loading.value = false
    error.value = null
    success.value = false
  }

  return {
    loading,
    error,
    success,
    handleSubmit,
    reset
  }
}
