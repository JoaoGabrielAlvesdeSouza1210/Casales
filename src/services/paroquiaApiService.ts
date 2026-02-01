import apiClient from './api'
import type { Paroquia } from '@/types/paroquia'

/**
 * Serviço para gerenciar paróquias
 */
export const paroquiaService = {
  /**
   * Lista todas as paróquias
   */
  async getAll(): Promise<Paroquia[]> {
    const response = await apiClient.get<Paroquia[]>('/paroquias')
    return response.data
  },

  /**
   * Busca uma paróquia por ID
   */
  async getById(id: number): Promise<Paroquia> {
    const response = await apiClient.get<Paroquia>(`/paroquias/${id}`)
    return response.data
  },

  /**
   * Cria uma nova paróquia
   */
  async create(data: Partial<Paroquia>): Promise<Paroquia> {
    const response = await apiClient.post<Paroquia>('/paroquias', data)
    return response.data
  },

  /**
   * Atualiza uma paróquia
   */
  async update(id: number, data: Partial<Paroquia>): Promise<Paroquia> {
    const response = await apiClient.put<Paroquia>(`/paroquias/${id}`, data)
    return response.data
  },

  /**
   * Deleta uma paróquia
   */
  async delete(id: number): Promise<void> {
    await apiClient.delete(`/paroquias/${id}`)
  }
}
