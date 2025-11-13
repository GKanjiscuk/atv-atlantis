import React, { useEffect } from 'react';
// @ts-ignore: allow side-effect CSS import without type declarations
import './App.css';

import AppRouter from './routes/router';
import { initAcomodacoes } from './services/acomodacoesService';


function App() {
  useEffect(() => {
    initAcomodacoes();  // Initialize Acomodacoes only once when the app starts
}, []);

  return (
    <AppRouter />
  );
}

export default App;
