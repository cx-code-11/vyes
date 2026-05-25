import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { Card, CardContent, CardHeader, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StepIndicator } from '../components/StepIndicator';
import { PDFDocument } from 'pdf-lib';
import agreementPdf from '../assets/VYESSFMS_Vendor_Agreement.pdf';
import companySignatureImg from '../assets/vyessfms_signature.jpg';
import companySealImg from '../assets/vyessfms_seal.jpg';
import { makeImageTransparent } from '../utils/imageHelpers';

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
  const [containerWidth, setContainerWidth] = useState(595);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('vendorData');
    if (data) {
      setVendorData(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    const preparePdf = async () => {
      try {
        const response = await fetch(agreementPdf);
        const pdfBytes = await response.arrayBuffer();
        const pdfDoc = await PDFDocument.load(pdfBytes);
        
        // Convert signature and seal to transparent PNGs
        const transparentSig = await makeImageTransparent(companySignatureImg);
        const transparentSeal = await makeImageTransparent(companySealImg);
        
        const pages = pdfDoc.getPages();
        const lastPage = pages[pages.length - 1];
        const { height } = lastPage.getSize();
        
        // Draw company signature
        const sigSigBytes = Uint8Array.from(atob(transparentSig.split(',')[1]), (c) => c.charCodeAt(0));
        const sigImage = await pdfDoc.embedPng(sigSigBytes);
        lastPage.drawImage(sigImage, {
          x: 100,
          y: 508,
          width: 100,
          height: 28,
        });
        
        // Draw company seal
        const sealBytes = Uint8Array.from(atob(transparentSeal.split(',')[1]), (c) => c.charCodeAt(0));
        const sealImage = await pdfDoc.embedPng(sealBytes);
        lastPage.drawImage(sealImage, {
          x: 100,
          y: 315,
          width: 60,
          height: 60,
        });
        
        const savedBytes = await pdfDoc.save();
        setPdfFile({ data: savedBytes });
      } catch (err) {
        console.error("Error embedding company details into preview PDF:", err);
        setPdfFile(agreementPdf); // fallback to raw template
      }
    };
    
    preparePdf();
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleResize = (entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        const paddedWidth = Math.max(width - 32, 280);
        setContainerWidth(Math.min(paddedWidth, 595));
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const initialWidth = container.getBoundingClientRect().width;
    setContainerWidth(Math.min(Math.max(initialWidth - 32, 280), 595));

    return () => {
      resizeObserver.disconnect();
    };
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
          className={styles.cardHeader}
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
                {pdfFile ? (
                  <Document
                    file={pdfFile}
                    onLoadSuccess={({ numPages: loadedPages }) => {
                      setNumPages(loadedPages);
                      setPreviewError(false);
                    }}
                    onLoadError={() => setPreviewError(true)}
                    loading={
                      <div className={styles.loadingText}>
                        Loading agreement PDF...
                      </div>
                    }
                  >
                    {Array.from(new Array(numPages || 0), (_, index) => (
                      <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        width={containerWidth}
                        renderTextLayer
                        renderAnnotationLayer
                      />
                    ))}
                  </Document>
                ) : (
                  <div className={styles.loadingText}>
                    Preparing agreement document...
                  </div>
                )}
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
        <CardFooter className={styles.cardFooter}>
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
