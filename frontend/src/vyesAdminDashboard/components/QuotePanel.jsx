import React from 'react'

import quoteImg from '../assets/quoteImg.png';

import styles from './styles/quotePanel.module.css';

const QuotePanel = ({ request }) => {
  const serviceSummary = request?.services?.length
    ? request.services.map((service) =>
        service.selectedService === 'Other'
          ? service.customServiceName || 'Other'
          : service.selectedService
      ).join(', ')
    : 'No service information available';

  const requirementText = request?.services?.length
    ? request.services.map((service) => {
        const serviceName = service.selectedService === 'Other'
          ? service.customServiceName || 'Other'
          : service.selectedService;
        const experience = service.selectedService === 'Other'
          ? service.customExperience
          : service.experience;
        const description = service.customDescription || '';
        return `${serviceName}${experience ? ` – ${experience}` : ''}${description ? `: ${description}` : ''}`;
      }).join(' | ')
    : 'No requirement details available';

  const formattedDate = request?.created
    ? new Date(request.created).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
    : 'Not available';

  return (
    <div className={styles.quotePanelWrapper}>
        <div className={styles.titleContainer}>
            <h3>Customer Requirement</h3>
            <div className={styles.badgeContainer}>
                <button>{request ? 'new' : 'empty'}</button>
            </div>
        </div>
        
        <div className={styles.serviceDetailContainer1}>
            <div className={styles.dataContainer}>
                <p className={styles.dataTitle}>Customer</p>
                <p className={styles.dataValue1}>{request?.contactPerson || 'Rajesh Kumar'}</p>
                <p className={styles.dataValue2}>{request?.phone || '+91 98765 43210'}</p>
            </div>
            <div className={styles.dataContainer}>
                <p className={styles.dataTitle}>Service Category</p>
                <p className={styles.dataValue1}>{serviceSummary}</p>
            </div>
            <div className={styles.dataContainer}>
                <p className={styles.dataTitle}>Address</p>
                <p className={styles.dataValue1}>{request?.address || '12, 4th Cross, Thillai Nagar, Trichy'}</p>
            </div>
            <div className={styles.dataContainer}>
                <p className={styles.dataTitle}>Date & Time</p>
                <p className={styles.dataValue1}>{formattedDate}</p>
            </div>
        </div>

        <div className={styles.serviceDetailContainer2}>
            <div className={styles.dataContainer}>
                <p className={styles.dataTitle}>Requirement</p>
                <div className={styles.noteContainer}>
                    <p className={styles.noteValue}>{requirementText}</p>
                </div>
            </div>
        </div>

        <div className={styles.serviceDetailContainer3}>
            <div className={styles.dataContainer}>
                <p className={styles.dataTitle}>Uploaded Media</p>
                <div className={styles.imgAndVideoWrapper}>
                    <div className={styles.imgAndVideoContainer}>
                        <img src={quoteImg} alt="Quote" />
                    </div>
                    <div className={styles.imgAndVideoContainer}>
                        <img src={quoteImg} alt="Quote" />
                    </div>
                    <div className={styles.imgAndVideoContainer}>
                        <video controls>
                            <source src="" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default QuotePanel