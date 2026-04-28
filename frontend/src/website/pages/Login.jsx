import React from 'react'
import loginBanner from '../assets/loginBanner.png'
import longArrow from '../assets/icon-longArrow.png'
import shift from '../assets/icon-shift.png'
import './styles/login.css'

const Login = () => {
  return (
    <div className='loginWrapper'>
      <div className='loginContainer'>

        <div className='contentLeft'>
          <div className="contentLeftWrapper">
            <div className="bannerImgContainer">
              <img src={loginBanner} alt="login banner" />
            </div>
            <div className="pageTitleContainer">
              <h1>Welcome Back to Vyess</h1>
              <p>Log in to book, manage, and track your services.</p>
            </div>
          </div>
        </div>

        <div className='contentRight'>
          <div className="contentRightWrapper">
            <div className="caption">
              <h2>Welcome Back</h2>
              <p>Sign in to continue booking service</p>
            </div>
            <div className='formBox'>
              
              <h3 className="label">Mobile number / Email</h3>
              <input type="text" className="input" placeholder='Enter your mobile number / Email' />

              <h3 className="label">Password</h3>
              <input type="password" className="input" placeholder='Enter your Password' />
              
              <div className="options">
                <div className="rememberMe">
                  <input type="checkbox" name="rememberMe" id="rememberMe" />
                  <label htmlFor="rememberMe">Remember me</label>
                </div>
                <a href="#" className="forgotPassword">Forgot Password?</a>
              </div>
              
              <div className="fillButton">
                <button>Sign In <img src={longArrow} alt="Long Arrow" /></button>
              </div>
              <div className="dividerContainer">
                <div className="divider"></div>
                <p className='dividerText'>Or continue as</p>
              </div>
              <div className="stockButton">
                <button><img src={shift} alt="Shift Icon" /> Login as a Partner</button>
              </div>
              <div className="signupLinkContainer">
                <p>Don't have an account? <a href="#" className="signupLink">Create an account</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
