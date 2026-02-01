import apiClient from './api'
import type { Pastoral } from '@/types/paroquia'

/**
 * Serviço para gerenciar pastorais
 */
export const pastoralService = {
  /**
   * Lista todas as pastorais
   */
  async getAll(): Promise<Pastoral[]> {
    const response = await apiClient.get<Pastoral[]>('/pastorais')
    return response.data
  },

  /**
   * Busca uma pastoral por ID
   */
  async getById(id: number): Promise<Pastoral> {
    const response = await apiClient.get<Pastoral>(`/pastorais/${id}`)
    return response.data
  },

  /**
   * Cria uma nova pastoral
   */
  async create(data: Partial<Pastoral>): Promise<Pastoral> {
    const response = await apiClient.post<Pastoral>('/pastorais', data)
    return response.data
  },

  /**
   * Atualiza uma pastoral
   */
  async update(id: number, data: Partial<Pastoral>): Promise<Pastoral> {
    const response = await apiClient.put<Pastoral>(`/pastorais/${id}`, data)
    return response.data
  },

  /**
   * Deleta uma pastoral
   */
  async delete(id: number): Promise<void> {
    await apiClient.delete(`/pastorais/${id}`)
  }
}
