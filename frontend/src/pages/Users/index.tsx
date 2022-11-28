import { FC, useEffect, useState } from 'react'
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { IUser } from 'api/swaggerGeneratedApi'
import { getUsers } from 'api/users'
import { userStatues } from 'constants/status'

import CommonTable from 'components/CommonTable'
import PageTitle from 'components/PageTitle'
import { Status } from 'components/Status'

const Users: FC = () => {
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    const get = async (): Promise<void> => {
      const usersResponse = await getUsers()
      setUsers(usersResponse.data)
    }

    void get()
  }, [])

  return (
    <>
      <PageTitle title="Users" />
      <CommonTable label="users" minWidth={650}>
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
      </CommonTable>
    </>
  )
}

export default Users
