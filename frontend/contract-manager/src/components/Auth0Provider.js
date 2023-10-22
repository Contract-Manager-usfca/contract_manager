import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
  return (
    <Auth0Provider
      domain="contract-manager.us.auth0.com"
      clientId="lEBSEWK6hD4CUCJah11xwBFXGpTHcG9p"
      redirectUri="http://localhost:3000/Dashboard"
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;