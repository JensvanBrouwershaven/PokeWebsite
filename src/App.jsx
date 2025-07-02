// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cards from './pages/ProductPage';
import Profile from './pages/Profiel';
import Nav from './components/Nav';
import Faq from './pages/Faq'

function App() {
  return (
    <BrowserRouter>
      {/* Nav wrapt hier de Routes */}
      <Nav>
        <Routes>
          <Route path='/' element={<Cards />} />
          <Route path='/profiel' element={<Profile />} />
          <Route path='/Faq' element={<Faq/>}></Route>
        </Routes>
      </Nav>
    </BrowserRouter>
  );
}

export default App;
