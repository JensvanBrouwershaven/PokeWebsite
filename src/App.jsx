// App.js
import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cards from './pages/ProductPage';
import Profile from './pages/Profiel';
import Nav from './components/Nav';
import Faq from './pages/Faq'

function App() {
  const audioRef = useRef(null);

  useEffect(() => {
    // Set up audio when component mounts
    if (audioRef.current) {
      audioRef.current.volume = 1; // Set volume to 30% (soft)
      
      // Auto-play with user interaction handling
      const playAudio = () => {
        audioRef.current.play().catch(error => {
          console.log("Audio autoplay prevented:", error);
        });
      };

      // Try to play immediately
      playAudio();

      // If autoplay fails, play on first user interaction
      const handleUserInteraction = () => {
        playAudio();
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
      };

      document.addEventListener('click', handleUserInteraction);
      document.addEventListener('keydown', handleUserInteraction);

      // Cleanup
      return () => {
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
      };
    }
  }, []);

  return (
    <BrowserRouter>
      {/* Background music audio element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        style={{ display: 'none' }}
      >
        <source src="./audio/Background_music.mp3" type="audio/Background_music.mp3" />
        Your browser does not support the audio element.
      </audio>

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