import React from 'react'

import star from '../assets/icon-goldStarStock.svg'
import location from '../assets/icon-location.svg'

import styles from './styles/vendorCard.module.css'

const VendorCard = () => {

    let data = [
        {
            profile: "/vendorImages/download.png",
            name: "Cool Air Tech",
            rating: 4.5,
            jobCount: 345,
            location: "Thillai Nagar",
        },
        {
            profile: "/vendorImages/vendor2.png",
            name: "Air Freeze",
            rating: 4.7,
            jobCount: 210,
            location: "KK Nagar",
        },
        {
            profile: "/vendorImages/vendor3.png",
            name: "Snow Cooling",
            rating: 4.3,
            jobCount: 150,
            location: "Anna Nagar",
        },
    ]

    return (
        <>
            {
                data.map((vendor, index) => (
                    <div className={styles.vendorContainer} key={index}>

                        <div className={styles.separator}>

                            <div className={styles.profileContainer}>
                                <img src={vendor.profile} alt="profile" />
                            </div>

                            <div className={styles.vendorDetailsContainer}>

                                <div className={styles.serviceTextContainer}>
                                    {vendor.name}
                                </div>

                                <div className={styles.otherDetailsContainer}>

                                    <div className={styles.ratingContainer}>
                                        <div className={styles.starContainer}>
                                            <img src={star} alt="star" />
                                        </div>

                                        <p>{vendor.rating}</p>
                                    </div>

                                    <div className={styles.dotContainer}></div>

                                    <div className={styles.jobCountContainer}>
                                        <p>{vendor.jobCount} jobs</p>
                                    </div>

                                    <div className={styles.dotContainer}></div>

                                    <div className={styles.locationContainer}>
                                        <div className={styles.iconContainer}>
                                            <img src={location} alt="location" />
                                        </div>

                                        <p>{vendor.location}</p>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className={styles.selectIndicationContainer}></div>

                    </div>
                ))
            }
        </>
    )
}

export default VendorCard