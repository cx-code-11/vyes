import { useState } from "react";

import signupBanner from '../assets/signupBanner.png'
import longArrow from '../assets/icon-longArrow.png'
import customerLogin from '../assets/icon-customerLogin.png'

import PhoneInput from '../components/PhoneInputCreateAccount'
import OtpInput from '../components/otpInputCreateAccount'
import CreateAccount from '../components/createAccount'

import './styles/login.css'

const Signup = () => {

    const [step, setStep] = useState("phone");
    const [phone, setPhone] = useState("");
    return (
        <div className='loginWrapper'>
            <div className='loginContainer'>

                <div className='contentLeft'>
                    <div className="contentLeftWrapper">
                        <div className="bannerImgContainer">
                            <img src={signupBanner} alt="signup banner" />
                        </div>
                        <div className="pageTitleContainer">
                            <h1>Get Started with Vyess</h1>
                            <p>Create your account to book trusted home services.</p>
                        </div>
                    </div>
                </div>

                <div className='contentRight'>
                    <div className="contentRightWrapper">
                        <div className="caption">
                            <h2>Create Your Account</h2>
                            <p>Join vyess and transform your service experience</p>
                        </div>
                        {step === "phone" && (
                            <PhoneInput
                                phone={phone}
                                setPhone={setPhone}
                                goToOtp={() => setStep("otp")}
                            />
                        )}

                        {step === "otp" && (
                            <OtpInput
                                phone={phone}
                                goToCreateAccount={() => setStep("createAccount")}
                            />
                        )}

                        {step === "createAccount" && (
                            <CreateAccount
                                phone={phone}
                                goBack={() => setStep("otp")}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup