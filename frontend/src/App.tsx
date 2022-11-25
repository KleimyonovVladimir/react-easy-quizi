import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const UnauthorizedApp = React.lazy(async () => await import('./UnauthorizedApp'))
const AuthenticatedApp = React.lazy(async () => await import('./AuthenticatedApp'))

const App: React.FC = () => {
  const isUserExist = true

  return (
    <Suspense fallback={<>loading</>}>
      <BrowserRouter>
        <Routes>
          {isUserExist ? (
            <Route path="*" element={<AuthenticatedApp />} />
          ) : (
            <Route path="*" element={<UnauthorizedApp />} />
          )}
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App

// if(user){
//   // Авторизованная
//   <AppNavigation>
//     routs...
//   </AppNavigation>
// } else {
//   // Не авторизованная
//   <UnauthorizedWrapper>
//     routs...
//   </UnauthorizedWrapper>
// }
