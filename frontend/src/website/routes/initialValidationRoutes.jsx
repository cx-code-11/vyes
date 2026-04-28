import { Routes, Route } from 'react-router-dom';

// 1. Import your Layout
import WebsiteLayout from '../layouts/WebsiteLayout';

// 2. Import your Pages (Create these if they don't exist yet!)
import Home from '../pages/Home';
// import Account from '../pages/Account';
import Service from '../pages/Service';
import Services from '../pages/SubCategory';
import Login from '../pages/Login';
import PartnerLogin from '../pages/PartnerLogin';
import Signup from '../pages/Signup';

const InitialValidationRoutes = () => {
  return (
    <Routes>
      <Route element={<WebsiteLayout />}>
        <Route index element={<Home />} />
        {/* <Route path="myaccount" element={<Account />} /> */}
        {/* <Route path="services" element={<Services />} /> */}
        {/* <Route path="services/:serviceId" element={<div>Service Detail Page</div>} /> */}
        <Route path="login" element={<Login />} />
        <Route path="partnerLogin" element={<PartnerLogin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="subCategory" element={<Services />} />
        <Route path="subCategory/:subCategoryId" element={<Service />} />
      </Route>


      <Route path="*" element={<div>404 - Page Not Found on Vyess Website</div>} />
    </Routes>
  );
};

export default InitialValidationRoutes;