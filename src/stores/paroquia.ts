import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Paroquia, Noticia } from '@/types'
import { buscarParoquia, buscarNoticias } from '@/services/paroquiaService'

/**
 * Store principal da paróquia
 */
export const useParoquiaStore = defineStore('paroquia', () => {
  // Estado
  const paroquia = ref<Paroquia | null>(null)
  const noticias = ref<Noticia[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  // Getters computados
  const horariosMissaDomingo = computed(() => {
    return paroquia.value?.horariosMissa.filter(h => h.diaSemana === 'Domingo') || []
  })

  const horariosMissaSemana = computed(() => {
    const diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    return paroquia.value?.horariosMissa.filter(h => diasSemana.includes(h.diaSemana)) || []
  })

  const pastoraisAtivas = computed(() => {
    return paroquia.value?.pastorais.filter(p => p.ativa) || []
  })

  const noticiasDestaque = computed(() => {
    return noticias.value.filter(n => n.destaque).slice(0, 3)
  })

  // Actions
  /**
   * Carrega os dados da paróquia
   * @param id - ID da paróquia
   */
  const carregarParoquia = async (id: string): Promise<void> => {
    loading.value = true
    error.value = null
    try {
      paroquia.value = await buscarParoquia(id)
    } catch (err) {
      error.value = 'Erro ao carregar dados da paróquia'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Carrega as notícias da paróquia
   * @param paroquiaId - ID da paróquia
   */
  const carregarNoticias = async (paroquiaId: string): Promise<void> => {
    loading.value = true
    error.value = null
    try {
      noticias.value = await buscarNoticias(paroquiaId)
    } catch (err) {
      error.value = 'Erro ao carregar notícias'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Limpa os dados da store
   */
  const limpar = (): void => {
    paroquia.value = null
    noticias.value = []
    error.value = null
  }

  return {
    // Estado
    paroquia,
    noticias,
    loading,
    error,
    // Getters
    horariosMissaDomingo,
    horariosMissaSemana,
    pastoraisAtivas,
    noticiasDestaque,
    // Actions
    carregarParoquia,
    carregarNoticias,
    limpar
  }
})
