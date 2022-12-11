import { useState } from 'react'

import { IUseConfirm } from './types'

export const useConfirm = (initialConfirmModal: boolean): IUseConfirm => {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(initialConfirmModal)

  const handleConfirmDialog = (): void => {
    setConfirmModalOpen(prev => !prev)
  }

  return { isConfirmModalOpen, handleConfirmDialog }
}
