import { Id, toast, ToastContainerProps } from 'react-toastify'

import { SimpleToast } from 'components/SimpleToast'

import 'react-toastify/dist/ReactToastify.css'

export const toastProps: Partial<ToastContainerProps> = {
  autoClose: 3000,
  position: 'top-right',
  closeButton: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  pauseOnFocusLoss: false,
  newestOnTop: true,
  limit: 3
}

type Position =
  | 'top-right'
  | 'top-center'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left'
  | undefined

export const toastMessage = (
  message: string,
  type: 'success' | 'warning' | 'error' = 'success',
  position: Position = 'top-right'
): Id => {
  toast.clearWaitingQueue()

  return toast(SimpleToast(message, type), {
    ...toastProps,
    type,
    position
  })
}
