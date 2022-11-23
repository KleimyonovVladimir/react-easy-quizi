import { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppNavigationRoutes } from 'constants/paths'
import Quizzes from 'pages/Quizzes'
import Score from 'pages/Score'
import SignInPage from 'pages/SignInPage'
import Users from 'pages/Users'

import AppNavigation from 'components/wrappers/AppNavigation'

export const RouterComponent: FC = () => {
  return (
    <AppNavigation>
      <Routes>
        <Route path={AppNavigationRoutes.Quizzes} element={<Quizzes />} />
        <Route path={AppNavigationRoutes.Users} element={<Users />} />
        <Route path={AppNavigationRoutes.Score} element={<Score />} />
        <Route path={AppNavigationRoutes.SignIn} element={<SignInPage />} />
      </Routes>
    </AppNavigation>
  )
}

export const Router: FC = () => (
  <BrowserRouter>
    <RouterComponent />
  </BrowserRouter>
)
