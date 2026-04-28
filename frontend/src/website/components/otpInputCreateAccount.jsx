import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const otpInputCreateAccount = ({ phone, goToCreateAccount }) => {
    
    const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    if (otp.length !== 6) {
      alert("Invalid OTP");
      return;
    }

    // 👉 call backend API to verify OTP
    console.log("Phone:", phone, "OTP:", otp);
    goToCreateAccount(); // switch component
  };
  return (
    <div className='formBox'>

            <h3 className="label">OTP (One time password)</h3>
            <input 
                type="number"
                className="input"
                placeholder='Ex. 654780'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
            />


            

            <div className="fillButton">
                <button onClick={handleVerify}>Continue</button>
            </div>
            <div className="signupLinkContainer">
                <p>Already have an account? <a onClick={() => navigate("/login")} className="signupLink">Login</a></p>
            </div>
        </div>
  )
}

export default otpInputCreateAccount