import partnerLoginBanner from '../assets/partnerLoginBanner.png'
import longArrow from '../assets/icon-longArrow.png'
import customerLogin from '../assets/icon-customerLogin.png'
import Styles from './styles/login.module.css';

const Login = () => {
  return (
    <div className={Styles.loginWrapper}>
          <div className={Styles.loginContainer}>
    
            <div className={Styles.contentLeft}>
              <div className={Styles.contentLeftWrapper}>
                <div className={Styles.bannerImgContainer}>
                    <img src={partnerLoginBanner} alt="login banner" />
                </div>
                <div className={Styles.pageTitleContainer}>
                  <h1>Vyess Partner & Team Login</h1>
                  <p>Access your dashboard to manage services and operations.</p>
                </div>
              </div>
            </div>
    
            <div className={Styles.contentRight}>
              <div className={Styles.contentRightWrapper}>
                <div className={Styles.caption}>
                  <h2>Welcome Back</h2>
                  <p>Sign in to continue your journey</p>
                </div>
                <div className={Styles.formBox}>
                  
                  <h3 className={Styles.label}>Enter your mobile number / Email</h3>
                  <input type="text" className={Styles.input} placeholder='Enter your mobile number / Email' />
    
                  <h3 className={Styles.label}>Password</h3>
                  <input type="password" className={Styles.input} placeholder='Enter your Password' />
                  
                  <div className={Styles.options}>
                    <div className={Styles.rememberMe}>
                      <input type="checkbox" name="rememberMe" id="rememberMe" />
                      <label htmlFor="rememberMe">Remember me</label>
                    </div>
                    <a href="#" className={Styles.forgotPassword}>Forgot Password?</a>
                  </div>
                  
                  <div className={Styles.fillButton}>
                    <button>Sign In <img src={longArrow} alt="Long Arrow" /></button>
                  </div>
                  <div className={Styles.dividerContainer}>
                    <div className={Styles.divider}></div>
                    <p className={Styles.dividerText}>Or continue as</p>
                  </div>
                  <div className={Styles.stockButton}>
                    <button><img src={customerLogin} alt="customerLogin" /> Login as a Customer</button>
                  </div>
                  <div className={Styles.signupLinkContainer}>
                    <p>Don't have an account? <a href="#" className={Styles.signupLink}>Create an account</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Login