import React from 'react'

import VendorCard from '../components/VendorCard'

import styles from './styles/assignVendor.module.css'

const AssignVendor = () => {
  return (
    <div className={styles.assignVendorWrapper}>
        <div className={styles.assignVendorContainer}>
            <div className={styles.topContainer}>
                <h2>Assign Vendor</h2>
                <div className={styles.customerDetails}>
                    <p className={styles.orderId}>#ORD-4642</p>
                    <div className={styles.seperationDot}></div>
                    <p className={styles.serviceName}>AC Deep Clean</p>
                    <div className={styles.seperationDot}></div>
                    <p className={styles.serviceLocation}>Thillai Nagar</p>
                    <div className={styles.badgeContainer}>
                        <button>new</button>
                    </div>

                </div>
            </div>

            <div className={styles.contentContainer}>
                <div className={styles.vendorListWrapper}>
                    <div className={styles.subTitleContainer}>
                        <p className={styles.subTitle}>{"Verified Vendors (AC Service)"}</p>
                    </div>
                    <div className={styles.vendorListContainer}>
                        <VendorCard />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AssignVendor