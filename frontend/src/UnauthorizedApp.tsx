import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppNavigationRoutes } from 'constants/paths'

const SignInPage = React.lazy(async () => await import('pages/SignInPage'))

const UnauthorizedApp: FC = () => {
  return (
    <div>
      <Routes>
        <Route path={AppNavigationRoutes.SignIn} element={<SignInPage />} />
      </Routes>
    </div>
  )
}

export default UnauthorizedApp
