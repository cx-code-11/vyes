import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignatureCanvas } from '../components/SignatureCanvas';
import { PDFDocument, rgb } from 'pdf-lib';
import { Card, CardContent, CardHeader, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StepIndicator } from '../components/StepIndicator';
import { Eraser, Download } from 'lucide-react';
import companySignatureImg from '../assets/vyessfms_signature.jpg';
import companySealImg from '../assets/vyessfms_seal.png';
import { makeImageTransparent } from '../utils/imageHelpers';
import styles from './styles/digitalSignature.module.css';

const steps = [
  { name: 'Registration' },
  { name: 'Documents' },
  { name: 'Agreement' },
  { name: 'Sign' }
];

const agreementPdfUrl = new URL('../assets/VYESSFMS_Vendor_Agreement.pdf', import.meta.url).href;
const apiBaseUrl = typeof import.meta.env.VITE_API_BASE_URL !== 'undefined' ? import.meta.env.VITE_API_BASE_URL : 'http://localhost:3000';

export function DigitalSignature() {
  const navigate = useNavigate();
  const sigCanvas = useRef(null);
  const [timestamp, setTimestamp] = useState('');
  const [vendorData, setVendorData] = useState({});
  const [businessName, setBusinessName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const vendorName = businessName || vendorData.businessName || vendorData.companyName || 'Vendor';

  useEffect(() => {
    const data = localStorage.getItem('vendorData');
    if (data) {
      const parsedData = JSON.parse(data);
      setVendorData(parsedData);
      setBusinessName(parsedData.businessName || parsedData.companyName || '');
    }
    setTimestamp(new Date().toLocaleString());
  }, []);

  // Signature canvas resize and rendering are handled natively inside the SignatureCanvas component.

  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  const generatePDF = async () => {
    if (!sigCanvas.current || sigCanvas.current.isEmpty()) {
      alert('Please provide a signature first.');
      return;
    }

    if (!businessName.trim()) {
      alert('Please enter your Vendor Full Name / Business Name.');
      return;
    }

    setIsGenerating(true);

    try {
      const sigDataUrl = sigCanvas.current.getCanvas().toDataURL('image/png');
      const response = await fetch(agreementPdfUrl);
      if (!response.ok) throw new Error('Failed to load agreement PDF');
      const pdfBytes = await response.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pages = pdfDoc.getPages();
      const lastPage = pages[pages.length - 1];
      const { width, height } = lastPage.getSize();

      // Convert company signature and seal to transparent PNGs
      const transparentSigCompany = await makeImageTransparent(companySignatureImg);
      const transparentSealCompany = await makeImageTransparent(companySealImg);

      // Draw company signature
      const sigBytesCompany = Uint8Array.from(atob(transparentSigCompany.split(',')[1]), (c) => c.charCodeAt(0));
      const sigImageCompany = await pdfDoc.embedPng(sigBytesCompany);
      lastPage.drawImage(sigImageCompany, {
        x: 100,
        y: 508,
        width: 100,
        height: 28,
      });

      // Draw company seal
      const sealBytesCompany = Uint8Array.from(atob(transparentSealCompany.split(',')[1]), (c) => c.charCodeAt(0));
      const sealImageCompany = await pdfDoc.embedPng(sealBytesCompany);
      lastPage.drawImage(sealImageCompany, {
        x: 90,
        y: 315,
        width: 90,
        height: 90,
      });

      // Draw vendor signature image (centered on signature line)
      const signatureBytes = Uint8Array.from(atob(sigDataUrl.split(',')[1]), (char) => char.charCodeAt(0));
      const signatureImage = await pdfDoc.embedPng(signatureBytes);
      lastPage.drawImage(signatureImage, {
        x: 355,
        y: height - 273,
        width: 100,
        height: 28,
      });

      // Draw name (centered on name line)
      lastPage.drawText(vendorName, {
        x: 355,
        y: height - 330,
        size: 12,
        color: rgb(0.2, 0.2, 0.2),
      });

      // Draw date/time (on Date line)
      lastPage.drawText(timestamp, {
        x: 100,
        y: height - 385,
        size: 11,
        color: rgb(0.2, 0.2, 0.2),
      });
      
      lastPage.drawText(timestamp, {
        x: 355,
        y: height - 425,
        size: 11,
        color: rgb(0.2, 0.2, 0.2),
      });

      // Save and upload as before
      const updatedPdfBytes = await pdfDoc.save();
      const pdfBlob = new Blob([updatedPdfBytes], { type: 'application/pdf' });
      const formData = new FormData();
      formData.append('agreement', pdfBlob, 'VYESSFMS_Vendor_Agreement.pdf');

      const responseUpload = await fetch(`${apiBaseUrl}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!responseUpload.ok) {
        throw new Error('Upload failed');
      }

      const data = await responseUpload.json();

      const vendorDataToUpdate = JSON.parse(localStorage.getItem('vendorData') || '{}');
      vendorDataToUpdate.documentUrls = {
        ...vendorDataToUpdate.documentUrls,
        signedAgreementUrl: data.urls.agreement,
      };
      localStorage.setItem('vendorData', JSON.stringify(vendorDataToUpdate));

      const vendorRegistrationId = localStorage.getItem('vendorRegistrationId');
      if (vendorRegistrationId) {
        await fetch(`${apiBaseUrl}/vendor-registration/${vendorRegistrationId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ agreementUrl: data.urls.agreement })
        });
      }

      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(pdfBlob);
      downloadLink.download = 'VYESSFMS_Vendor_Agreement.pdf';
      downloadLink.click();
      URL.revokeObjectURL(downloadLink.href);

      setTimeout(() => {
        navigate('/pending');
      }, 1500);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
      setIsGenerating(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.headerSection}>
        <h1 className={styles.pageTitle}>Digital Signature</h1>
        <p className={styles.pageSubtitle}>Review the agreement and place your signature below.</p>
      </div>

      <div className={styles.stepsContainer}>
        <StepIndicator steps={steps} currentStep={3} />
      </div>

      <Card>
        <CardHeader
          title="Sign Agreement"
          description="Review the PDF and complete the signature fields below"
        />
        <CardContent className={styles.contentWrapper}>
          <div className={styles.infoBox}>
            <div className={styles.infoFlex}>
              <div>
                <p className={styles.pdfTitle}>VYESSFMS_Vendor_Agreement.pdf</p>
                <p className={styles.pdfSubTitle}>The signed copy will be generated from the official agreement PDF when you click Sign & Download PDF.</p>
              </div>
              <span className={styles.badge}>
                Official PDF
              </span>
            </div>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.cardSection}>
              <label htmlFor="businessName" className={styles.fieldLabel}>
                Vendor Full Name / Business Name - name
              </label>
              <input
                id="businessName"
                type="text"
                value={businessName}
                onChange={(event) => setBusinessName(event.target.value)}
                placeholder="Enter your full business name"
                className={styles.textInput}
              />
              <p className={styles.helpText}>
                This name will be used in the signed agreement.
              </p>
            </div>

            <div className={styles.cardSection}>
              <p className={styles.fieldLabel}>Vendor / Service Provider - signature</p>
              <div className={styles.signatureBox}>
                <SignatureCanvas
                  ref={sigCanvas}
                  className={styles.canvasWrapper}
                  backgroundColor="rgb(255, 255, 255)"
                />
              </div>
              <p className={styles.helpText}>
                Draw your signature in the space above.
              </p>
            </div>
          </div>

          <div className={styles.controlRow}>
            <Button variant="ghost" size="sm" onClick={clearSignature} className={styles.clearBtn}>
              <Eraser className={styles.eraserIcon} />
              Clear Signature
            </Button>

            <div className={styles.signerDetails}>
              <p>Signer: <strong>{vendorData.contactPerson || 'Pending'}</strong></p>
              <p>Time: {timestamp}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className={styles.cardFooter}>
          <Button variant="outline" onClick={() => navigate('/agreement')}>
            Back
          </Button>
          <Button
            onClick={generatePDF}
            size="lg"
            disabled={isGenerating}
            className={styles.submitBtn}
          >
            {isGenerating ? 'Processing...' : (
              <>
                <Download className={styles.downloadIcon} />
                Sign & Download PDF
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
