import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import PageIndex from './pages/pageIndex';
import About from './pages/about';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { SuperTokensProvider } from './components/supertokensProvider';
import { Helmet } from 'react-helmet';
import customTheme from './theme/theme';

function App() {
  return (
    // <ChakraProvider>
    //   {/* <Router>
    //     <PageIndex/>
    //   </Router> */}
    //   <Router>
    //     <Navbar/>
        
    //   </Router>
    // </ChakraProvider>
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
        {/* <Component {...pageProps} /> */}
      </ChakraProvider>
    </SuperTokensProvider>
  </>
  );
}

export default App;
