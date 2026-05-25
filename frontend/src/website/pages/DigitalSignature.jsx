import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import { PDFDocument, rgb } from 'pdf-lib';
import { Card, CardContent, CardHeader, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StepIndicator } from '../components/StepIndicator';
import { Eraser, Download } from 'lucide-react';

const steps = [
  { name: 'Registration' },
  { name: 'Documents' },
  { name: 'Agreement' },
  { name: 'Sign' }
];

const agreementPdfUrl = new URL('../assets/VYESSFMS_Vendor_Agreement.pdf', import.meta.url).href;

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


      // Right-side table coordinates (A4: 612x792)
      // Table top-left: x=330, y=height-260
      // Signature line: x=350, y=height-295 (width ~180, height ~32)
      // Name line: x=350, y=height-355
      // Date line: x=350, y=height-475

      // Draw signature image (centered on signature line)
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

      const responseUpload = await fetch('http://localhost:3000/api/upload', {
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
        await fetch(`http://localhost:3000/vendor-registration/${vendorRegistrationId}`, {
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
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Digital Signature</h1>
        <p className="mt-2 text-slate-600">Review the agreement and place your signature below.</p>
      </div>

      <div className="mb-10">
        <StepIndicator steps={steps} currentStep={3} />
      </div>

      <Card>
        <CardHeader
          title="Sign Agreement"
          description="Review the PDF and complete the signature fields below"
        />
        <CardContent className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">VYESSFMS_Vendor_Agreement.pdf</p>
                <p className="text-sm text-slate-600">The signed copy will be generated from the official agreement PDF when you click Sign & Download PDF.</p>
              </div>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                Official PDF
              </span>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <label htmlFor="businessName" className="text-sm font-semibold text-slate-900">
                Vendor Full Name / Business Name - name
              </label>
              <input
                id="businessName"
                type="text"
                value={businessName}
                onChange={(event) => setBusinessName(event.target.value)}
                placeholder="Enter your full business name"
                className="mt-3 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500"
              />
              <p className="mt-2 text-xs text-slate-500">
                This name will be used in the signed agreement.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Vendor / Service Provider - signature</p>
              <div className="mt-3 rounded-xl border-2 border-slate-300 overflow-hidden bg-white">
                <SignatureCanvas
                  ref={sigCanvas}
                  canvasProps={{ className: 'w-full h-64 cursor-crosshair' }}
                  backgroundColor="rgb(255, 255, 255)"
                />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Draw your signature in the space above.
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Button variant="ghost" size="sm" onClick={clearSignature} className="text-slate-500">
              <Eraser className="w-4 h-4 mr-2" />
              Clear Signature
            </Button>

            <div className="text-right text-xs text-slate-500 space-y-1">
              <p>Signer: <strong>{vendorData.contactPerson || 'Pending'}</strong></p>
              <p>Time: {timestamp}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-between bg-blue-50 border-blue-100">
          <Button variant="outline" onClick={() => navigate('/agreement')}>
            Back
          </Button>
          <Button
            onClick={generatePDF}
            size="lg"
            disabled={isGenerating}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isGenerating ? 'Processing...' : (
              <>
                <Download className="w-5 h-5 mr-2" />
                Sign & Download PDF
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
