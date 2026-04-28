import React from 'react'
import backBtn from '../assets/icon-backBtn.png'

import styles from './styles/service.module.css'

const Service = () => {
  return (
    <div className={styles.serviceWrapper}>
        <div className={styles.backBtnContainer}>
            <img src={backBtn} alt="Back" />
            <p> Back to Category</p>
        </div>
        <h2 className={styles.title}>Bathroom Cleaning</h2>
        <div className={styles.mainContent}>
            <div className={styles.mainContentLeft}>
                <div className={styles.imgContainer}>
                    <img src="" alt="Bathroom Cleaning" />
                </div>
                <div className={styles.badgeContainer}>
                    <div className={styles.verifyContainer}>
                        <img src="" alt="" />
                        <p>Verified Experts</p>
                    </div>
                    <div className={styles.onTimeContainer}>
                        <img src="" alt="" />
                        <p>On-Time Service</p>
                    </div>
                    <div className={styles.rateContainer}>
                        <img src="" alt="" />
                        <p>4.8 Rating</p>
                    </div>
                </div>
            </div>

            <div className={styles.mainContentRight}>
                <div className={styles.priceContainer}>
                    <p>Starting from</p>
                    <p>~ ₹499/-</p>
                </div>
                <p className={styles.priceCautionMessage}><img src="" alt="!" /> Final price will be confirmed after we review your requirements and images.</p>
                
                <div className={styles.modeContainer}>
                    <div className={styles.subTitle}>
                        <h3>Select Service Type</h3>
                        <img src="" alt="(!)" />
                    </div>
                    <div className={styles.modesList}>
                        <div className={styles.mode}>Normal Cleaning</div>
                        <div className={styles.mode}>Medium Cleaning</div>
                        <div className={styles.mode}>Deep Cleaning</div>
                        <div className={styles.mode}>Monthly Package</div>
                    </div>
                </div>
                
                <div className={styles.mode2Container}>
                    <div className={styles.subTitle}>
                        <h3>Select Service Type</h3>
                        <img src="" alt="(!)" />
                    </div>
                    <div className={styles.modesList}>
                        <div className={styles.mode}>
                            <p className={styles.subTitle}>Small Bathroom</p>
                            <p className='description'>around 50 sq.ft</p>
                        </div>
                        <div className={styles.mode}>
                            <p className={styles.subTitle}>Small Bathroom</p>
                            <p className='description'>around 50 sq.ft</p>
                        </div>
                        <div className={styles.mode}>
                            <p className={styles.subTitle}>Small Bathroom</p>
                            <p className='description'>around 50 sq.ft</p>
                        </div>
                        <div className={styles.mode}>
                            <p className={styles.subTitle}>Small Bathroom</p>
                            <p className='description'>around 50 sq.ft</p>
                        </div>
                    </div>
                </div>

                <div className={styles.uploadImgWrapper}>
                    <div className={styles.subTitle}>
                        <h3>Select Service Type</h3>
                        <p className={styles.subText}>Upload photos or a short video of the area for accurate pricing</p>
                    </div>
                    <div className={styles.uploadBox}>
                        <div className={styles.uploadImgContainer}>
                            <img src="" alt="" />
                        </div>
                        <p className={styles.subText}>Drag & drop photos or video here, or click to browse</p>
                        <p className={styles.italicText}>Photos or videos help us provide accurate quotation</p>
                        <div className={styles.uploadBtn}>
                            <div className="uploadImgContainer">
                                <img src="" alt="" />
                            </div>
                            <p>Browse Files</p>
                        </div>
                    </div>
                </div>

                <div className={styles.noteContainer}>
                    <div className={styles.subTitle}>
                        <h3>{`Requirement (optional)`}</h3>
                    </div>
                    <input type="text" name="" id="" />
                </div>

                <button>Add to Cart</button>
                <p>By proceeding, you agree to our Terms of Service</p>

            </div>
        </div>
    </div>
  )
}

export default Service