import { getEndpoints } from './endpoints'
import type { EmpreendimentoType } from '@/interfaces/interfaces'
import { useStorage } from './storage'

export const useEmpreendimentos = () => {
  const endpoints = getEndpoints()
  const storageComposable = useStorage()
  const token = storageComposable.get('token')

  // Função para criar um novo imóvel
  async function criarNovoEmpreendimentos(EmpreendimentoData: EmpreendimentoType) {
    const sendData = new FormData()
    sendData.append('name', EmpreendimentoData.name)
    sendData.append('city', EmpreendimentoData.city)
    sendData.append('logo', EmpreendimentoData.logo)
    sendData.append('mainImage', EmpreendimentoData.mainImage)
    try {
      const response = await fetch(endpoints.EMPREENDIMENTOS.CREATE, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: sendData
      })
      const data = await response.json()
      let formatedResponse
      if (data.id) {
        formatedResponse = convertImages(data)
        return formatedResponse
      } else return data
    } catch (error) {
      console.error('Erro ao criar novo Empreendimentos:', error)
      throw error
    }
  }

  // Função para carregar todos os imóveis para Home
  async function carregarEmpreendimentos() {
    try {
      const response = await fetch(endpoints.EMPREENDIMENTOS.GET_ALL, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()

      const formatedResponse = convertMultipleImages(data)

      return formatedResponse
    } catch (error) {
      console.error('Erro ao carregar Empreendimentos:', error)
      throw error
    }
  }

  // Função para carregar um imóvel por ID
  async function carregarEmpreendimentoPorId(id: number) {
    try {
      const response = await fetch(`${endpoints.EMPREENDIMENTOS.GET}/${id}`)
      const data = await response.json()
      const formatedResponse = convertImages(data)

      return formatedResponse
    } catch (error) {
      console.error('Erro ao carregar empreendimento por ID:', error)
      throw error
    }
  }

  // Função para deletar um imóvel por ID
  async function deletarEmpreendimentoPorId(id: number) {
    try {
      const response = await fetch(`${endpoints.EMPREENDIMENTOS.GET}/${id}`, {
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
  async function atualizarEmpreendimento(EmpreendimentoData: EmpreendimentoType) {
    const sendData = new FormData()
    sendData.append('name', EmpreendimentoData.name)
    sendData.append('city', EmpreendimentoData.city)
    sendData.append('logo', EmpreendimentoData.logo)
    sendData.append('mainImage', EmpreendimentoData.mainImage)

    try {
      const response = await fetch(`${endpoints.EMPREENDIMENTOS.CREATE}/${EmpreendimentoData.id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },

        body: sendData,
        redirect: 'follow'
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

  function convertImages(data: any) {
    const prefix = endpoints.IMAGENS.VIEW
    // Processamento das imagens
    const logo = data.logo
    const mainImage = data.mainImage

    // Atualizando data com as imagens processadas
    data.logo = logo ? prefix + logo : null
    data.mainImage = mainImage ? prefix + mainImage : null

    return data
  }

  function convertMultipleImages(dataArray: any) {
    return dataArray.map((data: any) => convertImages(data))
  }

  return {
    criarNovoEmpreendimentos,
    atualizarEmpreendimento,
    deletarEmpreendimentoPorId,
    carregarEmpreendimentoPorId,
    carregarEmpreendimentos
  }
}
