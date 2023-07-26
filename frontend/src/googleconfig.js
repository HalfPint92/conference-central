import { GoogleAuthProvider } from '@react-oauth/google';

export const googleConfig = {
  clientId: '98230984350-ft7m12ij6u7fo33b7hfmb4as8p9m7ij0.apps.googleusercontent.com',
  redirectUri: 'http://localhost:3000/auth/google/callback',
  scopes: ['email', 'profile'],
  responseType: 'token',
};

export const googleAuth = new GoogleAuthProvider(googleConfig);