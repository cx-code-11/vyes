import partnerLoginBanner from '../assets/partnerLoginBanner.png'
import longArrow from '../assets/icon-longArrow.png'
import customerLogin from '../assets/icon-customerLogin.png'
import './styles/login.css'

const PartnerLogin = () => {
  return (
    <div className='loginWrapper'>
          <div className='loginContainer'>
    
            <div className='contentLeft'>
              <div className="contentLeftWrapper">
                <div className="bannerImgContainer">
                    <img src={partnerLoginBanner} alt="login banner" />
                </div>
                <div className="pageTitleContainer">
                  <h1>Vyess Partner & Team Login</h1>
                  <p>Access your dashboard to manage services and operations.</p>
                </div>
              </div>
            </div>
    
            <div className='contentRight'>
              <div className="contentRightWrapper">
                <div className="caption">
                  <h2>Welcome Back</h2>
                  <p>Sign in to continue your journey</p>
                </div>
                <div className='formBox'>
                  
                  <h3 className="label">Enter your mobile number / Email</h3>
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
                    <button><img src={customerLogin} alt="customerLogin" /> Login as a Customer</button>
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

export default PartnerLogin