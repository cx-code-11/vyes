import { Routes, Route } from 'react-router-dom';

// 1. Import your Layout
import AdminLayout from '../layouts/AdminDashboardLayout';
import Dashboard from '../pages/Dashboard';
import QuoteRequested from '../pages/QuoteRequested';
import ReviewQuoteRequest from '../pages/ReviewQuoteRequest';
import AssignVendor from '../pages/AssignVendor';
import BecomePartner from '../pages/BecomePartner';
import VendorDetailsOutlet from '../pages/VendorDetailsOutlet';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="quoteRequested" element={<QuoteRequested />} />
        <Route path="reviewQuote" element={<ReviewQuoteRequest />} />
        <Route path="assignVendor" element={<AssignVendor />} />
        <Route path="becomePartner" element={<BecomePartner />} />
        <Route path="vendorDetails/*" element={<VendorDetailsOutlet />} />
        {/* <Route path="services" element={<Services />} /> */}
        {/* <Route path="services/:serviceId" element={<div>Service Detail Page</div>} /> */}
        {/* <Route path="login" element={<Login />} /> */}
        {/* <Route path="partnerLogin" element={<PartnerLogin />} /> */}
        {/* <Route path="signup" element={<Signup />} /> */}
        {/* <Route path="subCategory" element={<Services />} /> */}
        {/* <Route path="subCategory/:subCategoryId" element={<Service />} /> */}
        <Route path="*" element={<div>404 - Page Not Found on Vyess Website</div>} />
      </Route>


      <Route path="*" element={<div>404 - Page Not Found on Vyess Website</div>} />
    </Routes>
  )
}

export default AdminRoutes