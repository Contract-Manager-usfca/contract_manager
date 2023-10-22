import React, {useEffect, useState} from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function UserProfile() {
  const { getIdTokenClaims } = useAuth0();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const idTokenClaims = await getIdTokenClaims();
        const name = idTokenClaims?.name || '';
        setUserName(name);
      } catch (error) {
        console.error('Error retrieving ID token claims:', error);
      }
    };

    fetchUserProfile();
  }, [getIdTokenClaims]);

  return (
    <div>
      {userName && (
        <p style={{color: 'white', textAlign: 'center'}} >You're currently logged in as {userName}. <a href="/" style={{ color: '#C188FB' }}>Not you?</a> </p>
      )}
    </div>
  );
}

export default UserProfile;