import { AxiosError } from 'axios'
import { toastMessage } from 'utils/toastMessage'

export const handleError = (error: AxiosError): void => {
  if (error.response) {
    if (error.response.status === 401) {
      localStorage.removeItem('authUser')
      window.location.href = 'login'
    }

    const errorMessage = error.response.data as string

    toastMessage(errorMessage, 'error')

    throw error
  } else {
    toastMessage('Unknown error', 'error')
    throw error
  }
}
