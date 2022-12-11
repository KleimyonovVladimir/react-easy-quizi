export interface IUseConfirm {
  isConfirmModalOpen: boolean
  handleConfirmDialog: () => void
}

export interface IUseSelect {
  selected: string[]
  handleSelectClick: (name: string | undefined) => void
  isSelected: (name: string | undefined) => boolean
  setSelected: (item: string[]) => void
}
