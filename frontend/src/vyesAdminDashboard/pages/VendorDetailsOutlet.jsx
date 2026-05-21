import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

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
    const { id } = useParams();
    const location = useLocation();
    const [registration, setRegistration] = useState(location.state?.registration || null);
    const [loading, setLoading] = useState(!registration);
    const [error, setError] = useState('');
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

    useEffect(() => {
        if (!registration && id) {
            const fetchRegistration = async () => {
                try {
                    const response = await fetch(`${apiBaseUrl}/vendor-registration/${id}`);
                    const data = await response.json();
                    if (!response.ok) {
                        setError(data.error || 'Unable to load registration');
                        return;
                    }
                    setRegistration(data);
                } catch (err) {
                    console.error('Error loading registration:', err);
                    setError('Unable to load registration details');
                } finally {
                    setLoading(false);
                }
            };
            fetchRegistration();
        } else {
            setLoading(false);
        }
    }, [id, registration, apiBaseUrl]);

    if (loading) {
        return (
            <div className={styles.mainContent}>
                <p>Loading vendor details...</p>
            </div>
        );
    }

    if (error || !registration) {
        return (
            <div className={styles.mainContent}>
                <p style={{ color: '#DC2626' }}>{error || 'No registration data found'}</p>
            </div>
        );
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
    };

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
                            <h2 className={styles.vendorHeading}>{registration.businessName}</h2>
                            <span className={styles.statusBadgeHero}>
                                {registration.status}
                            </span>
                        </div>
                        <div className={styles.heroMetaRow}>
                            <span>{registration.uiId}</span>
                            <span className={styles.bullet}>•</span>
                            <span className={styles.metaTime}>
                                <img src={iconTime} alt="Time Icon" className={styles.metaTimeIcon} />  
                                 Applied: {formatDate(registration.created)}
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
                                    <div className={styles.fieldValue}>{registration.businessName}</div>
                                </div>
                            </div>
                            <div className={styles.fieldRow}>
                                <img src={iconContactPerson} alt="Contact Person" />
                                <div>
                                    <label className={styles.fieldLabel}>Contact Person</label>
                                    <div className={styles.fieldValue}>{registration.contactPerson}</div>
                                </div>
                            </div>
                            <div className={styles.fieldRow}>
                                <img src={iconPhoneNumber} alt="Phone Number" />
                                <div>
                                    <label className={styles.fieldLabel}>Phone Number</label>
                                    <div className={styles.fieldValue}>{registration.phone}</div>
                                </div>
                            </div>
                            <div className={styles.fieldRow}>
                                <img src={iconEmailAddress} alt="Email Address" />
                                <div>
                                    <label className={styles.fieldLabel}>Email Address</label>
                                    <div className={styles.fieldValue}>{registration.email}</div>
                                </div>
                            </div>
                            <div className={`${styles.fieldRow} ${styles.fullWidthField}`}>
                                <img src={iconFullAddress} alt="Full Address" />
                                <div>
                                    <label className={styles.fieldLabel}>Full Address</label>
                                    <div className={styles.fieldValue}>
                                        {registration.address}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Service Details Section */}
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Service Details</h3>
                        <div className={styles.serviceRowsContainer}>
                            {registration.services?.map((service, index) => (
                                <div key={index}>
                                    <div className={styles.serviceSplitRow}>
                                        <div className={styles.fieldRow}>
                                            <img src={iconService} alt="Service" />
                                            <div>
                                                {service.selectedService === 'Other' ? (
                                                    <div className={styles.labelWithTagContainer}>
                                                        <label className={styles.fieldLabel}>Service</label>
                                                        <span className={styles.inlineOtherTag}>Other</span>
                                                    </div>
                                                ) : (
                                                    <label className={styles.fieldLabel}>Service</label>
                                                )}
                                                <div className={styles.fieldValue}>
                                                    {service.selectedService === 'Other' ? service.customServiceName : service.selectedService}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.fieldRow}>
                                            <img src={iconTime} alt="Experience" />
                                            <div>
                                                <label className={styles.fieldLabel}>Experience</label>
                                                <div className={styles.fieldValue}>
                                                    {service.selectedService === 'Other' ? service.customExperience : service.experience}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {service.selectedService === 'Other' && service.customDescription && (
                                        <div className={styles.descriptionRow}>
                                            <img src={iconDescription} alt="Description" />
                                            <div>
                                                <label className={styles.fieldLabelDesc}>Service Description</label>
                                                <div className={styles.descriptionText}>
                                                    {service.customDescription}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Right Financial Verification & Action Column */}
                <div className={styles.rightColumn}>

                    {/* ID Proof Verification Segment */}
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>ID Proof & Bank Details</h3>
                        <div className={styles.verticalFields}>
                            <div className={styles.fieldRow}>
                                <img src={iconProof} alt="ID Proof" />
                                <div>
                                    <label className={styles.fieldLabel}>GST Number</label>
                                    <div className={styles.fieldValueSec}>{registration.gstNumber || 'Not provided'}</div>
                                </div>
                            </div>
                            <div className={styles.fieldRow}>
                                <img src={iconProof} alt="IdProof" />
                                <div>
                                    <label className={styles.fieldLabel}>Aadhaar Number</label>
                                    <div className={styles.fieldValueSec}>{registration.aadhar}</div>
                                </div>
                            </div>
                            <div className={styles.fieldRow}>
                                <img src={iconProof} alt="IdProof" />
                                <div>
                                    <label className={styles.fieldLabel}>PAN Number</label>
                                    <div className={styles.fieldValueSec}>{registration.pan}</div>
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
                                    <div className={styles.fieldValueSec}>{registration.accountHolderName}</div>
                                </div>
                            </div>
                            <div className={styles.fieldRow}>
                                <img src={iconAccCard} alt="Account Card" />
                                <div>
                                    <label className={styles.fieldLabel}>Account Number</label>
                                    <div className={styles.fieldValueSec}>••••••••{registration.accountNumber?.slice(-4)}</div>
                                </div>
                            </div>
                            <div className={styles.fieldRow}>
                                <img src={iconIFSC} alt="IFSC Code" />
                                <div>
                                    <label className={styles.fieldLabel}>IFSC Code</label>
                                    <div className={styles.fieldValueSec}>{registration.ifscCode}</div>
                                </div>
                            </div>
                            <div className={styles.fieldRow}>
                                <img src={iconAccCard} alt="UPI ID" />
                                <div>
                                    <label className={styles.fieldLabel}>UPI ID</label>
                                    <div className={styles.fieldValueSec}>{registration.upiId}</div>
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

