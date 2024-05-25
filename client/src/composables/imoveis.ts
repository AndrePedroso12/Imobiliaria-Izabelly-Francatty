import { getEndpoints } from './endpoints'
import type { ImovelType, RawImovelData, ImageResponse } from '@/interfaces/interfaces'
import { useStorage } from './storage'

export const useImoveis = () => {
  const endpoints = getEndpoints()
  const storageComposable = useStorage()
  const token = storageComposable.get('token')

  // Função para criar um novo imóvel
  async function criarNovoImovel(imovelData: ImovelType) {
    const sendData = convertImovelTypeToRaw(imovelData)
    try {
      const response = await fetch(endpoints.IMOVEIS.CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(sendData)
      })
      const data = await response.json()
      let formatedResponse
      if (data.id) {
        formatedResponse = convertImages(data)
        return formatedResponse
      } else return data
    } catch (error) {
      console.error('Erro ao criar novo imóvel:', error)
      throw error
    }
  }

  // Função para carregar todos os imóveis para Home
  async function carregarImoveis() {
    try {
      const response = await fetch(endpoints.IMOVEIS.GET_ALL, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()

      const formatedResponse = convertMultipleImages(data)

      return formatedResponse
    } catch (error) {
      console.error('Erro ao carregar imóveis:', error)
      throw error
    }
  }

  // Função para carregar todos os imóveis
  async function carregarImoveisAdmin() {
    try {
      const response = await fetch(endpoints.IMOVEIS.GET_ALL_ADMIN, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()

      const formatedResponse = convertMultipleImages(data)

      return formatedResponse
    } catch (error) {
      console.error('Erro ao carregar imóveis:', error)
      throw error
    }
  }

  // Função para carregar um imóvel por ID
  async function carregarImovelPorId(id: number) {
    try {
      const response = await fetch(`${endpoints.IMOVEIS.GET}/${id}`)
      const data = await response.json()
      const formatedResponse = convertImages(data)

      return formatedResponse
    } catch (error) {
      console.error('Erro ao carregar imóvel por ID:', error)
      throw error
    }
  }

  // Função para carregar um imóvel por ID
  async function carregarImovelPorIdAdmin(id: number) {
    try {
      const response = await fetch(`${endpoints.IMOVEIS.GET_ADMIN}/${id}`)
      const data = await response.json()

      const formatedResponse = convertImages(data)

      return formatedResponse
    } catch (error) {
      console.error('Erro ao carregar imóvel por ID:', error)
      throw error
    }
  }

  // Função para deletar um imóvel por ID
  async function deletarImovelPorId(id: number) {
    try {
      const response = await fetch(`${endpoints.IMOVEIS.GET}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Erro ao deletar imóvel por ID:', error)
      throw error
    }
  }

  // Função para atualizar um imóvel
  async function atualizarImovel(imovelData: ImovelType) {
    const sendData = convertImovelTypeToRaw(imovelData)
    try {
      const response = await fetch(`${endpoints.IMOVEIS.CREATE}/${imovelData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },

        body: JSON.stringify(sendData)
      })
      const data = await response.json()
      let formatedResponse
      if (data.id) {
        formatedResponse = convertImages(data)
        return formatedResponse
      } else return data
    } catch (error) {
      console.error('Erro ao atualizar imóvel:', error)
      return false
    }
  }

  function convertImovelTypeToRaw(imovel: ImovelType): RawImovelData {
    return {
      banner: imovel.banner,
      isfavourite: imovel.isfavourite,
      isTop: imovel.isTop,
      tipo: imovel.category,
      pretensao: imovel.model,
      rua: imovel.location.street,
      bairro: imovel.location.neighborhood,
      numero: imovel.location.number,
      // mainImage: imovel.mainImage,
      // images: imovel.images,
      cidade: imovel.location.city,
      complemento: imovel.location.complemento,
      area_construida: imovel.details.area,
      area_terreno: imovel.details.area, // Supondo que a área do terreno seja a mesma da área construída
      qtd_quartos: imovel.details.rooms ? imovel.details.rooms : 0,
      qtd_Suites: imovel.details.suites ? imovel.details.suites : 0,
      qtd_banheiros: imovel.details.bathrooms ? imovel.details.bathrooms : 0,
      qtd_vagas_garagem: imovel.details.garage ? imovel.details.garage : 0,
      preco: imovel.price,
      monthly: imovel.monthly !== undefined ? imovel.monthly : null,
      descricao: imovel.description,
      caracteristics: imovel.details.tags, // Você pode mapear as características do ImovelType para cá
      tags: imovel.tags,
      vendedor: imovel.sellerName,
      contato_vendedor: '22222' // Você pode adicionar a informação de contato do vendedor aqui
    }
  }

  function convertImages(data: any) {
    const prefix = 'http://server.test'
    // Processamento das imagens
    const images = data.images.map((image: ImageResponse) => prefix + image.imagem)
    const mainImage = data.images.find((image: ImageResponse) => image.isMain)

    // Atualizando data com as imagens processadas
    data.images = images
    data.mainImage = mainImage ? prefix + mainImage.imagem : null
    data.video = data.video ? prefix + data.video : null

    return data
  }

  function convertMultipleImages(dataArray: any) {
    return dataArray.map((data: any) => convertImages(data))
  }

  return {
    criarNovoImovel,
    atualizarImovel,
    deletarImovelPorId,
    carregarImovelPorId,
    carregarImoveis,
    carregarImoveisAdmin,
    carregarImovelPorIdAdmin,
    convertImovelTypeToRaw
  }
}
