import { defineStore } from 'pinia'
import { ref } from 'vue'
import { liturgiaService } from '@/services/liturgiaService'
import type { Liturgia } from '@/services/liturgiaService'
import dayjs from 'dayjs'

/**
 * Store para liturgia diária
 */
export const useLiturgiaStore = defineStore('liturgia', () => {
  // Estado
  const liturgia = ref<Liturgia | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const dataAtual = ref<string>(dayjs().format('YYYY-MM-DD'))

  // Actions
  /**
   * Carrega a liturgia do dia
   * @param data - Data no formato YYYY-MM-DD (opcional)
   */
  const carregarLiturgia = async (data?: string): Promise<void> => {
    loading.value = true
    error.value = null
    try {
      const dataConsulta = data || dataAtual.value
      const [ano, mes, dia] = dataConsulta.split('-').map(Number)
      liturgia.value = await liturgiaService.buscarLiturgiaPorData(dia, mes, ano)
      dataAtual.value = dataConsulta
    } catch (err) {
      error.value = 'Erro ao carregar liturgia diária'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Navega para o dia anterior
   */
  const diaAnterior = async (): Promise<void> => {
    const novaData = dayjs(dataAtual.value).subtract(1, 'day').format('YYYY-MM-DD')
    await carregarLiturgia(novaData)
  }

  /**
   * Navega para o próximo dia
   */
  const proximoDia = async (): Promise<void> => {
    const novaData = dayjs(dataAtual.value).add(1, 'day').format('YYYY-MM-DD')
    await carregarLiturgia(novaData)
  }

  /**
   * Volta para hoje
   */
  const voltarHoje = async (): Promise<void> => {
    const hoje = dayjs().format('YYYY-MM-DD')
    await carregarLiturgia(hoje)
  }

  return {
    // Estado
    liturgia,
    loading,
    error,
    dataAtual,
    // Actions
    carregarLiturgia,
    diaAnterior,
    proximoDia,
    voltarHoje
  }
})
