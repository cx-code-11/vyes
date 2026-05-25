import React from 'react';
import styles from '../styles/card.module.css';

export function Card({ children, className = '', ...props }) {
  return (
    <div className={`${styles.card} ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ title, description, className = '' }) {
  return (
    <div className={`${styles.cardHeader} ${className}`}>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}

export function CardContent({ children, className = '' }) {
  return (
    <div className={`${styles.cardContent} ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '' }) {
  return (
    <div className={`${styles.cardFooter} ${className}`}>
      {children}
    </div>
  );
}