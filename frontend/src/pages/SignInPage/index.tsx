import { FC } from 'react'
import loginBackground from 'assets/login-bg.png'

import { Logo } from 'components/Logo'
import SignIn from 'components/SignIn'

import './styles.scss'

const mainCssClass = 'sign-in'

const SignInPage: FC = () => {
  return (
    <>
      <Logo className={`${mainCssClass}-logo`} color="black" />
      <div className={`${mainCssClass}-content`}>
        <div className={`${mainCssClass}-container`}>
          <SignIn />
        </div>
        <div className={`${mainCssClass}-bg-container`}>
          <div className={`${mainCssClass}-intro`}>
            <div className={`${mainCssClass}-bg-image-wrap`}>
              <img className={`${mainCssClass}-bg-image`} src={loginBackground} alt="Login" />
            </div>
            <h1>Test your knowledge</h1>
            <p className={`${mainCssClass}-bg-subtitle`}>
              Only the diligent will achieve the result
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignInPage
