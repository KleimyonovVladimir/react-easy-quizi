import React, { FC, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAuthContext } from 'context/AuthContext'

const UnauthenticatedApp = React.lazy(async () => await import('./UnauthenticatedApp'))
const AuthenticatedApp = React.lazy(async () => await import('./AuthenticatedApp'))

const App: FC = () => {
  const authContext = useAuthContext()

  const isUserExist = Boolean(authContext.user)

  return (
    <Suspense fallback={<>loading</>}>
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
