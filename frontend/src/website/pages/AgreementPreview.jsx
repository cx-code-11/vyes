import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { Card, CardContent, CardHeader, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StepIndicator } from '../components/StepIndicator';
import agreementPdf from '../assets/VYESSFMS_Vendor_Agreement.pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import styles from './styles/agreementPreview.module.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const steps = [
  { name: 'Registration' },
  { name: 'Documents' },
  { name: 'Agreement' },
  { name: 'Sign' }
];

export function AgreementPreview() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [vendorData, setVendorData] = useState(null);
  const [accepted, setAccepted] = useState(false);
  const [hasFullyViewedPdf, setHasFullyViewedPdf] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [previewError, setPreviewError] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('vendorData');
    if (data) {
      setVendorData(JSON.parse(data));
    }
  }, []);

  const checkFullView = () => {
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      setHasFullyViewedPdf(true);
    }
  };

  useEffect(() => {
    if (!hasFullyViewedPdf) {
      setAccepted(false);
    }
  }, [hasFullyViewedPdf]);

  const handleContinue = () => {
    if (accepted) {
      navigate('/sign');
    }
  };

  if (!vendorData) return <div>Loading...</div>;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.headerSection}>
        <h1 className={styles.pageTitle}>Service Agreement</h1>
        <p className={styles.pageSubtitle}>Please review the master service agreement generated for your company.</p>
      </div>

      <div className={styles.stepsContainer}>
        <StepIndicator steps={steps} currentStep={2} />
      </div>

      <Card>
        <CardHeader
          title="Agreement Preview"
          description="Read carefully before accepting"
          className="bg-slate-50"
        />
        <CardContent className={styles.contentWrapper}>
          <div className={styles.tcBox}>
            <div className={styles.tcHeader}>
              <div>
                <p className={styles.pdfTitle}>VYESSFMS_Vendor_Agreement.pdf</p>
                <p className={styles.pdfDescription}>Scroll to the bottom of the last page to enable the agreement acceptance checkbox.</p>
              </div>
              <span className={`
                ${styles.viewStatusBadge}
                ${hasFullyViewedPdf ? styles.badgeStatusComplete : styles.badgeStatusPending}
              `}>
                {hasFullyViewedPdf ? 'Full PDF viewed' : 'Scroll to complete'}
              </span>
            </div>

            <div className={styles.pdfViewerWrapper}>
              <div
                ref={scrollContainerRef}
                onScroll={checkFullView}
                className={styles.scrollContainer}
              >
                <Document
                  file={agreementPdf}
                  onLoadSuccess={({ numPages: loadedPages }) => {
                    setNumPages(loadedPages);
                    setPreviewError(false);
                  }}
                  onLoadError={() => setPreviewError(true)}
                  loading={
                    <div className="p-6 text-sm text-slate-500">
                      Loading agreement PDF...
                    </div>
                  }
                >
                  {Array.from(new Array(numPages || 0), (_, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      width={595}
                      renderTextLayer
                      renderAnnotationLayer
                    />
                  ))}
                </Document>
              </div>
            </div>

            {previewError ? (
              <p className={styles.errorMessage}>
                The PDF preview could not be loaded in this browser. Please refresh the page and try again.
              </p>
            ) : null}
          </div>

          <div className={styles.checkboxContainer}>
            <div className={styles.checkboxWrapper}>
              <input
                id="accept"
                name="accept"
                type="checkbox"
                className={styles.checkboxInput}
                checked={accepted}
                disabled={!hasFullyViewedPdf}
                onChange={(event) => setAccepted(event.target.checked)}
              />
            </div>
            <div>
              <label htmlFor="accept" className={styles.checkboxLabel}>
                I, <span className={styles.labelName}>{vendorData.contactPerson}</span>, authorized representative of <span className={styles.labelName}>{vendorData.companyName || vendorData.businessName}</span>, have read and agree to the terms and conditions outlined in this agreement.
              </label>
              <p className={styles.checkboxHelpText}>
                {hasFullyViewedPdf
                  ? 'You can now accept the agreement and continue.'
                  : 'Please scroll through the entire PDF before checking this box.'}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <Button variant="outline" onClick={() => navigate('/upload')}>
            Back
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!accepted}
            size="lg"
          >
            Proceed to Sign
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
