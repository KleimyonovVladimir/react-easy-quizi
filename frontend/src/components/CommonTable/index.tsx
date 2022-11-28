import { FC } from 'react'
import { Table, TableContainer } from '@mui/material'
import Paper from '@mui/material/Paper'

import { IProps } from './types'

const CommonTable: FC<IProps> = ({ label, minWidth, children }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth }} aria-label={`${label.toLowerCase()} table`}>
        {children}
      </Table>
    </TableContainer>
  )
}

export default CommonTable
