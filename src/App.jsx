import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cards from './pages/ProductPage';
import Profile from './pages/Profiel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Cards />} />
        <Route path='/profiel' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
