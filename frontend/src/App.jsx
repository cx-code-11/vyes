import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [users, setUsers] = useState([]); // Storage for your data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Call your Express API
    fetch('http://localhost:3000/api/initial/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data); // Save the data to state
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching:', error));
  }, []); // Empty array means "run once on load"

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
