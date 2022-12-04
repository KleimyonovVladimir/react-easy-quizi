import { useEffect, useState } from 'react'
import { Button, Typography } from '@mui/material'

import { LoadingModal } from 'components/LoadingModal'

import '../../styles.scss'

const mainCssClass = 'ui-kits'

export const LoadingModalUI: React.FC = () => {
  const [isLoadingModalOpen, setLoadingModalOpen] = useState(false)

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoadingModalOpen(false), 2000)

    return () => {
      clearTimeout(timeout)
    }
  }, [isLoadingModalOpen])

  const handleLoadingModal = (): void => {
    setLoadingModalOpen(true)
  }

  return (
    <>
      <div className={`${mainCssClass}-group`}>
        <Typography variant="h5">Loading Modal</Typography>
        <div className={`${mainCssClass}-group__items`}>
          <Button size="small" variant="contained" onClick={handleLoadingModal}>
            Open loading modal
          </Button>
        </div>
      </div>
      {isLoadingModalOpen && <LoadingModal />}
    </>
  )
}
