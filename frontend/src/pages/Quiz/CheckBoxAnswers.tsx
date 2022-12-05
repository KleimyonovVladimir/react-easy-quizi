import { FC, useMemo, useState } from 'react'
import { useController } from 'react-hook-form'
import { shuffled } from 'utils/arrays'

import { CheckboxControl } from 'components/Checkbox'

import { IAnswers } from './type'

import './styles.scss'

const mainCssClass = 'quiz-passing'

export const CheckBoxAnswers: FC<IAnswers> = ({ control, name, answers }) => {
  const [checkedValues, setCheckedValues] = useState<number[]>([])

  const { field } = useController({ control, name })

  const handleCheckBoxSelect = (selectedKey: string): void => {
    const selectedKeyNumber = Number(selectedKey)
    const newKeys = checkedValues?.includes(selectedKeyNumber)
      ? checkedValues?.filter(key => key !== selectedKeyNumber)
      : [...(checkedValues ?? []), selectedKeyNumber]

    setCheckedValues(newKeys)
    field.onChange(newKeys)
  }

  const items = useMemo(() => {
    return shuffled(
      Object.keys(answers).map(answerKey => ({
        answerKey,
        label: answers[answerKey]
      }))
    )
  }, [answers])

  return (
    <ul className={`${mainCssClass}-answers-list`}>
      {items.map(({ label, answerKey }) => (
        <li key={answerKey}>
          <CheckboxControl
            control={control}
            name={name}
            label={label}
            checked={checkedValues.includes(Number(answerKey))}
            onChange={() => handleCheckBoxSelect(answerKey)}
            size="small"
          />
        </li>
      ))}
    </ul>
  )
}
