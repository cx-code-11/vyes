import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/becomePartner.module.css'

const BecomePartner = () => {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/vendor-registration`);
        const data = await response.json();
        if (!response.ok) {
          setError(data.error || 'Unable to load registrations');
          return;
        }
        setRegistrations(data);
      } catch (err) {
        console.error('Error loading registrations:', err);
        setError('Unable to load registrations');
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [apiBaseUrl]);

  const handleReview = (registration) => {
    navigate(`/admin/vendorDetails/${registration.id}`, { state: { registration } });
  };

  return (
    <div className={styles.becomePartnerWrapper}>
      <h1>Pending Vendor Registrations</h1>
      
      {loading && <p className={styles.loadingText}>Loading registrations...</p>}
      {error && <p className={styles.errorText}>{error}</p>}
      
      {!loading && registrations.length === 0 && (
        <p className={styles.emptyText}>No pending registrations at this time.</p>
      )}

      {!loading && registrations.length > 0 && (
        <div className={styles.becomePartnerContainer}>
          <div className={styles.registrationListWrapper}>
            {registrations.map((registration) => (
              <div key={registration.id} className={styles.registrationCard}>
                <div className={styles.registrationHeader}>
                  <div className={styles.registrationInfo}>
                    <h3 className={styles.businessName}>{registration.businessName}</h3>
                    <p className={styles.registrationMeta}>ID: {registration.uiId}</p>
                    <p className={styles.registrationMeta}>Contact: {registration.contactPerson} • {registration.phone}</p>
                    <p className={styles.registrationMeta}>Email: {registration.email}</p>
                  </div>
                  <div className={styles.registrationStatus}>
                    <span className={styles.statusBadge}>{registration.status}</span>
                    <p className={styles.submittedDate}>
                      {new Date(registration.created).toLocaleDateString('en-IN', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                <div className={styles.registrationServices}>
                  <p className={styles.servicesLabel}>Services:</p>
                  <p className={styles.servicesText}>
                    {registration.services?.length
                      ? registration.services
                          .map((s) => s.selectedService === 'Other' ? s.customServiceName : s.selectedService)
                          .join(', ')
                      : 'No services'}
                  </p>
                </div>
                <div className={styles.registrationActions}>
                  <button 
                    className={styles.reviewButton}
                    onClick={() => handleReview(registration)}
                  >
                    Review Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BecomePartner
