import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ShopProvider from './contexts/Shop';
import ThemeProvider from './contexts/Theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <ThemeProvider>
    <ShopProvider>
      <App />
    </ShopProvider>
  </ThemeProvider>
  // </React.StrictMode>
);
