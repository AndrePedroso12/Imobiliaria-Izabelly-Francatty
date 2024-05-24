import { useStorage } from './storage'
import { useRouter } from 'vue-router'
import { getEndpoints } from './endpoints'

export const useAuth = () => {
  const endpoints = getEndpoints()
  const storageComposable = useStorage()
  const token = storageComposable.get('token')
  const router = useRouter()

  async function login(login: string, password: string): Promise<boolean> {
    try {
      const response = await fetch(endpoints.AUTH.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login, password })
      })
      const data = await response.json()
      if (response.ok) {
        console.info('Login sucedido')
        setToken(data.token, data.id)
        return true
      } else {
        console.error('Login error:', data.error)
        throw data.error
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  async function getUsers(token: string): Promise<any> {
    try {
      const response = await fetch(endpoints.AUTH.GET_USERS, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Erro ao obter usuários:', error)
      throw error
    }
  }

  async function getUserById(id: string, token: string): Promise<any> {
    try {
      const response = await fetch(`${endpoints.AUTH.GET_USERS}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()

      return data
    } catch (error) {
      console.error('Erro ao obter usuário por ID:', error)
      throw error
    }
  }

  async function deleteUserById(id: string, token: string): Promise<any> {
    try {
      const response = await fetch(`${endpoints.AUTH.GET_USERS}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Erro ao deletar usuário por ID:', error)
      throw error
    }
  }

  async function updateUser(id: string, name: string, email: string): Promise<any> {
    try {
      const response = await fetch(`${endpoints.AUTH.UPDATE_USER}/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
      })
      const data = await response.json()
      if (data) return data
    } catch (error) {
      console.error('Update user error:', error)
      throw error
    }
  }

  async function updatePassword(id: string, password: string, newPassword: string): Promise<any> {
    try {
      const response = await fetch(`${endpoints.AUTH.UPDATE_PASSWORD}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, newPassword })
      })
      const data = await response.json()
      if (data) return data
    } catch (error) {
      console.error('Update user error:', error)
      throw error
    }
  }

  async function getFrases() {
    try {
      const response = await fetch('https://frases.docapi.dev/frase/obter', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Erro resgatar frase', error)
    }
  }

  function logout() {
    deleteToken()
    clearAuthInfo()
    router.push({ name: 'login' })
  }

  function clearAuthInfo() {
    storageComposable.remove('token')
    storageComposable.remove('user-info')
    storageComposable.remove('client-access')
  }

  function setToken(token: string, id: number) {
    storageComposable.set('token', token)
    storageComposable.set('userId', id)
  }

  function deleteToken() {
    storageComposable.remove('token')
  }

  function checkLogin() {
    const data = storageComposable.get('token')
    return data
  }

  function loggedUserId() {
    const data = storageComposable.get('userId')
    return data
  }

  return {
    login,
    logout,
    getUsers,
    getUserById,
    deleteUserById,
    updateUser,
    checkLogin,
    getFrases,
    loggedUserId,
    updatePassword
  }
}
