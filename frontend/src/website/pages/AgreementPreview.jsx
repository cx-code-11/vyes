import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { Card, CardContent, CardHeader, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StepIndicator } from '../components/StepIndicator';
import agreementPdf from '../assets/VYESSFMS_Vendor_Agreement.pdf';

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
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Service Agreement</h1>
        <p className="mt-2 text-slate-600">Please review the master service agreement generated for your company.</p>
      </div>

      <div className="mb-10">
        <StepIndicator steps={steps} currentStep={2} />
      </div>

      <Card>
        <CardHeader
          title="Agreement Preview"
          description="Read carefully before accepting"
          className="bg-slate-50"
        />
        <CardContent className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">VYESSFMS_Vendor_Agreement.pdf</p>
                <p className="text-sm text-slate-600">Scroll to the bottom of the last page to enable the agreement acceptance checkbox.</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${hasFullyViewedPdf ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {hasFullyViewedPdf ? 'Full PDF viewed' : 'Scroll to complete'}
              </span>
            </div>

            <div className="mt-4 overflow-hidden rounded-lg border border-slate-200 bg-white">
              <div
                ref={scrollContainerRef}
                onScroll={checkFullView}
                className="max-h-[36rem] overflow-y-auto bg-white"
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
                      width={612}
                      renderTextLayer
                      renderAnnotationLayer
                    />
                  ))}
                </Document>
              </div>
            </div>

            {previewError ? (
              <p className="mt-3 text-sm text-rose-600">
                The PDF preview could not be loaded in this browser. Please refresh the page and try again.
              </p>
            ) : null}
          </div>

          <div className="flex items-start gap-3">
            <div className="flex items-center h-5">
              <input
                id="accept"
                name="accept"
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                checked={accepted}
                disabled={!hasFullyViewedPdf}
                onChange={(event) => setAccepted(event.target.checked)}
              />
            </div>
            <div>
              <label htmlFor="accept" className="text-sm text-slate-700">
                I, {vendorData.contactPerson}, authorized representative of {vendorData.companyName}, have read and agree to the terms and conditions outlined in this agreement.
              </label>
              <p className="mt-1 text-xs text-slate-500">
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
