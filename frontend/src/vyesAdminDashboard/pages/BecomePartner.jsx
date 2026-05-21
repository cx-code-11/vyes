import React from 'react';
import styles from './styles/becomePartner.module.css';

const partnersData = [
  {
    id: 1,
    initials: 'CA',
    avatarClass: styles.avatarPurple,
    name: 'Cool Air Tech',
    phone: '+91 98765 43210',
    service: 'AC Service',
    serviceClass: styles.serviceBlue,
    location: 'T. Nagar, Chennai',
    experience: '5 Years',
    date: 'Mar 12, 2026',
    time: '10:24 AM',
    status: 'Pending',
    statusClass: styles.statusPending,
  },
  {
    id: 2,
    initials: 'TP',
    avatarClass: styles.avatarGreen,
    name: 'Trichy Plumbing Works',
    phone: '+91 98765 43211',
    service: 'Plumbing',
    serviceClass: styles.serviceTeal,
    location: 'Srirangam, Trichy',
    experience: '8 Years',
    date: 'Mar 12, 2026',
    time: '09:15 AM',
    status: 'Under Review',
    statusClass: styles.statusReview,
  },
  {
    id: 3,
    initials: 'SE',
    avatarClass: styles.avatarYellow,
    name: 'Spark Electricals',
    phone: '+91 98765 43212',
    service: 'Electrical',
    serviceClass: styles.serviceOrange,
    location: 'Anna Nagar, Chennai',
    experience: '3 Years',
    date: 'Mar 11, 2026',
    time: '04:30 PM',
    status: 'Pending',
    statusClass: styles.statusPending,
  },
  {
    id: 4,
    initials: 'GC',
    avatarClass: styles.avatarBlue,
    name: 'Green Clean Services',
    phone: '+91 98765 43213',
    service: 'Deep Cleaning',
    serviceClass: styles.serviceGreen,
    location: 'Velachery, Chennai',
    experience: '6 Years',
    date: 'Mar 11, 2026',
    time: '02:45 PM',
    status: 'Under Review',
    statusClass: styles.statusReview,
  },
  {
    id: 5,
    initials: 'RH',
    avatarClass: styles.avatarTeal,
    name: 'Rajesh Home Solutions',
    phone: '+91 98765 43214',
    service: 'Home Services',
    serviceClass: styles.servicePurple,
    location: 'Adyar, Chennai',
    experience: '10 Years',
    date: 'Mar 10, 2026',
    time: '11:20 AM',
    status: 'Pending',
    statusClass: styles.statusPending,
  },
  {
    id: 5,
    initials: 'RH',
    avatarClass: styles.avatarTeal,
    name: 'Rajesh Home Solutions',
    phone: '+91 98765 43214',
    service: 'Home Services',
    serviceClass: styles.servicePurple,
    location: 'Adyar, Chennai',
    experience: '10 Years',
    date: 'Mar 10, 2026',
    time: '11:20 AM',
    status: 'Pending',
    statusClass: styles.statusPending,
  },
  {
    id: 5,
    initials: 'RH',
    avatarClass: styles.avatarTeal,
    name: 'Rajesh Home Solutions',
    phone: '+91 98765 43214',
    service: 'Home Services',
    serviceClass: styles.servicePurple,
    location: 'Adyar, Chennai',
    experience: '10 Years',
    date: 'Mar 10, 2026',
    time: '11:20 AM',
    status: 'Pending',
    statusClass: styles.statusPending,
  },
  {
    id: 5,
    initials: 'RH',
    avatarClass: styles.avatarTeal,
    name: 'Rajesh Home Solutions',
    phone: '+91 98765 43214',
    service: 'Home Services',
    serviceClass: styles.servicePurple,
    location: 'Adyar, Chennai',
    experience: '10 Years',
    date: 'Mar 10, 2026',
    time: '11:20 AM',
    status: 'Pending',
    statusClass: styles.statusPending,
  },
  {
    id: 5,
    initials: 'RH',
    avatarClass: styles.avatarTeal,
    name: 'Rajesh Home Solutions',
    phone: '+91 98765 43214',
    service: 'Home Services',
    serviceClass: styles.servicePurple,
    location: 'Adyar, Chennai',
    experience: '10 Years',
    date: 'Mar 10, 2026',
    time: '11:20 AM',
    status: 'Pending',
    statusClass: styles.statusPending,
  },
  {
    id: 5,
    initials: 'RH',
    avatarClass: styles.avatarTeal,
    name: 'Rajesh Home Solutions',
    phone: '+91 98765 43214',
    service: 'Home Services',
    serviceClass: styles.servicePurple,
    location: 'Adyar, Chennai',
    experience: '10 Years',
    date: 'Mar 10, 2026',
    time: '11:20 AM',
    status: 'Pending',
    statusClass: styles.statusPending,
  },
  {
    id: 5,
    initials: 'RH',
    avatarClass: styles.avatarTeal,
    name: 'Rajesh Home Solutions',
    phone: '+91 98765 43214',
    service: 'Home Services',
    serviceClass: styles.servicePurple,
    location: 'Adyar, Chennai',
    experience: '10 Years',
    date: 'Mar 10, 2026',
    time: '11:20 AM',
    status: 'Pending',
    statusClass: styles.statusPending,
  },
  {
    id: 5,
    initials: 'RH',
    avatarClass: styles.avatarTeal,
    name: 'Rajesh Home Solutions',
    phone: '+91 98765 43214',
    service: 'Home Services',
    serviceClass: styles.servicePurple,
    location: 'Adyar, Chennai',
    experience: '10 Years',
    date: 'Mar 10, 2026',
    time: '11:20 AM',
    status: 'Pending',
    statusClass: styles.statusPending,
  },
  {
    id: 5,
    initials: 'RH',
    avatarClass: styles.avatarTeal,
    name: 'Rajesh Home Solutions',
    phone: '+91 98765 43214',
    service: 'Home Services',
    serviceClass: styles.servicePurple,
    location: 'Adyar, Chennai',
    experience: '10 Years',
    date: 'Mar 10, 2026',
    time: '11:20 AM',
    status: 'Pending',
    statusClass: styles.statusPending,
  },
  {
    id: 5,
    initials: 'RH',
    avatarClass: styles.avatarTeal,
    name: 'Rajesh Home Solutions',
    phone: '+91 98765 43214',
    service: 'Home Services',
    serviceClass: styles.servicePurple,
    location: 'Adyar, Chennai',
    experience: '10 Years',
    date: 'Mar 10, 2026',
    time: '11:20 AM',
    status: 'Pending',
    statusClass: styles.statusPending,
  },
  {
    id: 5,
    initials: 'RH',
    avatarClass: styles.avatarTeal,
    name: 'Rajesh Home Solutions',
    phone: '+91 98765 43214',
    service: 'Home Services',
    serviceClass: styles.servicePurple,
    location: 'Adyar, Chennai',
    experience: '10 Years',
    date: 'Mar 10, 2026',
    time: '11:20 AM',
    status: 'Pending',
    statusClass: styles.statusPending,
  },
  {
    id: 5,
    initials: 'RH',
    avatarClass: styles.avatarTeal,
    name: 'Rajesh Home Solutions',
    phone: '+91 98765 43214',
    service: 'Home Services',
    serviceClass: styles.servicePurple,
    location: 'Adyar, Chennai',
    experience: '10 Years',
    date: 'Mar 10, 2026',
    time: '11:20 AM',
    status: 'Pending',
    statusClass: styles.statusPending,
  },
  {
    id: 5,
    initials: 'RH',
    avatarClass: styles.avatarTeal,
    name: 'Rajesh Home Solutions',
    phone: '+91 98765 43214',
    service: 'Home Services',
    serviceClass: styles.servicePurple,
    location: 'Adyar, Chennai',
    experience: '10 Years',
    date: 'Mar 10, 2026',
    time: '11:20 AM',
    status: 'Pending',
    statusClass: styles.statusPending,
  },
];

