// types.ts

// Define the type for location
interface Location {
  city: string
  neighborhood: string
  logo?: string // Making logo property optional
}

// Define the updated object type
export interface ImovelType {
  id: number
  banner?: boolean
  isfavourite?: boolean
  isTop?: boolean
  category: 'Apartamento' | 'Casa' | 'Terreno' | 'Area' | 'Condomínio' | 'Galpão'
  model: 'Compra' | 'Alugar'
  mainImage: string
  images: string[]
  video: string
  location: Location
  price: number
  monthly?: number
  details: {
    rooms?: number
    bathrooms?: number
    garage?: number
    suites?: number
    area: number
    tags: string[]
  }
  description: string
  tags: string[]
  sellerName: string
}
