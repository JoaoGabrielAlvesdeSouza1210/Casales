import apiClient from './api'
import type { Noticia } from '../types/noticia'

/**
 * Serviço para gerenciar notícias
 */
export const noticiaService = {
  /**
   * Lista todas as notícias
   */
  async getAll(): Promise<Noticia[]> {
    try {
        const { data } = await apiClient.get<Noticia[]>('/noticias')
        return data
    } catch (error) {
        console.error('Erro ao buscar notícias:', error)
        throw error
    }
  },

  /**
   * Busca uma notícia por ID
   */
  async getById(id: number): Promise<Noticia> {
    const response = await apiClient.get<Noticia>(`/noticias/${id}`)
    return response.data
  },

  /**
   * Cria uma nova notícia
   */
  async create(data: Partial<Noticia>): Promise<Noticia> {
    const response = await apiClient.post<Noticia>('/noticias', data)
    return response.data
  },

  /**
   * Atualiza uma notícia
   */
  async update(id: number, data: Partial<Noticia>): Promise<Noticia> {
    const response = await apiClient.put<Noticia>(`/noticias/${id}`, data)
    return response.data
  },

  /**
   * Deleta uma notícia
   */
  async delete(id: number): Promise<void> {
    await apiClient.delete(`/noticias/${id}`)
  }
}
