import React, { FC, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppNavigationRoutes } from 'constants/paths'

import { SignInSkeleton } from 'components/Skeletons/SignInSkeleton'

const SignInPage = React.lazy(async () => await import('./pages/SignInPage'))

const UnauthenticatedApp: FC = () => {
  return (
    <Suspense fallback={<SignInSkeleton />}>
      <Routes>
        <Route path={AppNavigationRoutes.SignIn} element={<SignInPage />} />
        <Route path="*" element={<Navigate to={AppNavigationRoutes.SignIn} replace />} />
      </Routes>
    </Suspense>
  )
}

export default UnauthenticatedApp
