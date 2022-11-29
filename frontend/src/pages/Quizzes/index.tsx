import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { getQuizzes } from 'api/quizzes'
import { IQuiz } from 'api/swaggerGeneratedApi'
import { AppNavigationRoutes } from 'constants/paths'

import CommonTable from 'components/CommonTable'
import PageTitle from 'components/PageTitle'
import { AddButton } from 'components/WrappedButtons'

const Quizzes: FC = () => {
  const navigate = useNavigate()

  const [quizzes, setQuizzes] = useState<IQuiz[]>([])

  useEffect(() => {
    const get = async (): Promise<void> => {
      const usersResponse = await getQuizzes()
      setQuizzes(usersResponse.data)
    }

    void get()
  }, [])

  const handlerRedirectToNewQuizForm = (): void => {
    navigate(AppNavigationRoutes.QuizCreate)
  }

  return (
    <>
      <PageTitle title="Quizzes" />
      <CommonTable label="quizzes" minWidth={650}>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="left">Number of questions</TableCell>
            <TableCell align="left">Created By</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quizzes.map(quiz => (
            <TableRow key={quiz.uid} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {quiz.title}
              </TableCell>
              <TableCell align="left">{quiz.questionsCount}</TableCell>
              <TableCell align="left">{quiz.createdBy.fullName}</TableCell>
              <TableCell align="left">{quiz.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </CommonTable>
      <AddButton sx={{ marginTop: '16px' }} onClick={handlerRedirectToNewQuizForm} />
    </>
  )
}

export default Quizzes
