import React from 'react'

import quoteImg from '../assets/quoteImg.png';

import styles from './styles/quotePanel.module.css';

const QuotePanel = () => {
  return (
    <div className={styles.quotePanelWrapper}>
        <div className={styles.titleContainer}>
            <h3>Customer Requirement</h3>
            <div className={styles.badgeContainer}>
                <button>new</button>
            </div>
        </div>
        
        <div className={styles.serviceDetailContainer1}>
            <div className={styles.dataContainer}>
                <p className={styles.dataTitle}>Customer</p>
                <p className={styles.dataValue1}>Rajesh Kumar</p>
                <p className={styles.dataValue2}>+91 98765 43210</p>
            </div>
            <div className={styles.dataContainer}>
                <p className={styles.dataTitle}>Service Category</p>
                <p className={styles.dataValue1}>AC Deep Cleaning & Service</p>
            </div>
            <div className={styles.dataContainer}>
                <p className={styles.dataTitle}>Address</p>
                <p className={styles.dataValue1}>12, 4th Cross, Thillai Nagar, Trichy</p>
            </div>
            <div className={styles.dataContainer}>
                <p className={styles.dataTitle}>Date & Time</p>
                <p className={styles.dataValue1}>12/01/2026 | 11:00 AM</p>
            </div>
        </div>

        <div className={styles.serviceDetailContainer2}>
            <div className={styles.dataContainer}>
                <p className={styles.dataTitle}>Requirement</p>
                <div className={styles.noteContainer}>
                    <p className={styles.noteValue}>Two split AC units need deep cleaning. One is making noise.</p>
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