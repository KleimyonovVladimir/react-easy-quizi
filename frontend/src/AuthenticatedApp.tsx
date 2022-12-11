import React, { FC, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppNavigationRoutes } from 'constants/paths'
import { QuizPassing } from 'pages/Quiz'
import QuizBuilder from 'pages/QuizBuilder'
import { UserBuilder } from 'pages/UserBuilder'

import PageLoader from 'components/PageLoader'
import { ProtectedRoute } from 'components/ProtectedRoute'
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
          <Route
            path={AppNavigationRoutes.Quizzes}
            element={
              <ProtectedRoute permission={AppNavigationRoutes.Quizzes}>
                <Quizzes />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppNavigationRoutes.QuizCreate}
            element={
              <ProtectedRoute permission={AppNavigationRoutes.QuizCreate}>
                <QuizBuilder />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppNavigationRoutes.QuizzesId}
            element={
              <ProtectedRoute permission={AppNavigationRoutes.QuizzesId}>
                <QuizPassing />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppNavigationRoutes.Users}
            element={
              <ProtectedRoute permission={AppNavigationRoutes.Users}>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppNavigationRoutes.UserCreate}
            element={
              <ProtectedRoute permission={AppNavigationRoutes.UserCreate}>
                <UserBuilder />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppNavigationRoutes.Score}
            element={
              <ProtectedRoute permission={AppNavigationRoutes.Score}>
                <Score />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppNavigationRoutes.UIKits}
            element={
              <ProtectedRoute permission={AppNavigationRoutes.UIKits}>
                <UIKits />
              </ProtectedRoute>
            }
          />

          <Route
            path={AppNavigationRoutes.SignIn}
            element={<Navigate to={AppNavigationRoutes.Quizzes} replace />}
          />
          <Route
            path={AppNavigationRoutes.Error403}
            element={<div>403 You haven't got access to this page</div>}
          />
          <Route path={AppNavigationRoutes.Error404} element={<div>404 Page Not Found</div>} />
          <Route path="*" element={<Navigate to={AppNavigationRoutes.Error404} replace />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default AuthenticatedApp
