const getEndpoints = () => {
  const apiUrl = 'https://server.imobiliariafrancatti.com.br/public'
  const localUrl = 'http://server.test'

  return {
    AUTH: {
      LOGIN: `${apiUrl}/api/login`,
      LOGOUT: `${apiUrl}/api/Account/Logout`,
      CREATE_USER: `${apiUrl}/api/user`,
      UPDATE_USER: `${apiUrl}/api/user`,
      UPDATE_PASSWORD: `${apiUrl}/api/user/changePassword`,
      GET_USER: `${apiUrl}/api/user/4`,
      GET_USERS: `${apiUrl}/api/user`
    },
    IMOVEIS: {
      CREATE: `${apiUrl}/api/imovel`,
      GET: `${apiUrl}/api/imovel`,
      GET_ADMIN: `${apiUrl}/api/imovel/admin`,
      GET_ALL: `${apiUrl}/api/imovel/home`,
      GET_ALL_ADMIN: `${apiUrl}/api/imovel/admin`,
      GET_VIDEO: `${apiUrl}/api/imovel/getVideo`
    },
    EMPREENDIMENTOS: {
      CREATE: `${apiUrl}/api/empreendimento`,
      GET: `${apiUrl}/api/empreendimento`,
      GET_ALL: `${apiUrl}/api/empreendimento`
    },
    IMAGENS: {
      CREATE: `${apiUrl}/api/imagem/imovel`,
      GET: `${apiUrl}/api/imagem/imovel`,
      DELETE: `${apiUrl}/api/imagem`,
      VIDEO: `${apiUrl}/api/imovel/addVideo`,
      VIEW: `${apiUrl}`
    }
  }
}

export { getEndpoints }
