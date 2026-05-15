import React from 'react'

import iconBack from '../assets/icon-backArrowInBlack.svg';
import iconSend from '../assets/icon-sendWhite.svg';

import QuotePanel from '../components/QuotePanel';

import styles from './styles/reviewQuoteRequest.module.css';

const reviewQuoteRequest = () => {
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
        <div className={styles.contentContainer}>
            <QuotePanel />

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