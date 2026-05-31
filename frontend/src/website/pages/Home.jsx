import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import styles from './styles/home.module.css';
import comingSoonBG from '../assets/commingSoonBG.png';
import logoMini from '../../assets/logo_mini.svg';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Vyess - Launching Soon";
  }, []);

  return (
    <div className={styles.comingSoonWrapper} style={{ backgroundImage: `url(${comingSoonBG})` }}>
      <div className={styles.comingSoonCard}>
        {/* logo */}
        <img src={logoMini} alt="Vyess Logo" className={styles.comingSoonLogo} />

        {/* content */}
        <h1 className={styles.comingSoonTitle}>We are creating something amazing</h1>
        <p className={styles.comingSoonSubtitle}>We will launch our website soon!</p>

        {/* Vendor registration CTA */}
        <button
          onClick={() => navigate('/register')}
          className={styles.comingSoonBtn}
        >
          <span>Become a Vendor</span>
          <ArrowRight style={{ width: '20px', height: '20px' }} />
        </button>

        {/* social */}
        <h2 className={styles.socialTitle}>Follow our social media</h2>
        <div className={styles.socialLinks}>
          <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook">
            <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
            <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Twitter">
            <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
            </svg>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="YouTube">
            <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;