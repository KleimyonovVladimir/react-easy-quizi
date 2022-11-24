import React, { FC, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppNavigationRoutes } from 'constants/paths'

import Layout from 'components/wrappers/Layout'

const Quizzes = React.lazy(async () => await import('./pages/Quizzes'))
const Users = React.lazy(async () => await import('./pages/Users'))
const Score = React.lazy(async () => await import('./pages/Score'))

const AuthenticatedApp: FC = () => {
  return (
    <Layout>
      <Suspense fallback={<>Content loading...</>}>
        <Routes>
          <Route path={AppNavigationRoutes.Quizzes} element={<Quizzes />} />
          <Route path={AppNavigationRoutes.Users} element={<Users />} />
          <Route path={AppNavigationRoutes.Score} element={<Score />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default AuthenticatedApp
