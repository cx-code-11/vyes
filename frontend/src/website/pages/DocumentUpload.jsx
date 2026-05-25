import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StepIndicator } from '../components/StepIndicator';
import { Upload, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import styles from './styles/documentUpload.module.css';

const steps = [
  { name: 'Registration' },
  { name: 'Documents' },
  { name: 'Agreement' },
  { name: 'Sign' }
];

const apiBaseUrl = typeof import.meta.env.VITE_API_BASE_URL !== 'undefined' ? import.meta.env.VITE_API_BASE_URL : 'http://localhost:3000';

export function DocumentUpload() {
  const navigate = useNavigate();
  const [files, setFiles] = useState({
    aadhaar: null,
    pan: null,
    gst: null
  });
  const [previewUrls, setPreviewUrls] = useState({
    aadhaar: null,
    pan: null,
    gst: null
  });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const nextPreviewUrls = {
      aadhaar: null,
      pan: null,
      gst: null
    };

    const createdUrls = [];

    Object.entries(files).forEach(([type, file]) => {
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        nextPreviewUrls[type] = previewUrl;
        createdUrls.push(previewUrl);
      }
    });

    setPreviewUrls(nextPreviewUrls);

    return () => {
      createdUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  const handleFileChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      setFiles((prevFiles) => ({ ...prevFiles, [type]: e.target.files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const formData = new FormData();
      if (files.aadhaar) formData.append('aadhaar', files.aadhaar);
      if (files.pan) formData.append('pan', files.pan);
      if (files.gst) formData.append('gst', files.gst);

      const response = await fetch(`${apiBaseUrl}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      
      // Save document URLs to vendor data
      const vendorData = JSON.parse(localStorage.getItem('vendorData') || '{}');
      vendorData.documentUrls = data.urls;
      localStorage.setItem('vendorData', JSON.stringify(vendorData));

      // Update the database record
      const vendorRegistrationId = localStorage.getItem('vendorRegistrationId');
      if (vendorRegistrationId) {
        const updateResponse = await fetch(`${apiBaseUrl}/vendor-registration/${vendorRegistrationId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            aadhaarUrl: data.urls.aadhaar,
            panUrl: data.urls.pan,
            gstUrl: data.urls.gst
          })
        });

        if (!updateResponse.ok) {
          console.error('Failed to update registration with document URLs');
        }
      }

      navigate('/agreement');
    } catch (error) {
      console.error('Error uploading documents:', error);
      alert('Failed to upload documents. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const renderUploadBox = (title, type, description) => {
    const selectedFile = files[type];
    const selectedPreviewUrl = previewUrls[type];
    const isPdf = selectedFile?.type === 'application/pdf';

    return (
      <div className={styles.uploadBox}>
        <input
          type="file"
          id={`upload-${type}`}
          className={styles.hiddenInput}
          onChange={(e) => handleFileChange(e, type)}
          accept=".pdf,.jpg,.jpeg,.png"
        />
        <label htmlFor={`upload-${type}`} className={styles.uploadLabel}>
          {selectedFile ? (
            <div className={styles.fileWrapper}>
              <div className={styles.previewContainer}>
                {isPdf ? (
                  <iframe
                    src={selectedPreviewUrl}
                    title={`${title} preview`}
                    className={styles.previewIframe}
                  />
                ) : selectedPreviewUrl ? (
                  <img
                    src={selectedPreviewUrl}
                    alt={`${title} preview`}
                    className={styles.previewImage}
                  />
                ) : (
                  <div className={styles.noPreviewBox}>
                    <FileText className={styles.noPreviewIcon} />
                    <p className={styles.noPreviewText}>{selectedFile.name}</p>
                    <p className={styles.noPreviewSubText}>Preview not available</p>
                  </div>
                )}
              </div>
              <div>
                <CheckCircle2 className={styles.successIcon} />
                <span className={styles.fileName}>{selectedFile.name}</span>
                <span className={styles.changeText}>Click to change</span>
              </div>
            </div>
          ) : (
            <>
              <Upload className={styles.uploadIcon} />
              <span className={styles.uploadTitle}>Upload {title}</span>
              <span className={styles.uploadDescription}>{description} (PDF, JPG, PNG)</span>
            </>
          )}
        </label>
      </div>
    );
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.headerSection}>
        <h1 className={styles.pageTitle}>Upload Documents</h1>
        <p className={styles.pageSubtitle}>Please provide the required KYC documents for verification.</p>
      </div>

      <div className={styles.stepsContainer}>
        <StepIndicator steps={steps} currentStep={1} />
      </div>

      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <Card>
          <CardHeader 
            title="KYC Documents"
            description="Ensure all documents are clear and legible."
          />
          <CardContent className={styles.contentWrapper}>
            {renderUploadBox('Aadhaar Card', 'aadhaar', 'Front and back side')}
            {renderUploadBox('PAN Card', 'pan', 'Clear image of PAN card')}
            {renderUploadBox('GST Certificate', 'gst', 'Optional if not applicable')}
          </CardContent>
          <CardFooter className={styles.cardFooter}>
            <Button variant="outline" type="button" onClick={() => navigate('/register')}>
              Back
            </Button>
            <Button 
              type="submit" 
              size="lg"
              disabled={!files.aadhaar || !files.pan || isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className={styles.spinner} />
                  Uploading...
                </>
              ) : (
                'Save & Continue'
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}



