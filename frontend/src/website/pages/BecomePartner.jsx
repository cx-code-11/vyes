// import { useState } from 'react'

// import iconBasic from '../assets/icon-vendorFormBasicInfo.svg'
// import iconService from '../assets/icon-vendorFormService.svg'
// import iconBank from '../assets/icon-vendorFormBank.svg'
// import uploadImg from '../assets/uploadImg.png'
// import dropdownArrow from '../assets/icon-dropdownArrow.png'

// import styles from './styles/becomePartner.module.css'

// const BecomePartner = () => {

//     const [preview, setPreview] = useState(null);

//     const handleImage = (e) => {
//         const file = e.target.files[0];

//         if (file) {
//             setPreview(URL.createObjectURL(file));
//         }
//     };

//     return (
//         <div className={styles.becomePartnerWrapper}>
//             <h1>Become a Partner</h1>
//             <div className={styles.becomePartnerContainer}>
//                 <div className={styles.basicInfoContainer}>
//                     <div className={styles.titleWrapper}>
//                         <div className={styles.iconWrapper}>
//                             <img src={iconBasic} alt="Basic Information" />
//                         </div>
//                         <h2>Basic Information</h2>
//                     </div>
//                     <div className={styles.vendorLogoWrapper}>
//                         <div className={styles.vendorLogoContainer}>
//                             {preview ? (
//                                 <img
//                                     src={preview}
//                                     alt="preview"
//                                     style={{
//                                         width: "100%",
//                                         height: "100%",
//                                         objectFit: "cover",
//                                     }}
//                                 />
//                             ) : (
//                                 <img src={uploadImg} alt="Upload Logo"
//                                 />
//                             )}
//                         </div>
//                         <div className={styles.uploadContainer}>
//                             {/* Hidden Input */}
//                             <input
//                                 type="file"
//                                 id="imageUpload"
//                                 accept="image/*"
//                                 onChange={handleImage}
//                                 style={{ display: "none" }}
//                             />

//                             {/* Custom Placeholder */}
//                             <label
//                                 htmlFor="imageUpload"
//                                 className={styles.customUploadLabel}
//                             >
//                                 Upload Logo
//                             </label>
//                             <p>Recommended: 200x200px</p>
//                         </div>
//                     </div>
//                     <div className={styles.detailsWrapper}>
//                         <div className={styles.inputWrapper}>
//                             <label htmlFor="businessName">Business Name</label>
//                             <input type="text" id="businessName" name="businessName" placeholder='e.g. Cool Air Tech' />
//                         </div>
//                         <div className={styles.inputWrapper}>
//                             <label htmlFor="contactPerson">Contact Person</label>
//                             <input type="text" id="contactPerson" name="contactPerson" placeholder='Representative Name' />
//                         </div>
//                         <div className={styles.inputWrapper}>
//                             <label htmlFor="phoneNumber">Phone Number</label>
//                             <input type="text" id="phoneNumber" name="phoneNumber" placeholder='+91' />
//                         </div>
//                         <div className={styles.inputWrapper}>
//                             <label htmlFor="emailAddress">Email Address</label>
//                             <input type="text" id="emailAddress" name="emailAddress" placeholder='contact@business.com' />
//                         </div>
//                     </div>
//                     <div className={styles.addressDetailWrapper}>
//                         <div className={styles.inputWrapper}>
//                             <label htmlFor="fullAddress">Full Address</label>
//                             <input type="text" id="fullAddress" name="fullAddress" placeholder='Shop No, Street, Area, City' />
//                         </div>
//                     </div>
//                 </div>

//                 <div className={styles.serviceDetailsContainer}>
//                     <div className={styles.titleWrapper}>
//                         <div className={styles.iconWrapper}>
//                             <img src={iconService} alt="Service Icon" />
//                         </div>
//                         <h2>Service Details</h2>
//                     </div>
//                     <div className={styles.detailsWrapper}>
//                         <div className={styles.inputWrapper}>
//                             <label htmlFor="serviceName">Service Name</label>
//                             <div className={styles.selectWrapper}>
//                                 <select name="serviceName" id="serviceName">
//                                     <option value="">Select a service</option>
//                                     <option value="service1">AC Service</option>
//                                     <option value="service2">Service 2</option>
//                                 </select>
//                                 <span className={styles.arrow}><img src={dropdownArrow} alt="Dropdown Arrow" /></span>
//                             </div>
//                         </div>
//                         <div className={styles.inputWrapper}>
//                             <label htmlFor="experience">Experience</label>
//                             <input type="text" id="experience" name="experience" placeholder='e.g. 5 Years' />
//                         </div>
//                     </div>
//                     <button className={styles.addServiceButton}>+ Add service</button>
//                 </div>

