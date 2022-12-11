import { useState } from 'react'
import { handleSelect } from 'utils/select'

import { IUseSelect } from './types'

export const useSelect = (initialSelected: []): IUseSelect => {
  const [selected, setSelected] = useState<string[]>(initialSelected)

  const handleSelectClick = (name: string | undefined): void => {
    handleSelect(name, selected, setSelected)
  }

  const isSelected = (name: string | undefined): boolean => selected.includes(name ?? '')

  return { selected, handleSelectClick, isSelected, setSelected }
}
