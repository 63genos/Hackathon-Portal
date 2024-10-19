import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from './components/Navbar';  
import PageIndex from './pages/pageIndex';
import './App.css';

function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <PageIndex />
    </ChakraProvider>
  );
}

export default App; 
