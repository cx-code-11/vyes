const UserCard = ({ user }) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '1rem', margin: '1rem 0' }}>
      <h3>{user.name || 'Anonymous'}</h3>
      <p>{user.email}</p>
      <small>Joined: {new Date(user.createdAt).toLocaleDateString()}</small>
    </div>
  );
};

export default UserCard;