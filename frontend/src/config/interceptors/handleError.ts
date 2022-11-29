import { AxiosError } from 'axios'
import { userRepository } from 'config/userRepository'
import { AppNavigationRoutes } from 'constants/paths'
import { toastMessage } from 'utils/toastMessage'

export const handleError = (error: AxiosError): void => {
  if (error.response) {
    if (error.response.status === 401 && window.location.pathname !== AppNavigationRoutes.SignIn) {
      userRepository.removeUser()
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
