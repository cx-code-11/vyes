import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import WebsiteLayout from '../layouts/WebsiteLayout';

import Home from '../pages/Home';
import { VendorRegistration } from '../pages/VendorRegistration';
import { DocumentUpload } from '../pages/DocumentUpload';
import { AgreementPreview } from '../pages/AgreementPreview';
import { DigitalSignature } from '../pages/DigitalSignature';
import { VerificationPending } from '../pages/VerificationPending';
import { VendorApproved } from '../pages/VendorApproved';

const InitialValidationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/*" element={
        <div className="min-h-screen bg-slate-50 flex flex-col">
          <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            <Routes>
              <Route path="register" element={<VendorRegistration />} />
              <Route path="upload" element={<DocumentUpload />} />
              <Route path="agreement" element={<AgreementPreview />} />
              <Route path="sign" element={<DigitalSignature />} />
              <Route path="pending" element={<VerificationPending />} />
              <Route path="approved" element={<VendorApproved />} />
              <Route path="*" element={<div>404 - Page Not Found on Vyess Website</div>} />
            </Routes>
          </main>
        </div>
      } />
    </Routes>
  );
};

export default InitialValidationRoutes;





{/* <Routes> */}
      {/* <Route element={<WebsiteLayout />}>
        <Route index element={<Home />} /> */}
      {/* <Route path="myaccount" element={<Account />} /> */}
      {/* <Route path="services" element={<Services />} /> */}
      {/* <Route path="services/:serviceId" element={<div>Service Detail Page</div>} /> */}
      {/* <Route path="login" element={<Login />} />
        <Route path="partnerLogin" element={<PartnerLogin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="subCategory" element={<Services />} />
        <Route path="subCategory/:subCategoryId" element={<Service />} />
      </Route> */}
      {/* <Route path="becomePartner" element={<BecomePartner />} />
      <Route path="/" element={<Navigate to="/register" replace />} />
      <Route path="/register" element={<VendorRegistration />} />
      <Route path="/upload" element={<DocumentUpload />} />
      <Route path="/agreement" element={<AgreementPreview />} />
      <Route path="/sign" element={<DigitalSignature />} />
      <Route path="/pending" element={<VerificationPending />} />
      <Route path="/approved" element={<VendorApproved />} /> */}
      {/* <Route path="/admin" element={<AdminDashboard />} /> */}


      {/* <Route path="*" element={<div>404 - Page Not Found on Vyess Website</div>} /> */}
    {/* </Routes> */}