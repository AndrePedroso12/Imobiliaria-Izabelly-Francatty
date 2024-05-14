import { getEndpoints } from './endpoints'
import type { ImovelType } from '@/interfaces/interfaces'
import { useStorage } from './storage'

export const useImoveis = () => {
  const endpoints = getEndpoints()
  const storageComposable = useStorage()
  const token = storageComposable.get('token')

  // Função para criar um novo imóvel
  async function criarNovoImovel(imovelData: ImovelType) {
    try {
      const response = await fetch(endpoints.IMOVEIS.CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ imovel: imovelData })
      })
      const data = await response.json()
      console.log('Novo imóvel criado:', data)
    } catch (error) {
      console.error('Erro ao criar novo imóvel:', error)
    }
  }

  // Função para carregar todos os imóveis
  async function carregarImoveis() {
    try {
      const response = await fetch(endpoints.IMOVEIS.GET_ALL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Erro ao carregar imóveis:', error)
    }
  }

  // Função para carregar um imóvel por ID
  async function carregarImovelPorId(id: string) {
    try {
      const response = await fetch(`${endpoints.IMOVEIS.GET}/${id}`)
      const data = await response.json()
      console.log('Imóvel carregado:', data)
    } catch (error) {
      console.error('Erro ao carregar imóvel por ID:', error)
    }
  }

  // Função para deletar um imóvel por ID
  async function deletarImovelPorId(id: string) {
    try {
      const response = await fetch(`${endpoints.IMOVEIS.GET}/${id}`, {
        method: 'DELETE'
      })
      const data = await response.json()
      console.log('Imóvel deletado:', data)
    } catch (error) {
      console.error('Erro ao deletar imóvel por ID:', error)
    }
  }

  // Função para atualizar um imóvel
  async function atualizarImovel(imovelData: ImovelType) {
    try {
      const response = await fetch(endpoints.IMOVEIS.CREATE, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ imovel: imovelData })
      })
      const data = await response.json()
      console.log('Imóvel atualizado:', data)
    } catch (error) {
      console.error('Erro ao atualizar imóvel:', error)
    }
  }

  return {
    criarNovoImovel,
    atualizarImovel,
    deletarImovelPorId,
    carregarImovelPorId,
    carregarImoveis
  }
}
