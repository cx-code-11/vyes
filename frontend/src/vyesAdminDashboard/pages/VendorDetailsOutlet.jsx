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
    const [previewUrl, setPreviewUrl] = useState(null);
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
        if (!dateString) return 'Oct 24, 2023 at 10:30 AM'; // Fallback to match design
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    const handleUpdateStatus = async (newStatus) => {
        try {
            const response = await fetch(`${apiBaseUrl}/vendor-registration/${registration.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) {
                alert('Failed to update status');
                return;
            }

            const data = await response.json();
            setRegistration(data.data); // Update local state immediately
        } catch (err) {
            console.error('Error updating status:', err);
            alert('An error occurred while updating the status');
        }
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
                            <h2 className={styles.vendorHeading}>{registration.businessName || 'Cool Air Tech'}</h2>
                            <span className={`${styles.statusBadgeHero} ${
                                registration.status === 'Approved' ? styles.statusApproved : 
                                registration.status === 'Rejected' ? styles.statusRejected : 
                                registration.status === 'Reviewed' ? styles.statusReviewed : 
                                styles.statusPending
                            }`}>
                                <span className={styles.statusDotHero}></span>
                                {registration.status || 'Pending'}
                            </span>
                        </div>
                        <div className={styles.heroMetaRow}>
                            <span>{registration.uiId || 'REC-00028'}</span>
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
                                    <div className={styles.fieldValue}>{registration.businessName || 'Cool Air Tech Services Pvt. Ltd.'}</div>
                                </div>
                            </div>
                            <div className={styles.fieldRow}>
                                <img src={iconContactPerson} alt="Contact Person" />
                                <div>
                                    <label className={styles.fieldLabel}>Contact Person</label>
                                    <div className={styles.fieldValue}>{registration.contactPerson || 'Rahul Sharma'}</div>
                                </div>
                            </div>
                            <div className={styles.fieldRow}>
                                <img src={iconPhoneNumber} alt="Phone Number" />
                                <div>
                                    <label className={styles.fieldLabel}>Phone Number</label>
                                    <div className={styles.fieldValue}>{registration.phone || '+91 98765 43210'}</div>
                                </div>
                            </div>
                            <div className={styles.fieldRow}>
                                <img src={iconEmailAddress} alt="Email Address" />
                                <div>
                                    <label className={styles.fieldLabel}>Email Address</label>
                                    <div className={styles.fieldValue}>{registration.email || 'contact@coolairtech.in'}</div>
                                </div>
                            </div>
                            <div className={`${styles.fieldRow} ${styles.fullWidthField}`}>
                                <img src={iconFullAddress} alt="Full Address" />
                                <div>
                                    <label className={styles.fieldLabel}>Full Address</label>
                                    <div className={styles.fieldValue}>
                                        {registration.address || '123, Tech Park, Phase 2, Electronic City, Bangalore, Karnataka 560100'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Service Details Section */}
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Service Details</h3>
                        <div className={styles.serviceRowsContainer}>
                            {registration.services && registration.services.length > 0 ? (
                                registration.services.map((service, index) => (
                                    <div key={index} className={styles.serviceItemWrapper}>
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
                                ))
                            ) : (
                                /* Fallback matching the design */
                                <>
                                    <div className={styles.serviceItemWrapper}>
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
                                    </div>
                                    <div className={styles.serviceItemWrapper}>
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
                                </>
                            )}
                        </div>
                    </div>

                    {/* Documents Section */}
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Documents</h3>
                        <div className={styles.docList}>
                            {[
                                { name: 'Aadhaar Card', url: registration.aadhaarUrl },
                                { name: 'PAN Card', url: registration.panUrl },
                                { name: 'GST Certificate', url: registration.gstUrl },
                                { name: 'Signed Agreement', url: registration.agreementUrl }
                            ].filter(doc => doc.url).length > 0 ? (
                                [
                                    { name: 'Aadhaar Card', url: registration.aadhaarUrl },
                                    { name: 'PAN Card', url: registration.panUrl },
                                    { name: 'GST Certificate', url: registration.gstUrl },
                                    { name: 'Signed Agreement', url: registration.agreementUrl }
                                ].filter(doc => doc.url).map((doc, index) => (
                                    <div className={styles.docRow} key={index}>
                                        <div className={styles.docLeft}>
                                            <div className={styles.docIconBox}>
                                                <img src={iconDocument} alt="Document" className={styles.docFileIcon} />
                                            </div>
                                            <div>
                                                <div className={styles.docName}>{doc.name}</div>
                                                <div className={`${styles.docStatusText} ${styles.statusVerified}`}>
                                                    <img src={iconVerified} alt="Verified" /> Uploaded
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.docActions}>
                                            <button onClick={() => setPreviewUrl(doc.url)} className={styles.docActionBtn}><img src={iconView} alt="View" /></button>
                                            <a href={doc.url} download className={styles.docActionBtn}><img src={iconDownload} alt="Download" /></a>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                /* Fallback UI matching the design */
                                <>
                                    <div className={styles.docRow}>
                                        <div className={styles.docLeft}>
                                            <div className={styles.docIconBox}>
                                                <img src={iconDocument} alt="Document" className={styles.docFileIcon} />
                                            </div>
                                            <div>
                                                <div className={styles.docName}>No documents uploaded yet.</div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
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
                                    <div className={styles.fieldValueSec}>{registration.gstNumber || '29ABCDE1234F1Z5'}</div>
                                </div>
                            </div>
                            <div className={styles.fieldRow}>
                                <img src={iconProof} alt="IdProof" />
                                <div>
                                    <label className={styles.fieldLabel}>Aadhaar Number</label>
                                    <div className={styles.fieldValueSec}>{registration.aadhar || '[Aadhaar Redacted]'}</div>
                                </div>
                            </div>
                            <div className={styles.fieldRow}>
                                <img src={iconProof} alt="IdProof" />
                                <div>
                                    <label className={styles.fieldLabel}>PAN Number</label>
                                    <div className={styles.fieldValueSec}>{registration.pan || 'ABCDE1234F'}</div>
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
                                    <div className={styles.fieldValueSec}>{registration.accountHolderName || 'Cool Air Tech Services'}</div>
                                </div>
                            </div>
                            <div className={styles.fieldRow}>
                                <img src={iconAccCard} alt="Account Card" />
                                <div>
                                    <label className={styles.fieldLabel}>Account Number</label>
                                    <div className={styles.fieldValueSec}>
                                        {registration.accountNumber ? `••••••••${registration.accountNumber.slice(-4)}` : 'XXXX XXXX 4589'}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.fieldRow}>
                                <img src={iconIFSC} alt="IFSC Code" />
                                <div>
                                    <label className={styles.fieldLabel}>IFSC Code</label>
                                    <div className={styles.fieldValueSec}>{registration.ifscCode || 'HDFC0001234'}</div>
                                </div>
                            </div>
                            <div className={styles.fieldRow}>
                                <img src={iconAccCard} alt="UPI ID" />
                                <div>
                                    <label className={styles.fieldLabel}>UPI ID</label>
                                    <div className={styles.fieldValueSec}>{registration.upiId || 'coolair@hdfcbank'}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Core Decision Button Group Panel */}
                    <div className={styles.actionPanel}>
                        <button className={styles.btnReject} onClick={() => handleUpdateStatus('Rejected')}>
                            <span className={styles.btnRejectIcon}>⊗</span> Reject
                        </button>
                        <button className={styles.btnApprove} onClick={() => handleUpdateStatus('Approved')}>
                            <img src={iconApproved} alt="Approved" className={styles.btnApproveIcon} /> Approve & Add Vendor
                        </button>
                    </div>

                </div>

            </div>

            {/* Document Preview Overlay */}
            {previewUrl && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        zIndex: 1000,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '2rem'
                    }}
                    onClick={() => setPreviewUrl(null)}
                >
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            maxWidth: '1000px',
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            position: 'relative'
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setPreviewUrl(null)}
                            style={{
                                position: 'absolute',
                                top: '10px', right: '10px',
                                background: '#64748B',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '32px', height: '32px',
                                cursor: 'pointer',
                                zIndex: 10
                            }}
                        >
                            ✕
                        </button>
                        {previewUrl.match(/\.(jpeg|jpg|gif|png)$/i) ? (
                            <img
                                src={previewUrl}
                                alt="Document Preview"
                                style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#f8fafc' }}
                            />
                        ) : (
                            <iframe
                                src={previewUrl}
                                style={{ width: '100%', height: '100%', border: 'none' }}
                                title="Document Preview"
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}