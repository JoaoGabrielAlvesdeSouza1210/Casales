/**
 * Interface para localização da paróquia
 */
export interface Localizacao {
  latitude: number
  longitude: number
  endereco: string
  cidade: string
  estado: string
  cep: string
  complemento?: string
}

/**
 * Interface para redes sociais
 */
export interface RedesSociais {
  facebook?: string
  instagram?: string
  youtube?: string
  twitter?: string
  whatsapp?: string
  email?: string
  telefone?: string
  horarioSecretaria?: string
}

/**
 * Interface para horários de missas
 */
export interface HorarioMissa {
  id: number
  diaSemana: string
  horario: string
  tipo: 'Normal' | 'Solene' | 'Especial'
  observacao?: string
}

/**
 * Interface para eventos recorrentes
 */
export interface EventoRecorrente {
  id: number
  titulo: string
  descricao: string
  diaSemana?: string
  frequencia: 'Diário' | 'Semanal' | 'Mensal' | 'Anual'
  horario: string
  local?: string
  icone?: string
}

/**
 * Interface para pastoral
 */
export interface Pastoral {
  paroquia_id: string
  id: number
  nome: string
  descricao: string
  coordenador?: string
  contato?: string
  imagem?: string
  icone?: string
  horarioReuniao?: string
  localReuniao?: string
  objetivos?: string
  atividades?: string[]
  ativa: boolean
}

/**
 * Interface para intenção de missa
 */
export interface IntencaoMissa {
  nome: string
  email: string
  telefone?: string
  intencao: string
  dataDesejada?: string
  oferenda?: number
}

/**
 * Interface para agendamento de confissão
 */
export interface AgendamentoConfissao {
  nome: string
  email: string
  telefone: string
  dataDesejada: string
  horario: string
  observacoes?: string
}

/**
 * Interface para pedido de visita
 */
export interface PedidoVisita {
  nome: string
  email: string
  telefone: string
  endereco: string
  motivo: string
  dataDesejada?: string
  observacoes?: string
  urgencia: 'Normal' | 'Urgente'
}

/**
 * Interface para solicitação de visita
 */
export interface SolicitacaoVisita {
  nome: string
  email: string
  telefone: string
  endereco: string
  tipoVisita: string
  nomePessoa: string
  observacoes?: string
  urgente: boolean
}

/**
 * Interface para inscrição em pastoral
 */
export interface InscricaoPastoral {
  nome: string
  email: string
  telefone: string
  pastoralId: string
  mensagem?: string
}

/**
 * Interface principal da paróquia
 */
export interface Paroquia {
  id: number
  nome: string
  descricao: string
  historia?: string
  padroeiro: string
  dioceseId?: string
  diocese?: string
  // Campos de contato
  telefone?: string
  email?: string
  // Campos de endereço (além do objeto localizacao)
  endereco?: string
  bairro?: string
  cidade?: string
  estado?: string
  cep?: string
  // Coordenadas
  latitude?: number
  longitude?: number
  // Redes sociais
  site?: string
  facebook?: string
  instagram?: string
  youtube?: string
  // Objetos relacionados
  localizacao: Localizacao
  redesSociais: RedesSociais
  horariosMissa: HorarioMissa[]
  eventosRecorrentes: EventoRecorrente[]
  pastorais: Pastoral[]
  imagemPrincipal?: string
  galeria?: string[]
  ativa: boolean
}
