import React from 'react';
import { Check } from 'lucide-react';
import styles from './styles/stepIndicator.module.css';

export function StepIndicator({ steps, currentStep }) {
  return (
    <nav aria-label="Progress" className={styles.progressNav}>
      <ol role="list" className={styles.stepList}>
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <li key={step.name} className={styles.stepItem}>
              <div className={`
                ${styles.stepBlock}
                ${isCompleted ? styles.stepBlockCompleted : isCurrent ? styles.stepBlockCurrent : ''}
              `}>
                <span className={`
                  ${styles.stepNumber}
                  ${isCompleted || isCurrent ? styles.stepNumberCurrent : ''}
                `}>
                  Step {index + 1}
                </span>
                <span className={styles.stepName}>
                  {step.name}
                  {isCompleted && <Check className="w-4 h-4 text-blue-600" />}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
