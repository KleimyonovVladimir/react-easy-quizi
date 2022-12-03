import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button, Grid } from '@mui/material'
import { createQuizzes } from 'api/quizzes'
import { AppNavigationRoutes } from 'constants/paths'
import { initialQuestion } from 'constants/questions'
import { IQuizValues } from 'types/quiz'

import { InputControl } from 'components/Input'
import PageTitle from 'components/PageTitle'

import { QuestionsField } from './QuestionsField'
import { questionsMapping } from './utils'

import './styles.scss'

const QuizBuilder: FC = () => {
  const navigate = useNavigate()

  const { control, handleSubmit } = useForm<IQuizValues>({
    defaultValues: {
      title: '',
      time: '',
      questions: [initialQuestion]
    }
  })

  const submitClickHandler = handleSubmit(async (data): Promise<void> => {
    const { questions, ...rest } = data

    await createQuizzes({ ...rest, questions: questionsMapping(questions) })

    navigate(AppNavigationRoutes.Quizzes)
  })

  return (
    <>
      <PageTitle title="Quiz Builder" />
      <Grid container spacing={2}>
        <Grid item md={3}>
          <InputControl control={control} name="title" label="Title" placeholder="Enter name" />
        </Grid>
        <Grid item md={3}>
          <InputControl
            control={control}
            name="time"
            label="Time"
            placeholder="Enter available time"
          />
        </Grid>

        <Grid item md={12}>
          <QuestionsField control={control} />
        </Grid>

        <Grid item md={1}>
          <Button onClick={submitClickHandler} size="small" variant="contained">
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default QuizBuilder
