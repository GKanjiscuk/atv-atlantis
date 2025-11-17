import React from 'react';
// @ts-ignore: allow side-effect CSS import without type declarations
import './App.css';

import AppRouter from './routes/router.js';

function App() {
  return (
    <AppRouter />
  );
}

export default App;