//                 <div className={styles.bankDetailsContainer}>
//                     <div className={styles.titleWrapper}>
//                         <div className={styles.iconWrapper}>
//                             <img src={iconBank} alt="Bank Icon" />
//                         </div>
//                         <h2> {"Bank Details (For Payouts)"}</h2>
//                     </div>
//                     <div className={styles.detailsWrapper}>
//                         <div className={styles.inputWrapper}>
//                             <label htmlFor="accountHolderName">Account Holder Name</label>
//                             <input type="text" id="accountHolderName" name="accountHolderName" placeholder='As per bank records' />
//                         </div>
//                         <div className={styles.inputWrapper}>
//                             <label htmlFor="accountNumber">Account Number</label>
//                             <input type="text" id="accountNumber" name="accountNumber" placeholder='XXXXXXXXXXXX' />
//                         </div>
//                         <div className={styles.inputWrapper}>
//                             <label htmlFor="ifscCode">IFSC Code</label>
//                             <input type="text" id="ifscCode" name="ifscCode" placeholder='ABCD0123456' />
//                         </div>
//                         <div className={styles.inputWrapper}>
//                             <label htmlFor="upiId">UPI ID</label>
//                             <input type="text" id="upiId" name="upiId" placeholder='mobile@upi' />
//                         </div>
//                     </div>
//                 </div>

//                 <div className={styles.verificationContainer}>
//                     <div className={styles.titleWrapper}>
//                         <div className={styles.iconWrapper}>
//                             <img src="" alt="" />
//                         </div>
//                         <h2>Verification & Access</h2>
//                     </div>
//                     <div className={styles.detailsWrapper}>
//                         <div className={styles.inputWrapper}>
//                             <label htmlFor="gstNumber">{'GST Number (Optional)'}</label>
//                             <input type="text" id="gstNumber" name="gstNumber" placeholder='22AAAAA0000A1Z5' />
//                         </div>
//                         <div className={styles.inputWrapper}>
//                             <label htmlFor="aadhar">Aadhar</label>
//                             <input type="text" id="aadhar" name="aadhar" placeholder='Aadhar Number' />
//                         </div>
//                         <div className={styles.inputWrapper}>
//                             <label htmlFor="pan">PAN</label>
//                             <input type="text" id="pan" name="pan" placeholder='Pan Number' />
//                         </div>
//                     </div>
//                 </div>

//                 <div className={styles.buttonsWrapper}>
//                     <div className={styles.buttonsContainer}>
//                         <button className={styles.cancelButton}>Cancel</button>
//                         <button className={styles.submitButton}>Submit</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default BecomePartner


import React, { useState } from 'react';
import styles from './styles/becomePartner.module.css'

