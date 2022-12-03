import React, { FC } from 'react'
import { Control, useFieldArray } from 'react-hook-form'
import { initialAnswer } from 'constants/questions'
import { IQuizValues } from 'types/quiz'

import { CheckboxControl } from 'components/Checkbox'
import { InputControl } from 'components/Input'
import { AddButton, RemoveButton } from 'components/WrappedButtons'

const mainCssClass = 'answers'

interface IAnswersField {
  nestIndex: number
  control: Control<IQuizValues>
}

export const AnswersField: FC<IAnswersField> = ({ nestIndex, control }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `questions.${nestIndex}.answers`
  })

  const addClickHandler = (): void => {
    append(initialAnswer)
  }

  return (
    <>
      <AddButton className={`${mainCssClass}-add-button`} onClick={addClickHandler} />

      {fields.map((item, index) => {
        return (
          <div key={item.id} className={`${mainCssClass}-control-wrapper`}>
            <CheckboxControl
              control={control}
              name={`questions.${nestIndex}.answers.${index}.isRightAnswer`}
              sx={{ marginRight: '6px' }}
            />

            <InputControl
              control={control}
              name={`questions.${nestIndex}.answers.${index}.answer`}
              placeholder="Enter answer"
            />
            <RemoveButton onClick={() => remove(index)} />
          </div>
        )
      })}
    </>
  )
}
