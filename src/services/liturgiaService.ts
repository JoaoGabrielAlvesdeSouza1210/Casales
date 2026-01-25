import type { LiturgiaDiaria } from '@/types'
import dayjs from 'dayjs'
import { getLiturgiaDiaria } from './mockData'

/**
 * Serviço para buscar liturgia diária
 * @param data - Data no formato YYYY-MM-DD (opcional, padrão é hoje)
 * @returns Promise com dados da liturgia mockados
 */
export const buscarLiturgiaDiaria = async (data?: string): Promise<LiturgiaDiaria> => {
  const dataFormatada = data || dayjs().format('YYYY-MM-DD')
  // Simula delay de API
  await new Promise(resolve => setTimeout(resolve, 500))
  return getLiturgiaDiaria(dataFormatada)
}
