import { FC, useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import Paper from '@mui/material/Paper'
import { IUser } from 'api/swaggerGeneratedApi'
import { getUsers } from 'api/users'
import { userStatues } from 'constants/status'

import { Status } from 'components/Status'

const Users: FC = () => {
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    const get = async (): Promise<void> => {
      try {
        const usersResponse = await getUsers()
        setUsers(usersResponse.data)
      } catch (error) {
        console.log('🚀 ~ getUsers ~ error', error)
      }
    }

    void get()
  }, [])

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Users
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.uid} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {user.fullName}
                </TableCell>
                <TableCell align="left">{user.email}</TableCell>
                <TableCell>
                  <Status status={userStatues[user.status]} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Users
