import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './layouts/Dashboard';
import UsersPage from './routes/UserPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All routes inside MainLayout will have the same Navbar/Footer */}
        <Route path="/" element={<Dashboard />}>
          <Route index element={<h1>Welcome to Vyes!</h1>} />
          <Route path="users" element={<UsersPage />} />
          {/* Add more routes here, like path="profile" */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;