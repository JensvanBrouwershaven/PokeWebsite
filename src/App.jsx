// App.jsx
import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cards from './pages/ProductPage';
import Profile from './pages/Profiel';
import Nav from './components/Nav';
import Faq from './pages/Faq';
import BackgroundMusic from './audio/Background_music.mp3'

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    
    // Function to start playing audio
    const startAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Autoplay prevented by browser:', error);
        // Autoplay was prevented, wait for user interaction
      }
    };

    // Function to handle user interaction
    const handleUserInteraction = () => {
      if (!userInteracted) {
        setUserInteracted(true);
        startAudio();
        // Remove event listeners after first interaction
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
      }
    };

    if (audio) {
      // Set audio properties
      audio.loop = true;
      audio.volume = 0.5; // 50% volume, adjust as needed
      
      // Try to autoplay immediately
      startAudio();
      
      // Add event listeners for user interaction (fallback for autoplay restrictions)
      document.addEventListener('click', handleUserInteraction);
      document.addEventListener('keydown', handleUserInteraction);
      document.addEventListener('touchstart', handleUserInteraction);
    }

    // Cleanup function
    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [userInteracted]);

  // Function to toggle play/pause
  const toggleAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <BrowserRouter>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={BackgroundMusic}
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
      
      {/* Optional: Audio control button */}
      <button
        onClick={toggleAudio}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          padding: '10px',
          backgroundColor: isPlaying ? '#ff4444' : '#44ff44',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        {isPlaying ? '🔊 Pause' : '🔇 Play'}
      </button>

      {/* Nav wraps the Routes */}
      <Nav>
        <Routes>
          <Route path='/' element={<Cards />} />
          <Route path='/profiel' element={<Profile />} />
          <Route path='/Faq' element={<Faq />} />
        </Routes>
      </Nav>
    </BrowserRouter>
  );
}

export default App;