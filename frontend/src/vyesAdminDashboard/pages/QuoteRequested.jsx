import React from 'react'

import iconSearch from '../assets/icon-dashboardSearch.svg';
import iconCreateManualOrder from '../assets/icon-createManualOrder.svg';

import styles from './styles/quoteRequested.module.css';

const QuoteRequested = () => {
  return (
    <div className={styles.quoteRequestedWrapper}>
      <div className={styles.topContainer}>
        <div className={styles.titleSection}>
          <div className={styles.titleContainer}>
            <h2>Quotation Requested</h2>
            <p>Track and manage orders through their entire lifecycle.</p>
          </div>
          <div className={styles.titleLeftSideContainer}>
            <div className={styles.titleButtonContainer}>
              <div className="titleButtonImgContainer">
                <img src={iconCreateManualOrder} alt="Create Manual Order" />
              </div>
              <p>Create Manual Order</p>
            </div>
            <div className={styles.searchContainer}>
              <img src={iconSearch} alt="search" />
              <input type="search" placeholder="Search..." className={styles.searchInput} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.orderListWrapper}>
        <div className={styles.orderListContainer}>

          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Service</th>
                <th>Date & Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><p className={styles.idText}>ORD-8546</p></td>
                <td>John Doe jhgfch buchgfvbj</td>
                <td>Plumbing</td>
                <td>2024-06-15<br></br> 14:30</td>
                <td><button className={styles.actionButton}>Generate Quote</button></td>
              </tr>
              <tr>
                <td><p className={styles.idText}>ORD-12345</p></td>
                <td>John Doe</td>
                <td>Plumbing</td>
                <td>2024-06-15<br></br> 14:30</td>
                <td><button className={styles.actionButton}>Generate Quote</button></td>
              </tr>
              <tr>
                <td><p className={styles.idText}>ORD-12345</p></td>
                <td>John Doe</td>
                <td>Plumbing</td>
                <td>2024-06-15<br></br> 14:30</td>
                <td><button className={styles.actionButton}>Generate Quote</button></td>
              </tr>
              <tr>
                <td><p className={styles.idText}>ORD-12345</p></td>
                <td>John Doe</td>
                <td>Plumbing</td>
                <td>2024-06-15<br></br> 14:30</td>
                <td><button className={styles.actionButton}>Generate Quote</button></td>
              </tr>
              <tr>
                <td><p className={styles.idText}>ORD-12345</p></td>
                <td>John Doe</td>
                <td>Plumbing</td>
                <td>2024-06-15<br></br> 14:30</td>
                <td><button className={styles.actionButton}>Generate Quote</button></td>
              </tr>
              <tr>
                <td><p className={styles.idText}>ORD-12345</p></td>
                <td>John Doe</td>
                <td>Plumbing</td>
                <td>2024-06-15<br></br> 14:30</td>
                <td><button className={styles.actionButton}>Generate Quote</button></td>
              </tr>
              <tr>
                <td><p className={styles.idText}>ORD-12345</p></td>
                <td>John Doe</td>
                <td>Plumbing</td>
                <td>2024-06-15<br></br> 14:30</td>
                <td><button className={styles.actionButton}>Generate Quote</button></td>
              </tr>
              <tr>
                <td><p className={styles.idText}>ORD-12345</p></td>
                <td>John Doe</td>
                <td>Plumbing</td>
                <td>2024-06-15<br></br> 14:30</td>
                <td><button className={styles.actionButton}>Generate Quote</button></td>
              </tr>
              <tr>
                <td><p className={styles.idText}>ORD-12345</p></td>
                <td>John Doe</td>
                <td>Plumbing</td>
                <td>2024-06-15<br></br> 14:30</td>
                <td><button className={styles.actionButton}>Generate Quote</button></td>
              </tr>
              <tr>
                <td><p className={styles.idText}>ORD-12345</p></td>
                <td>John Doe</td>
                <td>Plumbing</td>
                <td>2024-06-15<br></br> 14:30</td>
                <td><button className={styles.actionButton}>Generate Quote</button></td>
              </tr>
              <tr>
                <td><p className={styles.idText}>ORD-12345</p></td>
                <td>John Doe</td>
                <td>Plumbing</td>
                <td>2024-06-15<br></br> 14:30</td>
                <td><button className={styles.actionButton}>Generate Quote</button></td>
              </tr>
              <tr>
                <td><p className={styles.idText}>ORD-12345</p></td>
                <td>John Doe</td>
                <td>Plumbing</td>
                <td>2024-06-15<br></br> 14:30</td>
                <td><button className={styles.actionButton}>Generate Quote</button></td>
              </tr>
              <tr>
                <td><p className={styles.idText}>ORD-12345</p></td>
                <td>John Doe</td>
                <td>Plumbing</td>
                <td>2024-06-15<br></br> 14:30</td>
                <td><button className={styles.actionButton}>Generate Quote</button></td>
              </tr>
              <tr>
                <td><p className={styles.idText}>ORD-12345</p></td>
                <td>John Doe</td>
                <td>Plumbing</td>
                <td>2024-06-15<br></br> 14:30</td>
                <td><button className={styles.actionButton}>Generate Quote</button></td>
              </tr>
              <tr>
                <td><p className={styles.idText}>ORD-12345</p></td>
                <td>John Doe</td>
                <td>Plumbing</td>
                <td>2024-06-15<br></br> 14:30</td>
                <td><button className={styles.actionButton}>Generate Quote</button></td>
              </tr>
              <tr>
                <td><p className={styles.idText}>ORD-12345</p></td>
                <td>John Doe</td>
                <td>Plumbing</td>
                <td>2024-06-15<br></br> 14:30</td>
                <td><button className={styles.actionButton}>Generate Quote</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default QuoteRequested