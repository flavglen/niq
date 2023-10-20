import React from 'react';
import Header from './components/header/Header';
import Dashboard from './components/dashboard/dashboard';
import './App.css';
import { ProductProvider } from './context/productContext';

const  App = () => {
  return (
    <div>
      <Header/>
      <ProductProvider> 
        <Dashboard />
      </ProductProvider>
      {/* footer */}
    </div>
  );
}

export default App;
