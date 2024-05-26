import { getEndpoints } from './endpoints'
import { useStorage } from './storage'

export const useImagens = () => {
  const endpoints = getEndpoints()
  const storageComposable = useStorage()
  const token = storageComposable.get('token')

  // Função para criar um novo imóvel
  async function salvarImagem(id: number, imagemFile: File, isMain: boolean = true): Promise<void> {
    const formData = new FormData()
    formData.append('imagem', imagemFile)
    formData.append('isMain', isMain.toString())
    try {
      const response = await fetch(`${endpoints.IMAGENS.CREATE}/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
        redirect: 'follow'
      })

      if (response.status !== 200) {
        throw new Error('Erro ao salvar Imagem: Status ' + response.status)
      }
    } catch (error) {
      console.error('Erro ao salvar Imagem:', error)
      throw error
    }
  }

  // Função para carregar todos os imóveis para Home
  async function carregarVideo(id: number, videoFile: File): Promise<void> {
    const formData = new FormData()
    formData.append('video', videoFile)
    try {
      const response = await fetch(`${endpoints.IMAGENS.VIDEO}/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
        redirect: 'follow'
      })
      if (response.status !== 200) {
        throw new Error('Erro ao salvar Imagem: Status ' + response.status)
      }
    } catch (error) {
      console.error('Erro ao salvar video:', error)
      throw error
    }
  }

  async function salvarMultiplasImagens(id: number, imagensFiles: File[]): Promise<void> {
    const promises = imagensFiles.map((imagemFile) => salvarImagem(id, imagemFile, false))

    try {
      await Promise.all(promises)
      console.log('Todas as imagens foram salvas com sucesso.')
    } catch (error) {
      console.error('Erro ao salvar uma ou mais imagens:', error)
      throw error
    }
  }

  // Função para deletar um imóvel por ID
  async function deletarImagem(id: number) {
    try {
      const response = await fetch(`${endpoints.IMAGENS.DELETE}/${id}`, {
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

  return {
    salvarImagem,
    carregarVideo,
    salvarMultiplasImagens,
    deletarImagem
  }
}
