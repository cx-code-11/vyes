import React from 'react'

import loginBanner from '../assets/loginBanner.png'
import longArrow from '../assets/icon-longArrow.png'
import shift from '../assets/icon-shift.png'

const createAccount = () => {
    return (
        <div className='formBox'>

            <h3 className="label">Enter your Name</h3>
            <input type="text" className="input" placeholder='Ex. Arun Kumar' />
            <h3 className="label">Email Address</h3>
            <input type="email" className="input" placeholder='Ex. arun.kumar@example.com' />

            <h3 className="label">Password</h3>
            <input type="password" className="input" placeholder='Enter your Password' />
            <h3 className="label">Confirm Password</h3>
            <input type="password" className="input" placeholder='Re-enter your Password' />

            <div className="options">
                <div className="rememberMe">
                    <input type="checkbox" name="rememberMe" id="rememberMe" />
                    <label htmlFor="rememberMe">I agree to the Terms of Service and Privacy Policy</label>
                </div>
            </div>

            <div className="fillButton">
                <button>Sign In <img src={longArrow} alt="Long Arrow" /></button>
            </div>
            <div className="signupLinkContainer">
                <p>Already have an account? <a href="#" className="signupLink">Login</a></p>
            </div>
        </div>
    )
}

export default createAccount