import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import partnerLoginBanner from '../assets/partnerLoginBanner.png'
import longArrow from '../assets/icon-longArrow.png'
import customerLogin from '../assets/icon-customerLogin.png'
import Styles from './styles/login.module.css';

const apiBaseUrl = typeof import.meta.env.VITE_API_BASE_URL !== 'undefined' ? import.meta.env.VITE_API_BASE_URL : 'http://localhost:3000';

const Login = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const trimmedIdentifier = identifier.trim();
    const trimmedPassword = password.trim();

    if (!trimmedIdentifier || !trimmedPassword) {
      setError('Please enter username, email/phone and password.');
      return;
    }

    const isPhone = /^[0-9]+$/.test(trimmedIdentifier);
    const isEmail = trimmedIdentifier.includes('@');

    setLoading(true);

    try {
      const response = await fetch(`${apiBaseUrl}/admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: trimmedPassword,
          phoneNumber: isPhone ? trimmedIdentifier : undefined,
          email: isEmail ? trimmedIdentifier.toLowerCase() : undefined,
          username: !isPhone && !isEmail ? trimmedIdentifier : undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      // Store admin info in localStorage
      localStorage.setItem('admin', JSON.stringify(data.admin));
      navigate('/admin/becomePartner');
    } catch (err) {
      console.error('Login error:', err);
      setError('Unable to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={Styles.loginWrapper}>
          <div className={Styles.loginContainer}>
    
            {/* <div className={Styles.contentLeft}>
              <div className={Styles.contentLeftWrapper}>
                <div className={Styles.bannerImgContainer}>
                    <img src={partnerLoginBanner} alt="login banner" />
                </div>
                <div className={Styles.pageTitleContainer}>
                  <h1>Vyess Partner & Team Login</h1>
                  <p>Access your dashboard to manage services and operations.</p>
                </div>
              </div>
            </div> */}
    
            <div className={Styles.contentRight}>
              <div className={Styles.contentRightWrapper}>
                <div className={Styles.caption}>
                  <h2>Welcome Back</h2>
                  <p>Sign in to continue your journey</p>
                </div>
                <form className={Styles.formBox} onSubmit={handleSubmit}>
                  
                  <h3 className={Styles.label}>Enter your username, mobile number, or email</h3>
                  <input
                    type="text"
                    className={Styles.input}
                    placeholder='Enter your username, mobile number, or email'
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
    
                  <h3 className={Styles.label}>Password</h3>
                  <input
                    type="password"
                    className={Styles.input}
                    placeholder='Enter your Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  
                  {/* <div className={Styles.options}>
                    <div className={Styles.rememberMe}>
                      <input type="checkbox" name="rememberMe" id="rememberMe" />
                      <label htmlFor="rememberMe">Remember me</label>
                    </div>
                    <a href="#" className={Styles.forgotPassword}>Forgot Password?</a>
                  </div> */}

                  {error && <div className={Styles.errorMessage}>{error}</div>}
                  
                  <button type="submit" className={Styles.fillButton} disabled={loading}>
                    <div className={Styles.buttonWrapper}>
                        <p>{loading ? 'Signing In...' : 'Sign In'}</p>
                        <img src={longArrow} alt="Long Arrow" />
                    </div>
                  </button>
                  {/* <div className={Styles.dividerContainer}>
                    <div className={Styles.divider}></div>
                    <p className={Styles.dividerText}>Or continue as</p>
                  </div>
                  <div className={Styles.stockButton}>
                    <button><img src={customerLogin} alt="customerLogin" /> Login as a Customer</button>
                  </div>
                  <div className={Styles.signupLinkContainer}>
                    <p>Don't have an account? <a href="#" className={Styles.signupLink}>Create an account</a></p>
                  </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Login