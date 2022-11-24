import React, { FC, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const AuthenticatedApp = React.lazy(async () => await import('./AuthenticatedApp'))
const UnauthenticatedApp = React.lazy(async () => await import('./UnauthenticatedApp'))

const isUserExist = true

const App: FC = () => {
  return (
    <Suspense fallback={<>loading...</>}>
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
