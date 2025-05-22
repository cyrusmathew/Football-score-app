import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';


const leagues = [
  { id: 39, name: "Premier League" },
  { id: 140, name: "La Liga" },
  { id: 135, name: "Serie A" },
  { id: 78, name: "Bundesliga" },
  { id: 61, name: "Ligue 1" },
];

function Header(){
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
                <Link to={`/league/${league.name}`} className="nav-link">
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