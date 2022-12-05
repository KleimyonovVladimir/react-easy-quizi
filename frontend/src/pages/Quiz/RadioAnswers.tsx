import { FC, useMemo, useState } from 'react'
import { useController } from 'react-hook-form'
import { shuffled } from 'utils/arrays'

import { RadioControl } from 'components/Radio'

import { IAnswers } from './type'

const mainCssClass = 'quiz-passing'

export const RadioAnswers: FC<IAnswers> = ({ control, name, answers }) => {
  const [checkedValues, setCheckedValues] = useState<number[]>([])

  const { field } = useController({ control, name })

  const handleRadioSelect = (selectedKey: string): void => {
    const selectedKeyNumber = [Number(selectedKey)]
    setCheckedValues(selectedKeyNumber)
    field.onChange(selectedKeyNumber)
  }

  const items = useMemo(() => {
    return shuffled(
      Object.keys(answers).map(el => ({
        value: el,
        label: answers[el] ?? ''
      }))
    )
  }, [answers])

  return (
    <RadioControl
      name={name}
      control={control}
      items={items}
      className={`${mainCssClass}-answers-list`}
      onChange={event => handleRadioSelect(String(event.target.value))}
      value={String(checkedValues[0])}
    />
  )
}
