/**
 * Tipo para Intenção de Missa
 */
export interface IntencaoMissa {
  id: number
  paroquia_id: number
  nome_solicitante: string
  telefone: string
  email?: string
  intencao: string
  data_desejada: string
  observacoes?: string
  status: 'Pendente' | 'Aprovada' | 'Rejeitada'
  created_at: string
  updated_at: string
}
