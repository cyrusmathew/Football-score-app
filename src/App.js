import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import LeaguePage from './pages/LeaguePage';
import MatchPage from "./pages/MatchPage";

function App() {
  return (
    <Router>
      <Header />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/league/:leagueName" element={<LeaguePage />} />
          <Route path="/match/:matchId" element={<MatchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
