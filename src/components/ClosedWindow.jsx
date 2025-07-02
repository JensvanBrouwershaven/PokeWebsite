import React, { useState, useEffect } from 'react';

const PokeballHomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleReset = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Top Half (Red) */}
      <div 
        className={`absolute w-full h-1/2 bg-red-500 transition-transform duration-1000 ease-in-out z-10 ${
          isOpen ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
      </div>
      
      {/* Bottom Half (White) */}
      <div 
        className={`absolute bottom-0 w-full h-1/2 bg-white transition-transform duration-1000 ease-in-out z-10 ${
          isOpen ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
      </div>
      
      {/* Middle Black Line */}
      <div className={`absolute top-1/2 left-0 w-full h-2 bg-black transform -translate-y-1/2 z-20 transition-opacity duration-1000 ${
        isOpen ? 'opacity-0' : 'opacity-100'
      }`}></div>
      
      {/* Center Button - positioned exactly in the middle of the line */}
      <div 
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-1000 ease-in-out ${
          isOpen ? '-translate-y-full -translate-x-1/2 opacity-0' : 'translate-y-0 -translate-x-1/2 opacity-100'
        }`}
      >
        {/* Outer black ring */}
        <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center border-4 border-gray-800">
          {/* Inner white button */}
          <div className="w-16 h-16 bg-white rounded-full border-2 border-gray-400 flex items-center justify-center shadow-inner">
            {/* Center highlight */}
            <div className="w-8 h-8 bg-gray-200 rounded-full shadow-inner"></div>
          </div>
        </div>
      </div>
      
      {/* Reset Button - only visible when opened */}
      {isOpen && (
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 font-semibold z-40"
        >
          Reset
        </button>
      )}
    </div>
  );
};

export default PokeballHomePage;