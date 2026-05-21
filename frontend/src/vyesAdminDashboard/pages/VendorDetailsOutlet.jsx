import React from 'react';

import iconCompanyLogo from '../assets/icon-vendorDetailsCompanyLogo.svg';
import iconTime from '../assets/icon-vendorDetailsTime.svg';
import iconBusiness from '../assets/icon-vendorDetailsBusinessName.svg';
import iconContactPerson from '../assets/icon-vendorDetailsContactPerson.svg';
import iconPhoneNumber from '../assets/icon-vendorDetailsPhoneNumber.svg';
import iconEmailAddress from '../assets/icon-vendorDetailsEmailAddress.svg';
import iconFullAddress from '../assets/icon-vendorDetailsFullAddress.svg';
import iconService from '../assets/icon-vendorDetailsService.svg';
import iconDescription from '../assets/icon-vendorDetailsDescription.svg';
import iconVerified from '../assets/icon-vendorDetailsVerified.svg';
import iconDocument from '../assets/icon-vendorDetailsDocument.svg';
import iconView from '../assets/icon-vendorDetailsView.svg';
import iconDownload from '../assets/icon-vendorDetailsDownload.svg';
import iconProof from '../assets/icon-vendorDetailsIdProof.svg';
import iconUser from '../assets/icon_vendorDetailsUser.svg';
import iconAccCard from '../assets/icon-vendorDetailsAccCard.svg';
import iconIFSC from '../assets/icon-vendorDetailsIFSC.svg';
import iconApproved from '../assets/icon-vendorDetailsApproved.svg';

import styles from './styles/vendorDetailsOutlet.module.css';

