import apiClient from './api'
import type { IntencaoMissa } from '@/types/intencaoMissa'

/**
 * Serviço para gerenciar intenções de missa
 */
export const intencaoMissaService = {
  /**
   * Lista todas as intenções (admin)
   */
  async getAll(): Promise<IntencaoMissa[]> {
    const response = await apiClient.get<IntencaoMissa[]>('/admin/intencoes-missa')
    return response.data
  },

  /**
   * Atualiza o status de uma intenção
   */
  async updateStatus(id: number, status: 'Aprovada' | 'Rejeitada'): Promise<IntencaoMissa> {
    const response = await apiClient.put<IntencaoMissa>(
      `/admin/intencoes-missa/${id}`,
      { status }
    )
    return response.data
  },

  /**
   * Cria uma nova intenção (público)
   */
  async create(data: Partial<IntencaoMissa>): Promise<IntencaoMissa> {
    const response = await apiClient.post<IntencaoMissa>('/intencoes-missa', data)
    return response.data
  }
}
