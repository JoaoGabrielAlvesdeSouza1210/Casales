import axios from 'axios'

const liturgiaApi = axios.create({
  baseURL: 'https://liturgia.up.railway.app/v2',
  timeout: 10000
})

export interface LeituraLiturgia {
  referencia: string
  titulo: string
  texto: string
}

export interface SalmoLiturgia {
  referencia: string
  refrao: string
  texto: string
}

export interface Liturgia {
  data: string
  liturgia: string
  cor: string
  oracoes: {
    coleta: string
    oferendas: string
    comunhao: string
  }
  leituras: {
    primeiraLeitura: LeituraLiturgia[]
    salmo: SalmoLiturgia[]
    segundaLeitura?: LeituraLiturgia[]
    evangelho: LeituraLiturgia[]
  }
  antifonas: {
    entrada: string
    comunhao: string
  }
}

/**
 * Serviço para buscar liturgia diária
 */
export const liturgiaService = {
  /**
   * Busca liturgia do dia atual
   */
  async buscarLiturgiaHoje(): Promise<Liturgia> {
    const response = await liturgiaApi.get<Liturgia>('/')
    return response.data
  },

  /**
   * Busca liturgia de uma data específica
   * @param dia - Dia (1-31)
   * @param mes - Mês (1-12)
   * @param ano - Ano (opcional, padrão ano atual)
   */
  async buscarLiturgiaPorData(dia: number | undefined, mes: number | undefined, ano?: number | undefined): Promise<Liturgia> {
    const hoje = new Date()
    if (!dia) {
      dia = hoje.getDate()
    }
    if (!mes) {
      mes = hoje.getMonth() + 1
    }
    if (!ano) {
      ano = hoje.getFullYear()
    }
    const params: any = { dia, mes }
    if (ano) {
      params.ano = ano
    }
    const response = await liturgiaApi.get<Liturgia>('/', { params })
    return response.data
  },

  /**
   * Busca liturgia de um período (máximo 7 dias)
   * @param periodo - Número de dias (1-7)
   */
  async buscarPeriodo(periodo: number = 7): Promise<Liturgia[]> {
    if (periodo > 7) periodo = 7
    const response = await liturgiaApi.get<Liturgia[]>('/', { params: { periodo } })
    return response.data
  }
}

