import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cards from './pages/ProductPage';
import Profile from './pages/Profiel';
import Nav from './components/Nav'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Cards />} />
        <Route path='/profiel' element={<Profile />} />
        <Route path='/Nav' element={<Nav />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
