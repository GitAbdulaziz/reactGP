import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { createTheme } from '@mui/material/styles';

const providers = [
  { id: 'github', name: 'GitHub' },
  { id: 'google', name: 'Google' },
  { id: 'credentials', name: 'Email and Password' },
];

// Mock sign-in function
const signIn = async (provider) => {
  console.log(`Sign in with ${provider.id}`);
};

export default function ThemeSignInPage() {
  // Simple theme setup without custom functions
  const THEME = createTheme({
    palette: {
      mode: 'light', // You can set to 'dark' if you want a dark theme
      primary: { main: '#1976d2' }, // Primary color example
    },
  });

  return (
    <AppProvider theme={THEME}>
      <SignInPage signIn={signIn} providers={providers} />
    </AppProvider>
  );
}
