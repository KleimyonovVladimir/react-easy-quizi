import * as yup from 'yup'

export const schema = yup.object({
  email: yup.string().required().email('The email must be valid: test@gmail.com'),
  password: yup.string().required().min(6).max(32)
})
