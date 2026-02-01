/**
 * Interface para notícia
 */
export interface Noticia {
  id: number
  titulo: string
  resumo: string
  conteudo: string
  imagem?: string
  autor: string
  categoria: string
  tags?: string[]
  destaque: boolean
  data_publicacao: string
  paroquia_id?: string
  paroquia?: string
}

/**
 * Payload para criar/editar notícia
 */
export interface NoticiaInput {
  titulo: string
  resumo: string
  conteudo: string
  imagem?: string
  autor: string
  categoria: string
  tags?: string[]
  destaque: boolean
  data_publicacao: string
  paroquia_id?: string
}
