import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Profiel from './pages/Profiel.jsx'; // updated path to reflect it's a page

function App() {
  return (
    <Router>
      <div className="App">
        {/* Optional Nav */}
        <nav className="p-4 bg-gray-800 text-white">
          <Link to="/profiel" className="hover:underline">
            Ga naar Profielpagina
          </Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/profiel" element={<Profiel />} />
          {/* More routes like home, login, etc. can go here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
