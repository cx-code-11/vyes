import { Outlet } from 'react-router-dom';
import SideNav from '../components/SideNav';

const AdminDashboardLayout = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <SideNav />

      <main
        style={{
          width: "100%",
          overflowY: "auto",
          scrollbarWidth: "none", // For Firefox
          msOverflowStyle: "none", // For Internet Explorer and Edge
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboardLayout