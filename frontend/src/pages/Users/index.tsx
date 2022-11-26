import { FC, useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Paper from '@mui/material/Paper'
import { IUser } from 'api/swaggerGeneratedApi'

const Users: FC = () => {
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    const getUsers = async (): Promise<void> => {
      try {
        const usersResponse = await fetch('http://localhost:4000/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
        const result = await usersResponse.json()
        setUsers(result)
      } catch (error) {
        console.log('🚀 ~ getUsers ~ error', error)
      }
    }

    void getUsers()
  }, [])

  return (
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
            <TableRow key={user.email} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {user.fullName}
              </TableCell>
              <TableCell align="left">{user.email}</TableCell>
              <TableCell>{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Users
