// types.ts

// Define the type for location
interface Location {
  city: string
  neighborhood: string
  street: string
  number: string
  complemento?: string
}

// Define the updated object type
export interface ImovelType {
  id: number
  banner?: boolean
  isfavourite?: boolean
  isTop?: boolean
  category: 'Apartamento' | 'Casa' | 'Terreno' | 'Area' | 'Condomínio' | 'Galpão' | 'Sala Comercial'
  model: 'Compra' | 'Alugar' | 'Compra e Aluga'
  mainImage: string
  images: string[]
  video?: string
  location: Location
  price: number
  rent?: number
  monthly?: number
  details: {
    rooms?: number
    bathrooms?: number
    garage?: number
    suites?: number
    area: number
    area_construida?: number
    tags: string[]
  }
  description: string
  tags: string[]
  sellerName: string
  comments?: string
}

export interface RawImovelData {
  isBanner?: boolean
  isFavorite?: boolean
  isTop?: boolean
  tipo: 'Apartamento' | 'Casa' | 'Terreno' | 'Area' | 'Condomínio' | 'Galpão' | 'Sala Comercial'
  pretensao: 'Compra' | 'Alugar' | 'Compra e Aluga'
  rua: string
  bairro: string
  numero: string
  // mainImage: string
  // images: string[]
  cidade: string
  complemento?: string
  area_construida: number
  area_terreno: number
  qtd_quartos: number
  qtd_Suites: number
  qtd_banheiros: number
  qtd_vagas_garagem: number
  preco: number
  rent?: number | null
  monthly?: number | null
  descricao: string
  caracteristics: string[]
  tags: string[]
  vendedor: string
  contato_vendedor: string
  comentarios?: string
}

export interface EmpreendimentoType {
  id: number
  name: string
  city: string
  logo: any
  mainImage: any
}

export interface NuvemDeTags {
  nome: string
  link: string
  empreendimento?: string
}
export interface User {
  id: number
  admin?: boolean
  name: string
  email: string
}

export type SnapAlign = 'start' | 'end' | 'center' | 'center-even' | 'center-odd'

export interface ImageResponse {
  imagem: string
  isMain: boolean
}
export interface Quote {
  id: number
  quote: string
  author: string
}
