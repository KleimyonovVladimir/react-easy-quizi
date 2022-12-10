import React, { FC, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppNavigationRoutes } from 'constants/paths'
import { QuizPassing } from 'pages/Quiz'
import QuizBuilder from 'pages/QuizBuilder'
import { UserBuilder } from 'pages/UserBuilder'

import PageLoader from 'components/PageLoader'
import Layout from 'components/wrappers/Layout'

const Quizzes = React.lazy(async () => await import('./pages/Quizzes'))
const Users = React.lazy(async () => await import('./pages/Users'))
const Score = React.lazy(async () => await import('./pages/Score'))
const UIKits = React.lazy(async () => await import('./pages/UIKits'))

const AuthenticatedApp: FC = () => {
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path={AppNavigationRoutes.Quizzes} element={<Quizzes />} />
          <Route path={AppNavigationRoutes.QuizCreate} element={<QuizBuilder />} />
          <Route path={AppNavigationRoutes.QuizzesId} element={<QuizPassing />} />
          <Route path={AppNavigationRoutes.Users} element={<Users />} />
          <Route path={AppNavigationRoutes.UserCreate} element={<UserBuilder />} />
          <Route path={AppNavigationRoutes.Score} element={<Score />} />
          <Route path={AppNavigationRoutes.UIKits} element={<UIKits />} />

          <Route
            path={AppNavigationRoutes.SignIn}
            element={<Navigate to={AppNavigationRoutes.Quizzes} replace />}
          />
          <Route path="*" element={<div>404 Page Not Found</div>} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default AuthenticatedApp
