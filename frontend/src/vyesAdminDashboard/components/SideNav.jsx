import { Link } from 'react-router-dom';
import { useState } from 'react';

import logoFull from '../../assets/logo_full.svg';
import logoMini from '../../assets/logo_mini.svg';
import IconDashboard from '../assets/icon-dashboard.svg?react';
import IconOrder from '../assets/icon-order.svg?react';
import IconPayment from '../assets/icon-payment.svg?react';
import IconAnalytics from '../assets/icon-analytics.svg?react';
import IconOffers from '../assets/icon-offers.svg?react';
import IconCoupon from '../assets/icon-coupon.svg?react';
import IconRecords from '../assets/icon-records.svg?react';
import IconManagement from '../assets/icon-management.svg?react';
import IconComplaints from '../assets/icon-complaints.svg?react';
import IconBecomePartner from '../assets/icon-becomePartner.svg?react';
import IconNotification from '../assets/icon-notification.svg?react';
import profileImg from '../assets/download.png';

import styles from './styles/sideNav.module.css';


const SideNav = () => {

    const [selectedLink, setSelectedLink] = useState('become-a-partner'); // Default selected link

    const [userProfile, setUserProfile] = useState({
        name: 'Admin',
        role: 'System Authority',
        profilePicture: profileImg, // Placeholder for profile picture
    });

    const [collapsed, setCollapsed] = useState(false);

    function handleToggleBtn() {
        setCollapsed(prev => !prev);
    }

    const logo = collapsed ? logoMini : logoFull;
    return (
        <div
            className={`
                        ${styles.sideNavWrapper}
                        ${collapsed ? styles.collapsed : ""}
                    `}
        >
            <div className={styles.logoContainer}>
                <img src={logo} alt="vyess" className={`${collapsed ? styles.collapsedLogo : ""}`} />
            </div>
            <div className={styles.sideNavContainer}>
                <div className={styles.navLinksContainer}>
                    <div
                        className={`
                            ${styles.linkContainer} 
                            ${selectedLink === "dashboard" ? styles.activeLink : ""}
                            `}
                        onClick={() => setSelectedLink("dashboard")}
                    >
                        <div className={styles.selectedIndication}></div>
                        <div className={styles.iconContainer}>
                            <IconDashboard className={styles.navIcon} />
                        </div>
                        <Link
                            to="/admin/dashboard"
                            className={`
                                        ${styles.navText}
                                        ${collapsed ? styles.hideText : ""}
                                `}
                        >
                            Dashboard
                        </Link>
                    </div>
                    <div
                        className={`
                            ${styles.linkContainer} 
                            ${selectedLink === "order" ? styles.activeLink : ""}
                            `}
                        onClick={() => setSelectedLink("order")}
                    >
                        <div className={styles.selectedIndication}></div>
                        <div className={styles.iconContainer}>
                            <IconOrder className={styles.navIcon} />
                        </div>
                        <Link
                            to="/admin/orderWorkflow"
                            className={`
                                        ${styles.navText}
                                        ${collapsed ? styles.hideText : ""}
                            `}
                        >
                            Order Workflow
                        </Link>
                    </div>
                    <div
                        className={`
                            ${styles.linkContainer} 
                            ${selectedLink === "payment" ? styles.activeLink : ""}
                            `}
                        onClick={() => setSelectedLink("payment")}
                    >
                        <div className={styles.selectedIndication}></div>
                        <div className={styles.iconContainer}>
                            <IconPayment className={styles.navIcon} />
                        </div>
                        <Link
                            to="/admin/paymentControl"
                            className={`
                                        ${styles.navText}
                                        ${collapsed ? styles.hideText : ""}
                            `}
                        >
                            Payment Control
                        </Link>
                    </div>
                    <div
                        className={`
                            ${styles.linkContainer} 
                            ${selectedLink === "analytics" ? styles.activeLink : ""}
                            `}
                        onClick={() => setSelectedLink("analytics")}
                    >
                        <div className={styles.selectedIndication}></div>
                        <div className={styles.iconContainer}>
                            <IconAnalytics className={styles.navIcon} />
                        </div>
                        <Link
                            to="/admin/businessAnalytics"
                            className={`
                                        ${styles.navText}
                                        ${collapsed ? styles.hideText : ""}
                            `}
                        >
                            Business Analytics
                        </Link>
                    </div>
                    <div
                        className={`
                            ${styles.linkContainer} 
                            ${selectedLink === "offers" ? styles.activeLink : ""}
                            `}
                        onClick={() => setSelectedLink("offers")}
                    >
                        <div className={styles.selectedIndication}></div>
                        <div className={styles.iconContainer}>
                            <IconOffers className={styles.navIcon} />
                        </div>
                        <Link
                            to="/admin/offers"
                            className={`
        ${styles.navText}
        ${collapsed ? styles.hideText : ""}
    `}
                        >
                            Offers
                        </Link>
                    </div>
                    <div
                        className={`
                            ${styles.linkContainer} 
                            ${selectedLink === "coupon" ? styles.activeLink : ""}
                            `}
                        onClick={() => setSelectedLink("coupon")}
                    >
                        <div className={styles.selectedIndication}></div>
                        <div className={styles.iconContainer}>
                            <IconCoupon className={styles.navIcon} />
                        </div>
                        <Link
                            to="/admin/coupons"
                            className={`
        ${styles.navText}
        ${collapsed ? styles.hideText : ""}
    `}
                        >
                            Coupons
                        </Link>
                    </div>
                    <div
                        className={`
                            ${styles.linkContainer} 
                            ${selectedLink === "records" ? styles.activeLink : ""}
                            `}
                        onClick={() => setSelectedLink("records")}
                    >
                        <div className={styles.selectedIndication}></div>
                        <div className={styles.iconContainer}>
                            <IconRecords className={styles.navIcon} />
                        </div>
                        <Link
                            to="/admin/records"
                            className={`
        ${styles.navText}
        ${collapsed ? styles.hideText : ""}
    `}
                        >
                            Records
                        </Link>
                    </div>
                    <div
                        className={`
                            ${styles.linkContainer} 
                            ${selectedLink === "management" ? styles.activeLink : ""}
                            `}
                        onClick={() => setSelectedLink("management")}
                    >
                        <div className={styles.selectedIndication}></div>
                        <div className={styles.iconContainer}>
                            <IconManagement className={styles.navIcon} />
                        </div>
                        <Link
                            to="/admin/management"
                            className={`
        ${styles.navText}
        ${collapsed ? styles.hideText : ""}
    `}
                        >
                            Management
                        </Link>
                    </div>
                    <div
                        className={`
                            ${styles.linkContainer} 
                            ${selectedLink === "complaints" ? styles.activeLink : ""}
                            `}
                        onClick={() => setSelectedLink("complaints")}
                    >
                        <div className={styles.selectedIndication}></div>
                        <div className={styles.iconContainer}>
                            <IconComplaints className={styles.navIcon} />
                        </div>
                        <Link
                            to="/admin/complaints"
                            className={`
        ${styles.navText}
        ${collapsed ? styles.hideText : ""}
    `}
                        >
                            Complaints
                        </Link>
                    </div>
                    <div
                        className={`
                            ${styles.linkContainer} 
                            ${selectedLink === "become-a-partner" ? styles.activeLink : ""}
                            `}
                        onClick={() => setSelectedLink("become-a-partner")}
                    >
                        <div className={styles.selectedIndication}></div>
                        <div className={styles.iconContainer}>
                            <IconBecomePartner className={styles.navIcon} />
                        </div>
                        <Link
                            to="/admin/becomePartner"
                            className={`
        ${styles.navText}
        ${collapsed ? styles.hideText : ""}
    `}
                        >
                            Become a Partner
                        </Link>
                    </div>
                </div>
                <div className={styles.accountContainer}>
                    <div className={styles.notificationContainer}>
                        <div className={styles.iconContainer}>
                            <IconNotification className={styles.navIcon} />
                        </div>
                        <h3
                            className={`
                                        ${styles.navText}
                                        ${collapsed ? styles.hideText : ""}
                            `}
                        >
                        Notification
                        </h3>
                    </div>
                    <div className={styles.profileContainer}>
                        <div className={styles.profileImgContainer}>
                            <img src={userProfile.profilePicture} alt="profile" />
                        </div>
                        <div
                            className={`
                                        ${styles.nameContainer}
                                        ${collapsed ? styles.hideText : ""}
                            `}
                        >
                            <h3 className={styles.profileName}>{userProfile.name}</h3>
                            <p className={styles.profileAuthority}>{userProfile.role}</p>
                        </div>
                    </div>
                    <div className={styles.toggleBtnContainer} onClick={() => handleToggleBtn()}>
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