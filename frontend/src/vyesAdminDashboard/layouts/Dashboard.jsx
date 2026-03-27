import { Outlet, Link } from 'react-router-dom';
import SideNav from '../components/SideNav';
import './styles/Dashboard.css'; // Optional: Add some styles for layout

const MainLayout = () => {
  const navs = [
    { label: 'Home', path: '/' },
    { label: 'Users', path: '/users' },
    // Add more nav items here, like { label: 'Profile', path: '/profile' }
  ];
  return (
    <div className="dashboardContainer">
      <div className="sideNavContainer">
        <SideNav navs={navs} />
      </div>

      <main className='outletContainer'>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;