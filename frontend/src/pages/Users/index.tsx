import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { IUser } from 'api/swaggerGeneratedApi'
import { deleteUser, getUsers } from 'api/users'
import { AppNavigationRoutes } from 'constants/paths'
import { UsersStatuses, userStatus } from 'constants/status'
import { useConfirm } from 'hooks/useConfirm'
import { useSelect } from 'hooks/useSelect'

import Checkbox from 'components/Checkbox'
import CommonTable from 'components/CommonTable'
import ConfirmModal from 'components/ConfirmModal'
import PageTitle from 'components/PageTitle'
import { Status } from 'components/Status'
import { AddButton, RemoveButton } from 'components/WrappedButtons'
import RBAC from 'components/wrappers/RBAC'

import './styles.scss'

const mainCssClass = 'users'

const Users: FC = () => {
  const navigate = useNavigate()

  const [users, setUsers] = useState<IUser[]>([])

  const { isConfirmModalOpen, handleConfirmDialog } = useConfirm(false)
  const { selected, handleSelectClick, isSelected, setSelected } = useSelect([])

  useEffect(() => {
    const get = async (): Promise<void> => {
      const usersResponse = await getUsers()
      setUsers(usersResponse.data)
    }

    void get()
  }, [])

  const handlerRedirectToNewUserForm = (): void => {
    navigate(AppNavigationRoutes.UserCreate)
  }

  const handleRemoveUser = async (): Promise<void> => {
    await Promise.all(selected.map(deleteUser))
    setUsers(prev => prev.filter(item => !selected.includes(item.uid ?? '')))
    setSelected([])

    handleConfirmDialog()
  }

  return (
    <>
      <PageTitle title="Users" />
      <CommonTable label="users" minWidth={650}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Full Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => {
            const isItemSelected = isSelected(user.uid)
            return (
              <TableRow
                key={user.uid}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                role="checkbox"
                onClick={() => handleSelectClick(user.uid)}
                selected={isItemSelected}
              >
                <TableCell>
                  <Checkbox color="primary" checked={isItemSelected} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.fullName}
                </TableCell>
                <TableCell align="left">{user.email}</TableCell>
                <TableCell>
                  <Status status={userStatus[user.status]} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </CommonTable>
      <div className={`${mainCssClass}-buttons-wrapper`}>
        <AddButton onClick={handlerRedirectToNewUserForm} sx={{ marginRight: '8px' }} />
        <RemoveButton onClick={handleConfirmDialog} />
      </div>
      {isConfirmModalOpen && (
        <ConfirmModal
          text="Are you sure to delete user?"
          onClose={handleConfirmDialog}
          onConfirm={handleRemoveUser}
        />
      )}
    </>
  )
}

export default Users
