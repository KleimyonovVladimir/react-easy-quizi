import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { deleteQuiz, getQuizzes } from 'api/quizzes'
import { IQuiz } from 'api/swaggerGeneratedApi'
import { AppNavigationRoutes } from 'constants/paths'
import { insertId } from 'utils/path'

import CommonTable from 'components/CommonTable'
import PageTitle from 'components/PageTitle'
import { AddButton, RemoveButton } from 'components/WrappedButtons'

const Quizzes: FC = () => {
  const navigate = useNavigate()

  const [quizzes, setQuizzes] = useState<IQuiz[]>([])

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

  const handleRemoveQuiz = (id: string) => async (): Promise<void> => {
    await deleteQuiz(id)
    setQuizzes(prev => prev.filter(item => item.uid !== id))
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
            <TableCell align="center">Let's start</TableCell>
            <TableCell>Actions</TableCell>
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
              <TableCell align="center">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handlerRedirectToQuiz(quiz.uid)}
                >
                  Start
                </Button>
              </TableCell>
              <TableCell>
                <RemoveButton sx={{ marginLeft: '8px' }} onClick={handleRemoveQuiz(quiz.uid)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </CommonTable>
      <AddButton sx={{ marginTop: '16px' }} onClick={handlerRedirectToNewQuizForm} />
    </>
  )
}

export default Quizzes
