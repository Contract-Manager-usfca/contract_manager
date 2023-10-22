import React from 'react';
import UserProfile from './UserProfile'; // Import the UserProfile component

function Dashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#252525', paddingBottom: '100px' }}>
      <h3 style={{ backgroundColor: '#C188FB', textAlign: 'center', fontSize: '50px' }}> Welcome! </h3>

      {/* Include the UserProfile component to display the user's name */}
      <UserProfile />
    </div>
  );
}

export default Dashboard;
