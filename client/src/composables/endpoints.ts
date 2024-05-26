const getEndpoints = () => {
  const apiUrl = 'http://server.test'
  const localUrl = 'http://server.test'

  return {
    AUTH: {
      LOGIN: `${localUrl}/api/login`,
      LOGOUT: `${localUrl}/api/Account/Logout`,
      CREATE_USER: `${localUrl}/api/user`,
      UPDATE_USER: `${localUrl}/api/user`,
      UPDATE_PASSWORD: `${localUrl}/api/user/changePassword`,
      GET_USER: `${localUrl}/api/user/4`,
      GET_USERS: `${localUrl}/api/user`
    },
    IMOVEIS: {
      CREATE: `${localUrl}/api/imovel`,
      GET: `${localUrl}/api/imovel`,
      GET_ADMIN: `${localUrl}/api/imovel/admin`,
      GET_ALL: `${localUrl}/api/imovel/home`,
      GET_ALL_ADMIN: `${localUrl}/api/imovel/admin`,
      GET_VIDEO: `${localUrl}/api/imovel/getVideo`
    },
    IMAGENS: {
      CREATE: `${localUrl}/api/imagem/imovel`,
      GET: `${localUrl}/api/imagem/imovel`,
      DELETE: `${localUrl}/api/imagem`,
      VIDEO: `${localUrl}/api/imovel/addVideo`
    }
  }
}

export { getEndpoints }
