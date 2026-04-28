import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const WebsiteLayout = () => {
  return (
    <div>
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};


export default WebsiteLayout;