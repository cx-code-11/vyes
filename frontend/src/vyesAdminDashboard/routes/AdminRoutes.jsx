import { Routes, Route } from 'react-router-dom';

// 1. Import your Layout
import AdminLayout from '../layouts/AdminDashboardLayout';
import Dashboard from '../pages/Dashboard';


const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        {/* <Route path="myaccount" element={<Account />} /> */}
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