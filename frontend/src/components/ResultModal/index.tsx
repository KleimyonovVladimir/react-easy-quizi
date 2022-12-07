import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Dialog, DialogTitle, Typography } from '@mui/material'
import { AppNavigationRoutes } from 'constants/paths'
import { parseToPercent } from 'utils/parseToPercent'

import { IProps } from './type'

import './styles.scss'

const mainCssClass = 'result-modal'

export const ResultModal: FC<IProps> = ({ result }) => {
  const navigate = useNavigate()

  const handleButtonClick = (): void => {
    navigate(AppNavigationRoutes.Quizzes)
  }

  return (
    <Dialog open>
      <DialogTitle className={`${mainCssClass}-title`}>Your results</DialogTitle>
      <Typography variant="body2" className={`${mainCssClass}-text`}>
        {parseToPercent(result?.score ?? '')}
      </Typography>
      <Button
        variant="outlined"
        onClick={handleButtonClick}
        className={`${mainCssClass}-submit-button`}
      >
        Back to all quizzes
      </Button>
    </Dialog>
  )
}
