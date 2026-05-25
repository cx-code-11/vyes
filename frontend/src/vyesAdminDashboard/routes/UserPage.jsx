import { useState, useEffect } from 'react';
import UserCard from '../components/UserCard';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  const apiBaseUrl = typeof import.meta.env.VITE_API_BASE_URL !== 'undefined' ? import.meta.env.VITE_API_BASE_URL : 'http://localhost:3000';

  useEffect(() => {
    fetch(`${apiBaseUrl}/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, [apiBaseUrl]);

  return (
    <div>
      <h1>Registered Users</h1>
      {users.length > 0 ? (
        users.map(u => <UserCard key={u.id} user={u} />)
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UsersPage;