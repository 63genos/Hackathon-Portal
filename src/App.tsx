import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import PageIndex from './pages/pageIndex';
import About from './pages/about';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      {/* <Router>
        <PageIndex/>
      </Router> */}
      <Router>
        <Navbar/>
        
      </Router>
    </ChakraProvider>
  );
}

export default App;
