import { getEndpoints } from './endpoints'
import { useStorage } from './storage'

export const useImagens = () => {
  const endpoints = getEndpoints()
  const storageComposable = useStorage()
  const token = storageComposable.get('token')

  // Função para criar um novo imóvel
  async function salvarImagem(id: number, imagemFile: File): Promise<void> {
    const formData = new FormData()
    formData.append('imagem', imagemFile)
    formData.append('isMain', 'true')
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

  return {
    salvarImagem,
    carregarVideo
  }
}
