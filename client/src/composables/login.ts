import { useStorage } from './storage'
import { useRouter } from 'vue-router'
import { getEndpoints } from './endpoints'

export const useAuth = () => {
  const endpoints = getEndpoints()

  const storageComposable = useStorage()
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
        setToken(data.token)
        return true
      } else {
        console.error('Login error:', data.error)
        return false
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

  async function updateUser(
    id: string,
    name: string,
    email: string,
    password: string,
    token: string
  ): Promise<boolean> {
    try {
      const response = await fetch(`${endpoints.AUTH.LOGIN}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, name, email, password })
      })
      const data = await response.json()
      if (response.ok) {
        setToken(data.token)
        return true
      } else {
        console.error('Update user error:', data.error)
        return false
      }
    } catch (error) {
      console.error('Update user error:', error)
      throw error
    }
  }

  function logout() {
    deleteToken()
    clearAuthInfo()
    router.push({ name: 'home' })
  }

  function clearAuthInfo() {
    storageComposable.remove('token')
    storageComposable.remove('user-info')
    storageComposable.remove('client-access')
  }

  function setToken(token: string) {
    storageComposable.set('token', token)
  }

  function deleteToken() {
    storageComposable.remove('token')
  }

  return {
    login,
    logout,
    getUsers,
    getUserById,
    deleteUserById,
    updateUser
  }
}
