import { FC } from 'react'
import { Control, useFieldArray } from 'react-hook-form'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import { initialQuestion } from 'constants/questions'
import { IQuizValues } from 'types/quiz'

import { InputControl } from 'components/Input'
import { AddButton, RemoveButton } from 'components/WrappedButtons'

import { AnswersField } from './AnswersField'

const mainCssClass = 'questions'

export interface IQuestionsField {
  control: Control<IQuizValues>
}

export const QuestionsField: FC<IQuestionsField> = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions'
  })

  const addClickHandler = (): void => {
    append(initialQuestion)
  }

  return (
    <>
      <ul className={`${mainCssClass}-list`}>
        {fields.map((item, index) => {
          return (
            <li key={item.id} className={`${mainCssClass}-item`}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <div className={`${mainCssClass}-accordion-summary`}>
                    <InputControl
                      control={control}
                      name={`questions.${index}.question`}
                      label={`Question ${index + 1}`}
                      placeholder="Enter question"
                      onClick={event => {
                        event.stopPropagation()
                      }}
                    />
                    <RemoveButton onClick={() => remove(index)} />
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <AnswersField nestIndex={index} control={control} />
                </AccordionDetails>
              </Accordion>
            </li>
          )
        })}
      </ul>

      <AddButton onClick={addClickHandler} className={`${mainCssClass}-add-button`} />
    </>
  )
}
