import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@mui/material'
import { createUsers } from 'api/users'
import { AppNavigationRoutes } from 'constants/paths'
import { userStatues } from 'constants/status'
import { IUserValues } from 'types/user'

import { InputControl } from 'components/Input'
import PageTitle from 'components/PageTitle'
import { RadioControl } from 'components/Radio'

import { schema } from './validation'

import './styles.scss'

const mainCssClass = 'user-builder'

const AVAILABLE_ROLES = [
  {
    value: 'teacher',
    label: userStatues.teacher.name
  },
  {
    value: 'student',
    label: userStatues.student.name
  }
]

export const UserBuilder: FC = () => {
  const navigate = useNavigate()

  const { control, handleSubmit } = useForm<IUserValues>({
    resolver: yupResolver(schema),

    defaultValues: {
      fullName: '',
      email: '',
      status: '',
      password: ''
    }
  })

  const submitClickHandler = handleSubmit(async (data): Promise<void> => {
    await createUsers(data)
    navigate(AppNavigationRoutes.Users)
  })

  return (
    <>
      <PageTitle title="User Builder" />

      <div className={`${mainCssClass}-form`}>
        <InputControl
          control={control}
          name="fullName"
          label="Full name"
          placeholder="John Smith"
        />

        <InputControl
          control={control}
          name="email"
          label="Email"
          type="email"
          placeholder="john@easy-quizi.com"
        />

        <InputControl
          control={control}
          name="password"
          label="Password"
          type="password"
          placeholder="password"
        />

        <RadioControl name="status" control={control} label="Status" items={AVAILABLE_ROLES} />
      </div>

      <Button
        className={`${mainCssClass}-button`}
        onClick={submitClickHandler}
        size="small"
        variant="contained"
      >
        Create user
      </Button>
    </>
  )
}
