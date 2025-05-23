import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const leagueIDs = [39, 140, 135, 78, 61]; // Top 5 leagues

function Header() {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/leagues')
      .then(res => res.json())
      .then(data => {
        const filtered = data.response
          .filter(item => leagueIDs.includes(item.league.id))
          .map(item => ({
            id: item.league.id,
            name: item.league.name,
            logo: item.league.logo
          }));
        setLeagues(filtered);
      })
      .catch(err => console.error("Failed to load leagues:", err));
  }, []);

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <div className="dropdown">
          <span className="nav-link">Leagues ▼</span>
          <ul className="dropdown-content">
            {leagues.map((league) => (
              <li key={league.id}>
                <Link to={`/league/${league.name}`} className="league-link">
                  <img src={league.logo} alt={`${league.name} logo`} className="league-logo" />
                  {league.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
