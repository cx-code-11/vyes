import { Outlet } from 'react-router-dom';
import SideNav from '../components/SideNav';

const AdminDashboardLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SideNav />
      <main style={{ width: "100%"}}>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminDashboardLayout