import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import { Card, CardContent, CardHeader, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StepIndicator } from '../components/StepIndicator';
import { Eraser, Download, MapPin } from 'lucide-react';
import { jsPDF } from 'jspdf';

const steps = [
  { name: 'Registration' },
  { name: 'Documents' },
  { name: 'Agreement' },
  { name: 'Sign' }
];

export function DigitalSignature() {
  const navigate = useNavigate();
  const sigCanvas = useRef(null);
  const [location, setLocation] = useState(null);
  const [timestamp, setTimestamp] = useState('');
  const [vendorData, setVendorData] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);

  const vendorName = vendorData.businessName || vendorData.companyName || 'Vendor';

  useEffect(() => {
    const data = localStorage.getItem('vendorData');
    if (data) setVendorData(JSON.parse(data));
    
    setTimestamp(new Date().toLocaleString());
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        (error) => console.log(error)
      );
    }
  }, []);

  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  const generatePDF = async () => {
    if (!sigCanvas.current || sigCanvas.current.isEmpty()) {
      alert("Please provide a signature first.");
      return;
    }

    setIsGenerating(true);
    try {
      const sigData = sigCanvas.current.getCanvas().toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const leftMargin = 20;
      let currentY = 20;

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(18);
      pdf.text('MASTER SERVICE AGREEMENT', pageWidth / 2, currentY, { align: 'center' });
      currentY += 14;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      const textLines = [
        `This Master Service Agreement is made and entered into on ${new Date().toLocaleDateString()} by and between:`,
        '',
        `Vyess FMS and ${vendorName}`,
        '',
        `Address: ${vendorData.address || ''}`,
        '',
        '1. SCOPE OF SERVICES',
        'The Service Provider agrees to provide the services as requested by the Company.',
        '',
        '2. PAYMENT TERMS',
        'Payment shall be made within 30 days of receipt of an undisputed invoice.',
        '',
        'IN WITNESS WHEREOF, the parties hereto have executed this Agreement.',
        '',
        `For ${vendorName}`,
        `Signed by: ${vendorData.contactPerson || ''}`,
        `Time: ${timestamp}`,
      ];
      if (location) {
        textLines.push(`Loc: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`);
      }

      textLines.forEach((line) => {
        if (!line) {
          currentY += 8;
          return;
        }
        const splitText = pdf.splitTextToSize(line, pageWidth - leftMargin * 2);
        pdf.text(splitText, leftMargin, currentY);
        currentY += splitText.length * 7;
      });

      if (currentY + 70 > pdf.internal.pageSize.getHeight()) {
        pdf.addPage();
        currentY = 20;
      }

      const sigWidth = 80;
      const sigHeight = 40;
      const sigX = pageWidth - leftMargin - sigWidth;
      const sigY = currentY + 10;
      pdf.addImage(sigData, 'PNG', sigX, sigY, sigWidth, sigHeight);
      pdf.setFontSize(10);
      pdf.text(`Signed by: ${vendorData.contactPerson || ''}`, leftMargin, sigY + sigHeight + 10);
      pdf.text(`Time: ${timestamp}`, leftMargin, sigY + sigHeight + 16);
      if (location) {
        pdf.text(`Loc: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`, leftMargin, sigY + sigHeight + 22);
      }

      pdf.save(`${vendorName.replace(/\s+/g, '_') || 'Vendor'}_Agreement.pdf`);
      setTimeout(() => {
        navigate('/pending');
      }, 1500);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Digital Signature</h1>
        <p className="mt-2 text-slate-600">Please sign below to complete the agreement execution.</p>
      </div>

      <div className="mb-10">
        <StepIndicator steps={steps} currentStep={3} />
      </div>

      <Card>
        <CardHeader 
          title="Sign Agreement"
          description="Use your mouse or finger to draw your signature"
        />
        <CardContent>
          <div className="border-2 border-slate-300 rounded-xl overflow-hidden bg-white mb-4">
            <SignatureCanvas 
              ref={sigCanvas}
              canvasProps={{className: 'w-full h-64 cursor-crosshair'}}
              backgroundColor="rgb(255, 255, 255)"
            />
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <Button variant="ghost" size="sm" onClick={clearSignature} className="text-slate-500">
              <Eraser className="w-4 h-4 mr-2" />
              Clear Canvas
            </Button>
            
            <div className="text-right text-xs text-slate-500 space-y-1">
              <p>Signer: <strong>{vendorData.contactPerson}</strong></p>
              <p>Time: {timestamp}</p>
              {location && (
                <p className="flex items-center justify-end gap-1">
                  <MapPin className="w-3 h-3" />
                  {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </p>
              )}
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