export default function BecomePartner() {
  return (
    <div className={styles.mainContent}>
      {/* Top Header Controls */}
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>Become a partner</h1>
        <div className={styles.headerActions}>
          <div className={styles.searchWrapper}>
            <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Search records..." className={styles.searchInput} />
          </div>
          {/* Filter/Action Buttons */}
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
        </div>
      </header>

      {/* Main Records Table Card */}
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
            {partnersData.map((partner) => (
              <tr key={partner.id} className={styles.tableBodyRow}>
                <td className={styles.td}>
                  <div className={styles.vendorCell}>
                    <div className={`${styles.vendorAvatar} ${partner.avatarClass}`}>
                      {partner.initials}
                    </div>
                    <div>
                      <div className={styles.vendorName}>{partner.name}</div>
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
                    {partner.location}
                  </div>
                </td>
                <td className={styles.td}>
                  <div className={styles.dateText}>{partner.date}</div>
                  <div className={styles.timeText}>{partner.time}</div>
                </td>
                <td className={styles.td}>
                  <span className={`${styles.statusBadge} ${partner.statusClass}`}>
                    <span className={styles.statusDot}></span>
                    {partner.status}
                  </span>
                </td>
                <td className={styles.td} style={{ textAlign: 'center' }}>
                  <button className={styles.reviewButton}>Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}