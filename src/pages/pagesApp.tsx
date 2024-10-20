import React from 'react';
import './globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { SuperTokensProvider } from '../components/supertokensProvider';
import customTheme from '../theme/theme';

interface AppProps {
  Component: React.ComponentType<any>;
  pageProps: any;
}

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {

  return (
    <>
      <SuperTokensProvider>
        <ChakraProvider theme={customTheme}>
          <Helmet>
            <link
              href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
              rel="stylesheet"
            />
            <title>Hackathon | E-Cell IIT Hyderabad - NPCI</title>
            <meta
              name="description"
              content="Join the hackathon conducted by E-Cell IIT Hyderabad and NPCI. Showcase your skills and get a chance to win exciting prizes."
            />
            <meta
              name="keywords"
              content="Hackathon IITH, Hackathon Ecell, IIT Hyderabad, E-Cell, NPCI Hackathon, NPCI , coding, competition, contest"
            />
            <meta name="author" content="Web Team E-Cell" />
          </Helmet>
          <Component {...pageProps} />
        </ChakraProvider>
      </SuperTokensProvider>
    </>
  );
};

export default MyApp;
