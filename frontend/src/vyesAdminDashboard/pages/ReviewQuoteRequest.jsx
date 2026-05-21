import React, { useEffect, useState } from 'react'

import iconBack from '../assets/icon-backArrowInBlack.svg';
import iconSend from '../assets/icon-sendWhite.svg';

import QuotePanel from '../components/QuotePanel';

import styles from './styles/reviewQuoteRequest.module.css';

const reviewQuoteRequest = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/vendor-registration`);
        const data = await response.json();
        if (!response.ok) {
          setError(data.error || 'Unable to load registration requests');
          return;
        }
        setRequests(data);
        setSelectedRequest(data[0] || null);
      } catch (err) {
        console.error('Error loading registration requests:', err);
        setError('Unable to load registration requests');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [apiBaseUrl]);

  return (
    <div className={styles.reviewQuoteRequestWrapper}>
        <div className={styles.reviewQuoteRequestContainer}>

        <div className={styles.topContainer}>
            <div className={styles.backButtonContainer}>
                <div className={styles.backImgContainer}>
                    <img src={iconBack} alt="back" />
                </div>
                <p> Back</p>
            </div>
            <h2>Review & Quote Request</h2>
        </div>
        {loading && <p className={styles.loadingText}>Loading registration requests...</p>}
        {error && <p className={styles.errorText}>{error}</p>}
        <div className={styles.contentContainer}>
            <div className={styles.requestListWrapper}>
              <h3>Pending Registrations</h3>
              {requests.length === 0 && !loading ? (
                <p>No registration requests available yet.</p>
              ) : (
                <ul className={styles.requestList}>
                  {requests.map((request) => (
                    <li
                      key={request.id}
                      className={`${styles.requestListItem} ${selectedRequest?.id === request.id ? styles.requestListItemActive : ''}`}
                      onClick={() => setSelectedRequest(request)}
                    >
                      <p className={styles.requestTitle}>{request.businessName}</p>
                      <p className={styles.requestMeta}>{request.contactPerson}</p>
                      <p className={styles.requestMeta}>ID: {request.uiId}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <QuotePanel request={selectedRequest} />

            <div className={styles.genrateQuotationWrapper}>
                <div className={styles.captionContainer}>
                    <p>Generate Quotation</p>
                </div>
                <div className={styles.quotationAmountContainer}>
                    <p className={styles.subTitle}>{"Quotation Amount (₹)"}</p>
                    <input type="number" />
                </div>
                <div className={styles.quotationNoteContainer}>
                    <p className={styles.subTitle}>Quotation Note</p>
                    <textarea name="quotationNote" id="quotationNote" cols="30" rows="10"></textarea>
                </div>
                <div className={styles.quotationSummeryWrapper}>

                <div className={styles.quotationSummeryContainer}>
                    <div className={styles.baseAmountContainer}>
                        <p className={styles.baseAmountLabel}>Base Amount</p>
                        <p className={styles.baseAmountValue}>₹ 0</p>
                    </div>
                    <div className={styles.gstContainer}>
                        <p className={styles.gstLabel}>GST (18%)</p>
                        <p className={styles.gstValue}>₹ 0</p>
                    </div>
                    <div className={styles.summeryTotalContainer}>
                        <p className={styles.totalLabel}>Total:</p>
                        <p className={styles.totalValue}>₹ 0</p>
                    </div>
                </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.rejectButton}>Reject</button>
                    <div className={styles.sendButtonContainer}>
                        <div className={styles.sendImgWrapper}>
                            <img src={iconSend} alt="send" />
                        </div>
                        <p>Send Quote</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default reviewQuoteRequest