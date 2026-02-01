export interface Leitura {
  referencia: string
  titulo: string
  texto: string
}

/**
 * Interface para salmo responsorial
 */
export interface SalmoResponsorial {
  referencia: string
  refrao: string
  texto: string
}

/**
 * Interface para liturgia diária
 */
export interface LiturgiaDiaria {
  data: string
  cor: string
  titulo: string
  primeiraLeitura: Leitura
  salmo: SalmoResponsorial
  segundaLeitura?: Leitura
  evangelho: Leitura
  ofertorios?: string[]
  comunhao?: string[]
}
