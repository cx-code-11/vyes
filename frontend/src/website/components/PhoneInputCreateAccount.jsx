import React from 'react'
import { useNavigate } from 'react-router-dom';
import Login from '../pages/Login';


const PhoneInputCreateAccount = ({ phone, setPhone, goToOtp }) => {
    const navigate = useNavigate();
    const handleSendOtp = () => {
        if (phone.length !== 10) {
            alert("Enter valid phone number");
            return;
        }

        // 👉 call backend API here to send OTP

        goToOtp(); // switch component
    };
    return (
        <div className='formBox'>

            <h3 className="label">Enter your mobile number</h3>
            <input 
                type="number"
                className="input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder='9876543210' 
            />

            <div className="fillButton">
                <button onClick={handleSendOtp}>Send OTP</button>
            </div>
            <div className="signupLinkContainer">
                <p>Already have an account? <a onClick={() => navigate("/login")} className="signupLink">Login</a></p>
            </div>
        </div>
    )
}

export default PhoneInputCreateAccount