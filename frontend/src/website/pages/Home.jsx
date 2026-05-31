import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  FileText, 
  Signature, 
  ShieldCheck, 
  Building2
} from 'lucide-react';
import styles from './styles/home.module.css';
import heroImage from '../../assets/hero.png';
import logoFull from '../../assets/logo_full.svg';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Vyess - Become a Vendor Partner";
  }, []);

  const onboardingSteps = [
    {
      step: '01',
      title: 'Business Registration',
      description: 'Fill in your basic company details, bank account details, and services you specialize in.',
      icon: <Building2 style={{color: '#2563eb', width: '24px', height: '24px'}} />
    },
    {
      step: '02',
      title: 'Verification Documents',
      description: 'Upload scanned copies of Aadhaar, PAN card, and optional GST certificates to establish trust.',
      icon: <FileText style={{color: '#4f46e5', width: '24px', height: '24px'}} />
    },
    {
      step: '03',
      title: 'Digital Agreement',
      description: 'Instantly view a legally drafted partnership agreement tailored to your service category.',
      icon: <ShieldCheck style={{color: '#10b981', width: '24px', height: '24px'}} />
    },
    {
      step: '04',
      title: 'Secure Signature',
      description: 'Digitally sign the agreement using drawing or text signature options to complete onboarding.',
      icon: <Signature style={{color: '#7c3aed', width: '24px', height: '24px'}} />
    }
  ];

  return (
    <div className={styles.homeWrapper}>
      
      {/* Navigation Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logoSection} onClick={() => navigate('/')}>
            <img src={logoFull} alt="Vyess FMS Logo" className={styles.logoImage} />
          </div>
          <div style={{width: '20px'}}></div> {/* Placeholder spacing */}
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          
          {/* Left Content */}
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Grow Your Service <br />
              <span className={styles.gradientText}>
                Business with Vyess
              </span>
            </h1>

            <p className={styles.heroDescription}>
              Join India's premium facility management platform. Register as a service provider, complete digital verification, and start receiving service orders in your area.
            </p>

            <div className={styles.heroActions}>
              <button
                id="hero-cta-btn"
                onClick={() => navigate('/register')}
                className={styles.heroCtaBtn}
              >
                Become a Vendor
                <ArrowRight style={{width: '20px', height: '20px'}} />
              </button>
              <a
                href="#how-it-works"
                className={styles.heroSecondaryBtn}
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right Content: Cleaning / FMS Work Image */}
          <div className={styles.heroImageWrapper}>
            <img src={heroImage} alt="Cleaning and FMS Services" className={styles.heroImage} />
          </div>

        </div>
      </section>

      {/* Onboarding Roadmap Section */}
      <section id="how-it-works" className={styles.roadmapSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2>Process Flow</h2>
            <h3>4 Steps to Become a Partner</h3>
            <p>Our digital partner verification system is automated, quick, and hassle-free.</p>
          </div>

          <div className={styles.roadmapGrid}>
            {onboardingSteps.map((item, index) => (
              <div 
                key={index} 
                className={styles.roadmapCard}
              >
                <div className={styles.stepNumber}>
                  {item.step}
                </div>
                <div className={styles.roadmapCardContent}>
                  <div className={styles.roadmapIcon}>
                    {item.icon}
                  </div>
                  <h4 className={styles.roadmapCardTitle}>{item.title}</h4>
                  <p className={styles.roadmapCardDesc}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA Section */}
      <section className={styles.footerCtaSection}>
        <div className={styles.footerCtaContainer}>
          <h3 className={styles.footerCtaTitle}>
            Ready to Take Your Business to the Next Level?
          </h3>
          <p className={styles.footerCtaDesc}>
            Apply today and start receiving confirmed bookings within days. No registry fees, no security deposit required.
          </p>
          <button
            id="footer-cta-btn"
            onClick={() => navigate('/register')}
            className={styles.footerCtaBtn}
          >
            <span>Get Started Now</span>
            <ArrowRight style={{width: '20px', height: '20px'}} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerLogoSection}>
            <img src={logoFull} alt="Vyess FMS Logo" className={styles.footerLogoImage} />
          </div>
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
          <p className={styles.footerCopyright}>
            &copy; {new Date().getFullYear()} Vyess Facility Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;