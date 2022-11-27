import axios, { AxiosInstance } from 'axios'

import { handleError } from './interceptors/handleError'

const init = (): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true
  })

  axiosInstance.interceptors.response.use(undefined, handleError)

  return axiosInstance
}

export const client = init()
