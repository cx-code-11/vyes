import {useState} from 'react'
import { Link, Outlet } from 'react-router-dom';


import iconTotalOrder from '../assets/icon-dashboardTotalOrder.png';
import iconRevenue from '../assets/icon-dashboardRevenue.png';
import iconComplaint from '../assets/icon-dashboardComplaint.png';
import iconSearch from '../assets/icon-dashboardSearch.svg';
import iconArrow from '../assets/icon-dashboardArrow.svg';
import iconRotateArrow from '../assets/icon-dashboardRotateArrow.svg';

import styles from './styles/dashboard.module.css';

const Dashboard = () => {
  const [user, setUser] = useState({
    name: "Arun Kumar",
    role: "Super Admin"
  });
  const [selectedOrderList, setSelectedOrderList] = useState("Quotation Requested");
  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.topSection}>
        <div className={styles.titleSection}>
          <div className={styles.titleContainer}>
            <h2>Dashboard</h2>
            <p>Welcome back, {user.name}!</p>
          </div>
          <div className={styles.searchContainer}>
            <img src={iconSearch} alt="search" />
            <input type="search" placeholder="Search..." className={styles.searchInput} />
          </div>
        </div>
        <div className={styles.summerySection}>
          <div className={styles.cardContainer}>
            <div className={styles.cardContentContainer}>
              <h3 className={styles.cardTitle}>Revenue</h3>
              <p className={styles.cardValue}>&#8377; 10,000</p>
              <p className={styles.cardMessage}>+10% from last month</p>
            </div>
            <div className={styles.cardImgContainer}>
              <img src={iconRevenue} alt="revenue" />
            </div>
          </div>
          <div className={styles.cardContainer}>
            <div className={styles.cardContentContainer}>
              <h3 className={styles.cardTitle}>Orders</h3>
              <p className={styles.cardValue}>100</p>
              <p className={styles.cardMessage}>+5% from last month</p>
            </div>
            <div className={styles.cardImgContainer}>
              <img src={iconTotalOrder} alt="orders" />
            </div>
          </div>
          <div className={styles.cardContainer}>
            <div className={styles.cardContentContainer}>
              <h3 className={styles.cardTitle}>Complaints</h3>
              <p className={styles.cardValue}>10</p>
              <p className={styles.cardMessage}>-2% from last month</p>
            </div>
            <div className={styles.cardImgContainer}>
              <img src={iconComplaint} alt="complaints" />
            </div>
          </div>
        </div>
        <div className={styles.orderStatusSection}>
          <div className={styles.cardContainer}>
            <div className={styles.cardContentContainer}>
              <h3 className={styles.cardTitle}>New Request</h3>
              <p className={styles.cardValue}>10</p>
            </div>
            <div className={styles.cardImgContainer}>
              <img src={iconTotalOrder} alt="new request" />
            </div>
          </div>
          <div className={styles.cardContainer}>
            <div className={styles.cardContentContainer}>
              <h3 className={styles.cardTitle}>Orders In Progress</h3>
              <p className={styles.cardValue}>10</p>
            </div>
            <div className={styles.cardImgContainer}>
              <img src={iconTotalOrder} alt="orders in progress" />
            </div>
          </div>
          <div className={styles.cardContainer}>
            <div className={styles.cardContentContainer}>
              <h3 className={styles.cardTitle}>Vendor Assignments Pending</h3>
              <p className={styles.cardValue}>10</p>
            </div>
            <div className={styles.cardImgContainer}>
              <img src={iconTotalOrder} alt="vendor assignments pending" />
            </div>
          </div>
        </div>
      </div>


      <div className={styles.bottomSection}>
        <div className={styles.orderListTopContainer}>
          <div className={styles.orderListNavContainer}>
            <p>{selectedOrderList}</p>
            <div className={styles.orderListImgContainer}>
              <img src={iconRotateArrow} alt="rotate arrow" />
            </div>
          </div>
          <div className={styles.gotopageButtonContainer}>
            <button>View All Requests</button>
            <img src={iconArrow} alt="arrow" />
          </div>
        </div>
        <div className={styles.orderListOutletContainer}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard