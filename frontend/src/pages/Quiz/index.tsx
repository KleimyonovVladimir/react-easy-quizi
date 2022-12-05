import { FC, useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { Button, Card } from '@mui/material'
import { getQuiz, sendQuizAnswers } from 'api/quizzes'
import { IQuizDetails } from 'api/swaggerGeneratedApi'

import PageTitle from 'components/PageTitle'

import { CheckBoxAnswers } from './CheckBoxAnswers'
import { RadioAnswers } from './RadioAnswers'
import { IQuestionsValues } from './type'

import './styles.scss'

const mainCssClass = 'quiz-passing'

export const QuizPassing: FC = () => {
  const { id } = useParams<string>()

  const [quiz, setQuiz] = useState<IQuizDetails>()

  const { control, handleSubmit, setValue } = useForm<IQuestionsValues>({
    defaultValues: {
      questions: []
    }
  })

  const { fields } = useFieldArray({
    control,
    name: 'questions'
  })

  useEffect(() => {
    const get = async (): Promise<void> => {
      const quizResponse = await getQuiz(id ?? '')
      setQuiz(quizResponse)

      setValue(
        'questions',
        quizResponse?.questions.map(question => ({
          questionId: question.uid,
          userAnswers: []
        }))
      )
    }
    void get()
  }, [])

  const submitClickHandler = handleSubmit(async (data): Promise<void> => {
    const { questions } = data

    await sendQuizAnswers({ quizId: id, questions })
  })

  return (
    <>
      <PageTitle title="Welcome to the quiz" />
      <div className={`${mainCssClass}-header`}>
        <div>
          <p>
            Quiz name: <i>{quiz?.title}</i>
          </p>
          <p>
            Total: <i>{quiz?.questions.length}</i>
          </p>
        </div>
        <div>Available time: {quiz?.time}</div>
      </div>
      <div className={`${mainCssClass}-questions-list`}>
        {fields.map((item, index) => {
          const findQuestion = quiz?.questions.find(question => question.uid === item.questionId)

          const Answers = !findQuestion?.isMultiple ? RadioAnswers : CheckBoxAnswers

          return (
            <Card key={item.id} className={`${mainCssClass}-question`}>
              <div className={`${mainCssClass}-question-name`}>{findQuestion?.question}</div>

              <Answers
                name={`questions.${index}.userAnswers`}
                control={control}
                answers={findQuestion?.answers ?? {}}
              />
            </Card>
          )
        })}
      </div>
      <Button
        variant="contained"
        onClick={submitClickHandler}
        className={`${mainCssClass}-submit-button`}
      >
        Submit answers
      </Button>
    </>
  )
}
