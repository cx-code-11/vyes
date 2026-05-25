import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import styles from './styles/verificationPending.module.css';

export function VerificationPending() {
  const navigate = useNavigate();

  return (
    <div className={styles.pageWrapper}>
      <Card>
        <CardContent className={styles.contentBox}>
          <div className={styles.iconWrapper}>
            <div className={styles.iconCircleCompleted}>
              <CheckCircle className={styles.checkIcon} />
            </div>
          </div>
          <h1 className={styles.pageTitle}>
            Vendor Onboarding Completed<span className={styles.greenExclamation}>!</span>
          </h1>
          <p className={styles.description}>
            Thank you for completing your onboarding. Your profile and documents are currently under review by our admin team.
          </p>
          <div className={styles.nextStepsBox}>
            <h3 className={styles.nextStepsTitle}>What happens next?</h3>
            <ul className={styles.nextStepsList}>
              <li className={styles.nextStepsListItem}>Our team will verify your KYC documents within 24-48 hours.</li>
              <li className={styles.nextStepsListItem}>You will receive an email notification once approved.</li>
              <li className={styles.nextStepsListItem}>If any additional information is required, we will reach out to you.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
