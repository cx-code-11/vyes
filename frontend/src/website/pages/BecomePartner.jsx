import { useState } from 'react'

import iconBasic from '../assets/icon-vendorFormBasicInfo.svg'
import iconService from '../assets/icon-vendorFormService.svg'
import iconBank from '../assets/icon-vendorFormBank.svg'
import uploadImg from '../assets/uploadImg.png'
import dropdownArrow from '../assets/icon-dropdownArrow.png'

import styles from './styles/becomePartner.module.css'

const BecomePartner = () => {

    const [preview, setPreview] = useState(null);

    const handleImage = (e) => {
        const file = e.target.files[0];

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className={styles.becomePartnerWrapper}>
            <h1>Become a Partner</h1>
            <div className={styles.becomePartnerContainer}>
                <div className={styles.basicInfoContainer}>
                    <div className={styles.titleWrapper}>
                        <div className={styles.iconWrapper}>
                            <img src={iconBasic} alt="Basic Information" />
                        </div>
                        <h2>Basic Information</h2>
                    </div>
                    <div className={styles.vendorLogoWrapper}>
                        <div className={styles.vendorLogoContainer}>
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="preview"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            ) : (
                                <img src={uploadImg} alt="Upload Logo"
                                />
                            )}
                        </div>
                        <div className={styles.uploadContainer}>
                            {/* Hidden Input */}
                            <input
                                type="file"
                                id="imageUpload"
                                accept="image/*"
                                onChange={handleImage}
                                style={{ display: "none" }}
                            />

                            {/* Custom Placeholder */}
                            <label
                                htmlFor="imageUpload"
                                className={styles.customUploadLabel}
                            >
                                Upload Logo
                            </label>
                            <p>Recommended: 200x200px</p>
                        </div>
                    </div>
                    <div className={styles.detailsWrapper}>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="businessName">Business Name</label>
                            <input type="text" id="businessName" name="businessName" placeholder='e.g. Cool Air Tech' />
                        </div>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="contactPerson">Contact Person</label>
                            <input type="text" id="contactPerson" name="contactPerson" placeholder='Representative Name' />
                        </div>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input type="text" id="phoneNumber" name="phoneNumber" placeholder='+91' />
                        </div>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="emailAddress">Email Address</label>
                            <input type="text" id="emailAddress" name="emailAddress" placeholder='contact@business.com' />
                        </div>
                    </div>
                    <div className={styles.addressDetailWrapper}>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="fullAddress">Full Address</label>
                            <input type="text" id="fullAddress" name="fullAddress" placeholder='Shop No, Street, Area, City' />
                        </div>
                    </div>
                </div>

                <div className={styles.serviceDetailsContainer}>
                    <div className={styles.titleWrapper}>
                        <div className={styles.iconWrapper}>
                            <img src={iconService} alt="Service Icon" />
                        </div>
                        <h2>Service Details</h2>
                    </div>
                    <div className={styles.detailsWrapper}>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="serviceName">Service Name</label>
                            <div className={styles.selectWrapper}>
                                <select name="serviceName" id="serviceName">
                                    <option value="">Select a service</option>
                                    <option value="service1">AC Service</option>
                                    <option value="service2">Service 2</option>
                                </select>
                                <span className={styles.arrow}><img src={dropdownArrow} alt="Dropdown Arrow" /></span>
                            </div>
                        </div>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="experience">Experience</label>
                            <input type="text" id="experience" name="experience" placeholder='e.g. 5 Years' />
                        </div>
                    </div>
                    <button className={styles.addServiceButton}>+ Add service</button>
                </div>

                <div className={styles.bankDetailsContainer}>
                    <div className={styles.titleWrapper}>
                        <div className={styles.iconWrapper}>
                            <img src={iconBank} alt="Bank Icon" />
                        </div>
                        <h2> {"Bank Details (For Payouts)"}</h2>
                    </div>
                    <div className={styles.detailsWrapper}>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="accountHolderName">Account Holder Name</label>
                            <input type="text" id="accountHolderName" name="accountHolderName" placeholder='As per bank records' />
                        </div>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="accountNumber">Account Number</label>
                            <input type="text" id="accountNumber" name="accountNumber" placeholder='XXXXXXXXXXXX' />
                        </div>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="ifscCode">IFSC Code</label>
                            <input type="text" id="ifscCode" name="ifscCode" placeholder='ABCD0123456' />
                        </div>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="upiId">UPI ID</label>
                            <input type="text" id="upiId" name="upiId" placeholder='mobile@upi' />
                        </div>
                    </div>
                </div>

                <div className={styles.verificationContainer}>
                    <div className={styles.titleWrapper}>
                        <div className={styles.iconWrapper}>
                            <img src="" alt="" />
                        </div>
                        <h2>Verification & Access</h2>
                    </div>
                    <div className={styles.detailsWrapper}>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="gstNumber">{'GST Number (Optional)'}</label>
                            <input type="text" id="gstNumber" name="gstNumber" placeholder='22AAAAA0000A1Z5' />
                        </div>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="aadhar">Aadhar</label>
                            <input type="text" id="aadhar" name="aadhar" placeholder='Aadhar Number' />
                        </div>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="pan">PAN</label>
                            <input type="text" id="pan" name="pan" placeholder='Pan Number' />
                        </div>
                    </div>
                </div>

                <div className={styles.buttonsWrapper}>
                    <div className={styles.buttonsContainer}>
                        <button className={styles.cancelButton}>Cancel</button>
                        <button className={styles.submitButton}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BecomePartner