const BecomePartner = ({ onClose }) => {
  // State to manage dynamic services
  const [services, setServices] = useState([
    {
      id: Date.now(),
      selectedService: 'AC Service',
      experience: '',
      customServiceName: '',
      customExperience: '',
      customDescription: '',
    },
  ]);

  const handleAddService = () => {
    setServices([
      ...services,
      {
        id: Date.now(),
        selectedService: '',
        experience: '',
        customServiceName: '',
        customExperience: '',
        customDescription: '',
      },
    ]);
  };

  const handleServiceChange = (id, field, value) => {
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, [field]: value } : service
      )
    );
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {/* Header */}
        <div className={styles.header}>
          <h2>Register New Vendor</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            &times;
          </button>
        </div>

        <div className={styles.formBody}>
          {/* Basic Information */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.icon}>🏢</span> Basic Information
            </h3>
            
            <div className={styles.logoUploadSection}>
              <div className={styles.logoPlaceholder}>
                <span className={styles.briefcaseIcon}>💼</span>
              </div>
              <div className={styles.logoUploadTexts}>
                <button type="button" className={styles.uploadBtn}>Upload Logo</button>
                <p className={styles.uploadHint}>Recommended: 200x200px</p>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Business Name</label>
                <input type="text" placeholder="e.g. Cool Air Tech" />
              </div>
              <div className={styles.inputGroup}>
                <label>Contact Person</label>
                <input type="text" placeholder="Representative Name" />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Phone Number</label>
                <input type="text" placeholder="+91" />
              </div>
              <div className={styles.inputGroup}>
                <label>Email Address</label>
                <input type="email" placeholder="contact@business.com" />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Full Address</label>
              <input type="text" placeholder="Shop No, Street, Area, City" />
            </div>
          </section>

          {/* Service Details (Dynamic) */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.icon}>💼</span> Service Details
            </h3>

            {services.map((service) => (
              <div key={service.id} className={styles.serviceItem}>
                <div className={styles.row}>
                  <div className={styles.inputGroup}>
                    <label>Service Name</label>
                    <select
                      value={service.selectedService}
                      onChange={(e) => handleServiceChange(service.id, 'selectedService', e.target.value)}
                    >
                      <option value="">Select Service</option>
                      <option value="AC Service">AC Service</option>
                      <option value="Cleaning">Cleaning</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  {/* Show standard experience only if 'Other' is NOT selected */}
                  {service.selectedService !== 'Other' && (
                    <div className={styles.inputGroup}>
                      <label>Experience</label>
                      <input
                        type="text"
                        placeholder="e.g. 5 Years"
                        value={service.experience}
                        onChange={(e) => handleServiceChange(service.id, 'experience', e.target.value)}
                      />
                    </div>
                  )}
                  {/* Empty div to keep grid layout aligned if 'Other' is selected */}
                  {service.selectedService === 'Other' && <div className={styles.emptyCol}></div>}
                </div>

                {/* Custom Service Details Section - Only visible when 'Other' is selected */}
                {service.selectedService === 'Other' && (
                  <div className={styles.customServiceBlock}>
                    <h4 className={styles.subTitle}>Custom Service Details</h4>
                    <div className={styles.row}>
                      <div className={styles.inputGroup}>
                        <label>Service Name</label>
                        <input
                          type="text"
                          placeholder="Enter service name"
                          value={service.customServiceName}
                          onChange={(e) => handleServiceChange(service.id, 'customServiceName', e.target.value)}
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Experience</label>
                        <input
                          type="text"
                          placeholder="e.g. 5 Years"
                          value={service.customExperience}
                          onChange={(e) => handleServiceChange(service.id, 'customExperience', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Service Description</label>
                      <textarea
                        placeholder="Describe the service in detail...."
                        value={service.customDescription}
                        onChange={(e) => handleServiceChange(service.id, 'customDescription', e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <button type="button" className={styles.addServiceBtn} onClick={handleAddService}>
              + Add service
            </button>
          </section>

          {/* Bank Details */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.icon}>💳</span> Bank Details (For Payouts)
            </h3>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Account Holder Name</label>
                <input type="text" placeholder="As per bank records" />
              </div>
              <div className={styles.inputGroup}>
                <label>Account Number</label>
                <input type="text" placeholder="XXXXXXXXXXXXX" />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>IFSC Code</label>
                <input type="text" placeholder="ABCD0123456" />
              </div>
              <div className={styles.inputGroup}>
                <label>UPI ID</label>
                <input type="text" placeholder="mobile@upi" />
              </div>
            </div>
          </section>

          {/* Verification & Access */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Verification & Access</h3>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>GST Number (Optional)</label>
                <input type="text" placeholder="22AAAAA0000A1Z5" />
              </div>
              <div className={styles.inputGroup}>
                <label>Aadhar</label>
                <input type="text" placeholder="Aadhar Number" />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>PAN</label>
                <input type="text" placeholder="Pan Number" />
              </div>
              <div className={styles.emptyCol}></div>
            </div>
          </section>

          {/* Login Credentials */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Login Credentials</h3>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Username</label>
                <input type="text" placeholder="username" />
              </div>
              <div className={styles.inputGroup}>
                <label>Password</label>
                <input type="password" placeholder="••••••••" />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Account Status</label>
                <select defaultValue="Active">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className={styles.emptyCol}></div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button type="button" className={styles.createBtn}>
            Create Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BecomePartner;