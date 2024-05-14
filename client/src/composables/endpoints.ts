const getEndpoints = () => {
  const apiUrl = 'http://server.test'
  const localUrl = 'http://server.test'

  return {
    AUTH: {
      LOGIN: `${localUrl}/api/login`,
      LOGOUT: `${localUrl}/api/Account/Logout`,
      CREATE_USER: `${localUrl}/api/user`,
      GET_USER: `${localUrl}/api/user/4`,
      GET_USERS: `${localUrl}/api/user`
    },
    IMOVEIS: {
      CREATE: `${localUrl}/api/imovel`,
      GET: `${localUrl}/api/imovel`,
      GET_ALL: `${localUrl}/api/imovel`
    }
  }
}

export { getEndpoints }
