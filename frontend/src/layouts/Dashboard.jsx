import { Outlet, Link } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="app-container">
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/">Home</Link> | <Link to="/users">View Users</Link>
      </nav>

      <main style={{ padding: '2rem' }}>
        {/* This is where your individual routes will render */}
        <Outlet />
      </main>

      <footer style={{ marginTop: '2rem', textAlign: 'center' }}>
        <p>© 2026 Vyes WebApp</p>
      </footer>
    </div>
  );
};

export default MainLayout;