export default function VendorDetailsOutlet() {
    const documents = [
        { name: 'GST Certificate.pdf', status: 'Verified', statusClass: styles.statusVerified },
        { name: 'Aadhaar Card_Front_Back.jpg', status: 'Verified', statusClass: styles.statusVerified },
        { name: 'PAN Card_Company.pdf', status: 'Verified', statusClass: styles.statusVerified }
    ];

    return (
        <div className={styles.mainContent}>
            {/* Top Main Heading */}
            <header className={styles.header}>
                <h1 className={styles.pageTitle}>Vendor Details</h1>
            </header>

            {/* Profile Hero Header Banner */}
            <div className={styles.heroCard}>
                <div className={styles.heroLeft}>
                    <div className={styles.heroIconBox}>
                        <img src={iconCompanyLogo} alt="Company Logo" className={styles.heroIcon} />
                    </div>
                    <div>
                        <div className={styles.heroTitleRow}>
                            <h2 className={styles.vendorHeading}>Cool Air Tech</h2>
                            <span className={styles.statusBadgeHero}>
                                Pending Review
                            </span>
                        </div>
                        <div className={styles.heroMetaRow}>
                            <span>REC-00028</span>
                            <span className={styles.bullet}>•</span>
                            <span className={styles.metaTime}>
                                <img src={iconTime} alt="Time Icon" className={styles.metaTimeIcon} />  
                                 Applied: Oct 24, 2023 at 10:30 AM
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Two Column Section Layout */}
            <div className={styles.contentGrid}>

                {/* Left Core Profile Content Column */}
                <div className={styles.leftColumn}>

                    {/* Basic Information Section */}
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Basic Information</h3>
                        <div className={styles.basicInfoGrid}>
                            <div className={styles.fieldRow}>
                                <img src={iconBusiness} alt="Company Logo" />
                                <div>
                                    <label className={styles.fieldLabel}>Business Name</label>
                                    <div className={styles.fieldValue}>Cool Air Tech Services Pvt. Ltd.</div>
                                </div>
                            </div>
                            <div className={styles.fieldRow}>
                                <img src={iconContactPerson} alt="Contact Person" />
                                <div>
                                    <label className={styles.fieldLabel}>Contact Person</label>
                                    <div className={styles.fieldValue}>Rahul Sharma</div>
                                </div>
                            </div>
                            <div className={styles.fieldRow}>
                                <img src={iconPhoneNumber} alt="Phone Number" />
                                <div>
                                    <label className={styles.fieldLabel}>Phone Number</label>
                                    <div className={styles.fieldValue}>+91 98765 43210</div>
                                </div>
                            </div>
                            <div className={styles.fieldRow}>
                                <img src={iconEmailAddress} alt="Email Address" />
                                <div>
                                    <label className={styles.fieldLabel}>Email Address</label>
                                    <div className={styles.fieldValue}>contact@coolairtech.in</div>
                                </div>
                            </div>
                            <div className={`${styles.fieldRow} ${styles.fullWidthField}`}>
                                <img src={iconFullAddress} alt="Full Address" />
                                <div>
                                    <label className={styles.fieldLabel}>Full Address</label>
                                    <div className={styles.fieldValue}>
                                        123, Tech Park, Phase 2, Electronic City, Bangalore, Karnataka 560100 123, Tech Park, Phase 2, Electronic City, Bangalore, Karnataka 560100 123, Tech Park, Phase 2, Electronic City, Bangalore, Karnataka 560100123, Tech Park, Phase 2, Electronic City, Bangalore, Karnataka 560100
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Service Details Section */}
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Service Details</h3>
                        <div className={styles.serviceRowsContainer}>
                            {/* Service Line item 1 */}
                            <div className={styles.serviceSplitRow}>
                                <div className={styles.fieldRow}>
                                    <img src={iconService} alt="Service" />
                                    <div>
                                        <label className={styles.fieldLabel}>Service</label>
                                        <div className={styles.fieldValue}>AC Service</div>
                                    </div>
                                </div>
                                <div className={styles.fieldRow}>
                                    <img src={iconTime} alt="Experience" />
                                    <div>
                                        <label className={styles.fieldLabel}>Experience</label>
                                        <div className={styles.fieldValue}>5+ Years in Industry</div>
                                    </div>
                                </div>
                            </div>

                            {/* Service Line item 2 */}
                            <div className={styles.serviceSplitRow}>
                                <div className={styles.fieldRow}>
                                    <img src={iconService} alt="Service" />
                                    <div>
                                        <div className={styles.labelWithTagContainer}>
                                            <label className={styles.fieldLabel}>Service</label>
                                            <span className={styles.inlineOtherTag}>Other</span>
                                        </div>
                                        <div className={styles.fieldValue}>Car Wash</div>
                                    </div>
                                </div>
                                <div className={styles.fieldRow}>
                                    <img src={iconTime} alt="Experience" />
                                    <div>
                                        <label className={styles.fieldLabel}>Experience</label>
                                        <div className={styles.fieldValue}>5+ Years in Industry</div>
                                    </div>
                                </div>
                            </div>

                            {/* Full Width Service Description */}
                            <div className={styles.descriptionRow}>
                                <img src={iconDescription} alt="Description" />
                                <div>
                                    <label className={styles.fieldLabelDesc}>Service Description</label>
                                    <div className={styles.descriptionText}>
                                        Describe the service in detail, Describe the service in detail, Describe the service in detail, Describe the service in detail,juiqnniowojwmvww.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Uploaded Documents List Section */}
                    <div className={styles.card} style={{ paddingBottom: '8px' }}>
                        <h3 className={styles.cardTitle}>Documents</h3>
                        <div className={styles.docList}>
                            {documents.map((doc, index) => (
                                <div key={index} className={styles.docRow}>
                                    <div className={styles.docLeft}>
                                        <div className={styles.docIconBox}>
                                            <img src={iconDocument} alt="Document" />
                                        </div>
                                        <div>
                                            <div className={styles.docName}>{doc.name}</div>
                                            <div className={`${styles.docStatusText} ${doc.statusClass}`}>
                                                <img src={iconVerified} alt="Verified" />
                                                <p>{doc.status}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.docActions}>
                                        <button className={styles.docActionBtn}>
                                            <img src={iconView} alt="View" />
                                        </button>
                                        <button className={styles.docActionBtn}>
                                            <img src={iconDownload} alt="Download" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Right Financial Verification & Action Column */}
                <div className={styles.rightColumn}>

                    {/* ID Proof Verification Segment */}
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>ID Proof</h3>
                        <div className={styles.verticalFields}>
                            <div className={styles.fieldRow}>
                                <img src={iconProof} alt="ID Proof" />
                                <div>
                                    <label className={styles.fieldLabel}>GST Number</label>
                                    <div className={styles.fieldValueSec}>29ABCDE1234F1Z5</div>
                                </div>
                            </div>
                            <div className={styles.fieldRow}>
                                <img src={iconProof} alt="IdProof" />
                                <div>
                                    <label className={styles.fieldLabel}>Aadhaar Number</label>
                                    <div className={styles.fieldValueSec}>XXXX XXXX 7890</div>
                                </div>
                            </div>
                            <div className={styles.fieldRow}>
                                <img src={iconProof} alt="IdProof" />
                                <div>
                                    <label className={styles.fieldLabel}>PAN Number</label>
                                    <div className={styles.fieldValueSec}>ABCDE1234F</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bank Account Details Segment */}
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Bank Details</h3>
                        <div className={styles.verticalFields}>
                            <div className={styles.fieldRow}>
                                <img src={iconUser} alt="User" />
                                <div>
                                    <label className={styles.fieldLabel}>Account Holder Name</label>
                                    <div className={styles.fieldValueSec}>Cool Air Tech Services</div>
                                </div>
                            </div>
                            <div className={styles.fieldRow}>
                                <img src={iconAccCard} alt="Account Card" />
                                <div>
                                    <label className={styles.fieldLabel}>Account Number</label>
                                    <div className={styles.fieldValueSec}>XXXX XXXX 4589</div>
                                </div>
                            </div>
                            <div className={styles.fieldRow}>
                                <img src={iconIFSC} alt="IFSC Code" />
                                <div>
                                    <label className={styles.fieldLabel}>IFSC Code</label>
                                    <div className={styles.fieldValueSec}>HDFC0001234</div>
                                </div>
                            </div>
                            <div className={styles.fieldRow}>
                                <img src={iconAccCard} alt="UPI ID" />
                                <div>
                                    <label className={styles.fieldLabel}>UPI ID</label>
                                    <div className={styles.fieldValueSec}>coolair@hdfcbank</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Core Decision Button Group Panel */}
                    <div className={styles.actionPanel}>
                        <button className={styles.btnReject}>
                            <span className={styles.btnIconSpan}>🚫</span> Reject
                        </button>
                        <button className={styles.btnApprove}>
                            <span className={styles.btnIconSpan}><img src={iconApproved} alt="Approved" /></span> Approve & Add Vendor
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}

