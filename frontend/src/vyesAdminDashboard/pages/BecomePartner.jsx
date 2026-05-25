import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/becomePartner.module.css';

const apiBaseUrl = typeof import.meta.env.VITE_API_BASE_URL !== 'undefined' ? import.meta.env.VITE_API_BASE_URL : 'http://localhost:3000';

const getInitials = (name) => {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + (parts[1][0] || '')).toUpperCase();
};

export default function BecomePartner() {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
        console.error('Fetch registrations error:', err);
        setError('Unable to load registrations');
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const handleReviewClick = async (partner) => {
    // If it's already reviewed or processed, just navigate
    if (partner.status !== 'Pending') {
      navigate(`/admin/vendorDetails/${partner.id}`, { state: { registration: partner } });
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/vendor-registration/${partner.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Reviewed' })
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      const { data } = await response.json();
      
      // Update local state so badge changes immediately
      setRegistrations(prev => 
        prev.map(p => p.id === partner.id ? { ...p, status: 'Reviewed' } : p)
      );

      // Navigate with updated data
      navigate(`/admin/vendorDetails/${partner.id}`, { state: { registration: data } });
    } catch (err) {
      console.error('Error updating status to Reviewed:', err);
      // Fallback navigation if update fails
      navigate(`/admin/vendorDetails/${partner.id}`, { state: { registration: partner } });
    }
  };

  return (
    <div className={styles.mainContent}>
      {/* Top Header Controls */}
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>Become a partner</h1>
        {/* <div className={styles.headerActions}>
          <div className={styles.searchWrapper}>
            <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Search records..." className={styles.searchInput} />
          </div>
          <button className={styles.actionButton}>
            <svg className={styles.btnIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>
          <button className={styles.actionButton}>
            <svg className={styles.btnIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </button>
        </div> */}
      </header>

      {error && <div className={styles.errorBox}>{error}</div>}

      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeaderRow}>
              <th className={styles.th}>Vendor</th>
              <th className={styles.th}>Location</th>
              <th className={styles.th}>Applied On</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th} style={{ textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className={styles.loadingRow}>Loading vendor registrations...</td>
              </tr>
            ) : registrations.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.emptyRow}>No vendor registrations found.</td>
              </tr>
            ) : (
              registrations.map((partner) => (
                <tr key={partner.id} className={styles.tableBodyRow}>
                  <td className={styles.td}>
                    <div className={styles.vendorCell}>
                      <div className={`${styles.vendorAvatar} ${styles.avatarTeal}`}>
                        {getInitials(partner.businessName)}
                      </div>
                      <div>
                        <div className={styles.vendorName}>{partner.businessName}</div>
                        <div className={styles.vendorPhone}>{partner.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.locationContainer}>
                      <svg className={styles.locationIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {partner.address || 'N/A'}
                    </div>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.dateText}>{new Date(partner.created).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                    <div className={styles.timeText}>{new Date(partner.created).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</div>
                  </td>
                  <td className={styles.td}>
                    <span className={`${styles.statusBadge} ${partner.status === 'Approved' ? styles.statusApproved : partner.status === 'Rejected' ? styles.statusRejected : partner.status === 'Reviewed' ? styles.statusReview : styles.statusPending}`}>
                      <span className={styles.statusDot}></span>
                      {partner.status}
                    </span>
                  </td>
                  <td className={styles.td} style={{ textAlign: 'center' }}>
                    <button className={styles.reviewButton} onClick={() => handleReviewClick(partner)}>
                      Review
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
