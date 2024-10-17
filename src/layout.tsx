// RootLayout.tsx (React component)

import React, { ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Helmet } from 'react-helmet'; // To replace 'metadata'
import customTheme from '../theme/theme'; // Assuming custom theme exists
import { SuperTokensProvider } from './components./superTokensProvider'; // Custom SuperTokens component

// Interface for the props
interface RootLayoutProps {
  children: ReactNode;
}

// RootLayout component for wrapping the app
const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <>
      {/* Helmet for meta tags (replaces metadata object) */}
      <Helmet>
        <html lang="en" />
        <title>Hackathon | E-Cell IIT Hyderabad - NPCI</title>
        <meta name="description" content="Join the hackathon conducted by E-Cell IIT Hyderabad and NPCI. Showcase your skills and get chance to win exciting prizes." />
        <meta name="keywords" content="Hackathon IITH, Hackathon Ecell, IIT Hyderabad, E-Cell, NPCI Hackathon, NPCI , coding, competition, contest" />
      </Helmet>

      {/* Body content */}
      <body>
        <SuperTokensProvider>
          <ChakraProvider theme={customTheme}>
            {children}
          </ChakraProvider>
        </SuperTokensProvider>
      </body>
    </>
  );
};

export default RootLayout;
