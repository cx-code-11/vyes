import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CheckCircle } from 'lucide-react';
import styles from './styles/vendorApproved.module.css';

export function VendorApproved() {
  return (
    <div className={styles.pageWrapper}>
      <Card className={styles.cardOverride}>
        <CardContent className={styles.contentBox}>
          <div className={styles.iconWrapper}>
            <div className={styles.iconCircle}>
              <CheckCircle className={styles.checkIcon} />
            </div>
          </div>
          <h1 className={styles.pageTitle}>You're Approved!</h1>
          <p className={styles.description}>
            Welcome to the Vyess FMS network. Your account is now fully active.
          </p>
          <Button size="lg" className={styles.portalBtn}>
            Access Partner Portal
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
