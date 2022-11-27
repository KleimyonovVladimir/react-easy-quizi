import React, { FC, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useAuthContext } from 'context/AuthContext'

import { AppLayoutSkeleton } from 'components/Skeletons/AppLayoutSkeleton'
import { SignInSkeleton } from 'components/Skeletons/SignInSkeleton'

import 'react-toastify/dist/ReactToastify.css'

const UnauthenticatedApp = React.lazy(async () => await import('./UnauthenticatedApp'))
const AuthenticatedApp = React.lazy(async () => await import('./AuthenticatedApp'))

const App: FC = () => {
  const authContext = useAuthContext()

  const isUserExist = Boolean(authContext.user)

  return (
    <Suspense fallback={isUserExist ? <AppLayoutSkeleton /> : <SignInSkeleton />}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {isUserExist ? (
            <Route path="*" element={<AuthenticatedApp />} />
          ) : (
            <Route path="*" element={<UnauthenticatedApp />} />
          )}
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
