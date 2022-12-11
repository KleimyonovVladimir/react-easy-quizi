import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { deleteQuiz, getQuizzes } from 'api/quizzes'
import { IQuiz } from 'api/swaggerGeneratedApi'
import { AppNavigationRoutes } from 'constants/paths'
import { UsersStatuses } from 'constants/status'
import { useConfirm } from 'hooks/useConfirm'
import { useSelect } from 'hooks/useSelect'
import { insertId } from 'utils/path'

import Checkbox from 'components/Checkbox'
import CommonTable from 'components/CommonTable'
import ConfirmModal from 'components/ConfirmModal'
import PageTitle from 'components/PageTitle'
import { AddButton, RemoveButton } from 'components/WrappedButtons'
import RBAC from 'components/wrappers/RBAC'

import './styles.scss'

const mainCssClass = 'quizzes'

const Quizzes: FC = () => {
  const navigate = useNavigate()

  const [quizzes, setQuizzes] = useState<IQuiz[]>([])

  const { isConfirmModalOpen, handleConfirmDialog } = useConfirm(false)
  const { selected, handleSelectClick, isSelected, setSelected } = useSelect([])

  useEffect(() => {
    const get = async (): Promise<void> => {
      const quizResponse = await getQuizzes()
      setQuizzes(quizResponse.data)
    }

    void get()
  }, [])

  const handlerRedirectToNewQuizForm = (): void => {
    navigate(AppNavigationRoutes.QuizCreate)
  }

  const handlerRedirectToQuiz = (id: string): void => {
    navigate(insertId(AppNavigationRoutes.QuizzesId, id))
  }

  const handleRemoveQuiz = async (): Promise<void> => {
    await Promise.all(selected.map(deleteQuiz))
    setQuizzes(prev => prev.filter(item => !selected.includes(item.uid ?? '')))
    setSelected([])

    handleConfirmDialog()
  }

  return (
    <>
      <PageTitle title="Quizzes" />
      <CommonTable label="quizzes" minWidth={650}>
        <TableHead>
          <TableRow>
            <RBAC allowedRoles={[UsersStatuses.Admin]}>
              <TableCell />
            </RBAC>
            <TableCell>Title</TableCell>
            <TableCell align="left">Number of questions</TableCell>
            <TableCell align="left">Created By</TableCell>
            <TableCell>Time</TableCell>
            <TableCell align="center">Let's start</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quizzes.map(quiz => {
            const isItemSelected = isSelected(quiz.uid)

            return (
              <TableRow
                key={quiz.uid}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                role="checkbox"
                onClick={() => handleSelectClick(quiz.uid)}
                selected={isItemSelected}
              >
                <RBAC allowedRoles={[UsersStatuses.Admin]}>
                  <TableCell>
                    <Checkbox color="primary" checked={isItemSelected} />
                  </TableCell>
                </RBAC>
                <TableCell component="th" scope="row">
                  {quiz.title}
                </TableCell>
                <TableCell align="left">{quiz.questionsCount}</TableCell>
                <TableCell align="left">{quiz.createdBy.fullName}</TableCell>
                <TableCell align="left">{quiz.time}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handlerRedirectToQuiz(quiz.uid)}
                  >
                    Start
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </CommonTable>
      <div className={`${mainCssClass}-buttons-wrapper`}>
        <RBAC allowedRoles={[UsersStatuses.Admin, UsersStatuses.Teacher]}>
          <AddButton onClick={handlerRedirectToNewQuizForm} sx={{ marginRight: '8px' }} />
        </RBAC>
        <RBAC allowedRoles={[UsersStatuses.Admin]}>
          <RemoveButton onClick={handleConfirmDialog} />
        </RBAC>
      </div>
      {isConfirmModalOpen && (
        <ConfirmModal
          text="Are you sure to delete quiz?"
          onClose={handleConfirmDialog}
          onConfirm={handleRemoveQuiz}
        />
      )}
    </>
  )
}

export default Quizzes
