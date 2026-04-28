import {useState} from 'react'

import styles from './styles/dashboard.module.css';

const Dashboard = () => {
  const [user, setUser] = useState({
    name: "Arun Kumar",
    role: "Super Admin"
  });
  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.topSection}>
        <div className={styles.titleSection}>
          <div className={styles.titleContainer}>
            <h2>Dashboard</h2>
            <p>Welcome back, {user.name}!</p>
          </div>
          <div className={styles.searchContainer}>
            <img src="" alt="" />
            <input type="text" placeholder="Search..." className={styles.searchInput} />
          </div>
        </div>
        <div className={styles.summerySection}>
          <div className={styles.revenueContainer}>
            <div className={styles.contentContainer}>
              <h3 className={styles.summeryTitle}>Revenue</h3>
              <p className={styles.summeryValue}>$10,000</p>
              <p className={styles.summeryMessage}>+10% from last month</p>
            </div>
            <div className={styles.imgContainer}>
              <img src="" alt="" />
            </div>
          </div>
          <div className={styles.orderContainer}>
            <div className={styles.contentContainer}>
              <h3 className={styles.summeryTitle}>Orders</h3>
              <p className={styles.summeryValue}>100</p>
              <p className={styles.summeryMessage}>+5% from last month</p>
            </div>
            <div className={styles.imgContainer}>
              <img src="" alt="" />
            </div>
          </div>
          <div className={styles.complaintsContainer}>
            <div className={styles.contentContainer}>
              <h3 className={styles.summeryTitle}>Complaints</h3>
              <p className={styles.summeryValue}>10</p>
              <p className={styles.summeryMessage}>-2% from last month</p>
            </div>
            <div className={styles.imgContainer}>
              <img src="" alt="" />
            </div>
          </div>
        </div>
        <div className={styles.orderStatusSection}>
          <div className={styles.firstContainer}>
            <h3 className={styles.statusTitle}>Order Status</h3>
          </div>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.ordersListSection}></div>
      </div>
    </div>
  )
}

export default Dashboard