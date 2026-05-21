import { Routes, Route } from 'react-router-dom';

import WebsiteRoutes from './website/routes/initialValidationRoutes';
import AdminRoutes from './vyesAdminDashboard/routes/AdminRoutes';
// import VendorRoutes from './vendorDashboard/routes/VendorRoutes';
// import EmployeeRoutes from './vyesEmpDashboard/routes/EmpRoutes';

function App() {
  const getSubdomain = () => {
    const host = window.location.hostname; // e.g., 'admin.localhost' or 'admin.vyess.com'
    const parts = host.split('.');

    // If you are on localhost (e.g., admin.localhost:5173), parts.length > 1
    // If you are on a real domain (e.g., admin.vyess.com), parts.length > 2
    if (parts.length > (host.includes('localhost') ? 1 : 2)) {
      return parts[0].toLowerCase();
    }
    return null; // This means it's the main website (www or root)
  };

  const subdomain = getSubdomain();

  const renderContent = () => {
    switch (subdomain) {
      case 'admin':
        return <AdminRoutes />;
      // case 'vendor':
        // return <VendorRoutes />;
      // case 'employee':
        // return <EmployeeRoutes />;
      default:
        // This handles 'www' or no subdomain (the main website)
        return <WebsiteRoutes />;
    }
  };

  return (
    <Routes>
      {/* The /* is crucial so that nested routes inside these bundles resolve correctly */}
      <Route path='/*' element={renderContent()} />
    </Routes>
  );
}

export default App;