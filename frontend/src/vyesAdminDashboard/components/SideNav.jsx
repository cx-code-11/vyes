import { Link } from 'react-router-dom';
import { useState } from 'react';

import logo from '../../assets/logo_full.svg';
// import iconDashboard from '../assets/icon-dashboard.svg?react';
import iconOrder from '../assets/icon-order.svg';
import iconPayment from '../assets/icon-payment.svg';
import iconAnalytics from '../assets/icon-analytics.svg';
import iconOffers from '../assets/icon-offers.svg';
import iconCoupon from '../assets/icon-coupon.svg';
import iconRecords from '../assets/icon-records.svg';
import iconManagement from '../assets/icon-Management.svg';
import iconComplaints from '../assets/icon-complaints.svg';
import iconNotification from '../assets/icon-notification.svg';
import profileImg from '../assets/download.png';

import styles from './styles/sideNav.module.css';


const SideNav = () => {
    const [userProfile, setUserProfile] = useState({
        name: 'John Doe',
        role: 'System Authority',
        profilePicture: profileImg, // Placeholder for profile picture
    });

    return (
        <div className={styles.sideNavWrapper}>
            <div className={styles.logoContainer}>
                <img src={logo} alt="vyess" />
            </div>
            <div className={styles.sideNavContainer}>
                <div className={styles.navLinksContainer}>
                    <div className={styles.linkContainer}>
                        <div className={styles.selectedIndication}></div>
                        <div className={styles.iconContainer}>
                            <svg className={styles.myIcon} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.5 2.5H3.33333C2.8731 2.5 2.5 2.8731 2.5 3.33333V9.16667C2.5 9.6269 2.8731 10 3.33333 10H7.5C7.96024 10 8.33333 9.6269 8.33333 9.16667V3.33333C8.33333 2.8731 7.96024 2.5 7.5 2.5Z" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16.6641 2.5H12.4974C12.0372 2.5 11.6641 2.8731 11.6641 3.33333V5.83333C11.6641 6.29357 12.0372 6.66667 12.4974 6.66667H16.6641C17.1243 6.66667 17.4974 6.29357 17.4974 5.83333V3.33333C17.4974 2.8731 17.1243 2.5 16.6641 2.5Z" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16.6641 10H12.4974C12.0372 10 11.6641 10.3731 11.6641 10.8333V16.6667C11.6641 17.1269 12.0372 17.5 12.4974 17.5H16.6641C17.1243 17.5 17.4974 17.1269 17.4974 16.6667V10.8333C17.4974 10.3731 17.1243 10 16.6641 10Z" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M7.5 13.332H3.33333C2.8731 13.332 2.5 13.7051 2.5 14.1654V16.6654C2.5 17.1256 2.8731 17.4987 3.33333 17.4987H7.5C7.96024 17.4987 8.33333 17.1256 8.33333 16.6654V14.1654C8.33333 13.7051 7.96024 13.332 7.5 13.332Z" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <Link to="/" className={styles.navText}>Dashboard</Link>
                    </div>
                    <div className={styles.linkContainer}>
                        <div className={styles.selectedIndication}></div>
                        <div className={styles.iconContainer}>
                            <img src={iconOrder} alt="Order" />
                        </div>
                        <Link to="/" className={styles.navText}>Order Workflow</Link>
                    </div>
                    <div className={styles.linkContainer}>
                        <div className={styles.selectedIndication}></div>
                        <div className={styles.iconContainer}>
                            <img src={iconPayment} alt="Payment" />
                        </div>
                        <Link to="/" className={styles.navText}>Payment Control</Link>
                    </div>
                    <div className={styles.linkContainer}>
                        <div className={styles.selectedIndication}></div>
                        <div className={styles.iconContainer}>
                            <img src={iconAnalytics} alt="Analytics" />
                        </div>
                        <Link to="/" className={styles.navText}>Business Analytics</Link>
                    </div>
                    <div className={styles.linkContainer}>
                        <div className={styles.selectedIndication}></div>
                        <div className={styles.iconContainer}>
                            <img src={iconOffers} alt="Offers" />
                        </div>
                        <Link to="/" className={styles.navText}>Offers</Link>
                    </div>
                    <div className={styles.linkContainer}>
                        <div className={styles.selectedIndication}></div>
                        <div className={styles.iconContainer}>
                            <img src={iconCoupon} alt="Coupon" />
                        </div>
                        <Link to="/" className={styles.navText}>Coupon Code</Link>
                    </div>
                    <div className={styles.linkContainer}>
                        <div className={styles.selectedIndication}></div>
                        <div className={styles.iconContainer}>
                            <img src={iconRecords} alt="Records" />
                        </div>
                        <Link to="/" className={styles.navText}>Records</Link>
                    </div>
                    <div className={styles.linkContainer}>
                        <div className={styles.selectedIndication}></div>
                        <div className={styles.iconContainer}>
                            <img src={iconManagement} alt="Management" />
                        </div>
                        <Link to="/" className={styles.navText}>Management</Link>
                    </div>
                    <div className={styles.linkContainer}>
                        <div className={styles.selectedIndication}></div>
                        <div className={styles.iconContainer}>
                            <img src={iconComplaints} alt="Complaints" />
                        </div>
                        <Link to="/" className={styles.navText}>Complaints</Link>
                    </div>
                </div>
                <div className={styles.accountContainer}>
                    <div className={styles.notificationContainer}>
                        <div className={styles.iconContainer}>
                            <img src={iconNotification} alt="notify" />
                        </div>
                        <h3 className={styles.navText}>Notification</h3>
                    </div>
                    <div className={styles.profileContainer}>
                        <div className={styles.profileImgContainer}>
                            <img src={userProfile.profilePicture} alt="profile" />
                        </div>
                        <div className={styles.nameContainer}>
                            <h3 className={styles.profileName}>{userProfile.name}</h3>
                            <p className={styles.profileAuthority}>{userProfile.role}</p>
                        </div>
                    </div>
                    <div className={styles.toggleBtnContainer}>
                        <svg className={styles.myCustomTab} width="22" height="62" viewBox="0 0 22 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_d_2123_17998)">
                                {/* 1. Added className={styles.tabBg} to the white background path! */}
                                <path className={styles.tabBg} d="M0 1L14.4721 8.23607C17.86 9.92999 20 13.3926 20 17.1803V44.8197C20 48.6074 17.86 52.07 14.4721 53.7639L0 61V1Z" fill="white" />
                            </g>

                            {/* 2. Fixed camelCase: fillRule and clipRule */}
                            <path fillRule="evenodd" clipRule="evenodd" d="M15 36.4019C15 37.6164 14.1 38.3849 13.3643 37.8002L6.57169 32.3983C5.80944 31.7923 5.80944 30.2084 6.57169 29.6016L13.3637 24.1997C14.0994 23.615 14.9994 24.3844 14.9994 25.598L15 36.4019Z" fill="#08043A" />

                            <defs>
                                {/* 3. Fixed camelCase: colorInterpolationFilters and floodOpacity */}
                                <filter id="filter0_d_2123_17998" x="0" y="0" width="22" height="62" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset dx="1" />
                                    <feGaussianBlur stdDeviation="0.5" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2123_17998" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2123_17998" result="shape" />
                                </filter>
                            </defs>
                        </svg>
                    </div>

                </div>


            </div>
        </div>
    );
};

export default SideNav;