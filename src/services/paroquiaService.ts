import type {
  Paroquia,
  IntencaoMissa,
  AgendamentoConfissao,
  PedidoVisita,
  SolicitacaoVisita,
  InscricaoPastoral,
  Noticia
} from '@/types'
import { mockParoquia, mockNoticias } from './mockData'

/**
 * Serviço para buscar dados da paróquia
 * @returns Promise com dados da paróquia mockados
 */
export const buscarParoquia = async (id: string): Promise<Paroquia> => {
  // Simula delay de API
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockParoquia
}

/**
 * Serviço para enviar intenção de missa
 * @param intencao - Dados da intenção
 * @returns Promise com resposta simulada
 */
export const enviarIntencaoMissa = async (intencao: IntencaoMissa): Promise<void> => {
  // Simula delay de API
  await new Promise(resolve => setTimeout(resolve, 800))
  console.log('Intenção de missa enviada:', intencao)
}

/**
 * Serviço para agendar confissão
 * @param agendamento - Dados do agendamento
 * @returns Promise com resposta simulada
 */
export const agendarConfissao = async (agendamento: AgendamentoConfissao): Promise<void> => {
  // Simula delay de API
  await new Promise(resolve => setTimeout(resolve, 800))
  console.log('Confissão agendada:', agendamento)
}

/**
 * Serviço para solicitar visita de padre
 * @param pedido - Dados da solicitação
 * @returns Promise com resposta simulada
 */
export const solicitarVisita = async (pedido: SolicitacaoVisita | PedidoVisita): Promise<void> => {
  // Simula delay de API
  await new Promise(resolve => setTimeout(resolve, 800))
  console.log('Visita solicitada:', pedido)
}

/**
 * Serviço para inscrição em pastoral
 * @param inscricao - Dados da inscrição
 * @returns Promise com resposta simulada
 */
export const inscreverPastoral = async (inscricao: InscricaoPastoral): Promise<void> => {
  // Simula delay de API
  await new Promise(resolve => setTimeout(resolve, 800))
  console.log('Inscrição em pastoral realizada:', inscricao)
}

/**
 * Serviço para buscar notícias
 * @param paroquiaId - ID da paróquia
 * @returns Promise com lista de notícias mockadas
 */
export const buscarNoticias = async (paroquiaId: string): Promise<Noticia[]> => {
  // Simula delay de API
  await new Promise(resolve => setTimeout(resolve, 600))
  return mockNoticias
}

/**
 * Serviço para buscar notícia específica
 * @param id - ID da notícia
 * @returns Promise com a notícia mockada
 */
export const buscarNoticia = async (id: number): Promise<Noticia> => {
  // Simula delay de API
  await new Promise(resolve => setTimeout(resolve, 500))
  const noticia = mockNoticias.find(n => n.id === id)
  if (!noticia) {
    throw new Error('Notícia não encontrada')
  }
  return noticia
}
