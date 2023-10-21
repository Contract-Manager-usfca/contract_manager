import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function SignIn() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div>
      <h3> Sign In Page </h3>
      {isAuthenticated ? (
        <button onClick={logout}>Log Out</button>
      ) : (
        <button onClick={loginWithRedirect}>Log In</button>
      )}
    </div>
  );
}

export default SignIn;
