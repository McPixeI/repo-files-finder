import { API_BASE_PATH, TOKEN } from "./constants/api"

async function client(
    endpoint,
    {data, headers: customHeaders, ...customConfig} = {},
  ) {
    const config = {
      method: data ? 'POST' : 'GET',
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        Authorization: `token ${TOKEN}`,
        'Content-Type': data ? 'application/json' : undefined,
        accept: 'application/vnd.github.v3+json',
        ...customHeaders,
      },
      ...customConfig,
    }
  
    return window.fetch(`${API_BASE_PATH}/${endpoint}`, config).then(async response => {
      if (response.status === 401) {
        return Promise.reject({message: 'Authentication error'})
      }
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
  }
  
  export {client}