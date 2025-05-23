import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './LeaguePage.css';


function LeaguePage() {
  const { leagueName } = useParams();
  const [seasonMatches, setSeasonMatches] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/matches")
      .then(res => res.json())
      .then(data => {
        const leagueData = data[leagueName] || {};
        setSeasonMatches(leagueData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch matches:", err);
        setLoading(false);
      });
  }, [leagueName]);

  if (loading) return <p>Loading...</p>;

  if (Object.keys(seasonMatches).length === 0) {
    return <p>No data found for {leagueName}</p>;
  }

  return (
    <div className="league-container">
      <h2 className="league-title">{leagueName}</h2>
      {Object.keys(seasonMatches).sort().reverse().map(season => (
        <div key={season} className="season-section">
          <h3 className="season-title">
            Season {season.toString().slice(2)}/{(parseInt(season) + 1).toString().slice(2)}
          </h3>
          {seasonMatches[season].map(match => (
            <div key={match.match_id} className="match-row">
              <div className="match-team">
                <img src={match.home_logo} alt="home logo" style={{ height: '20px' }} />
                {match.home_team}
              </div>
              <div className="match-score">
                {match.home_score} - {match.away_score}
              </div>
              <div className="match-team">
                {match.away_team}
                <img src={match.away_logo} alt="away logo" style={{ height: '20px' }} />
              </div>
              <div className="match-date">
                {new Date(match.date).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

}

export default LeaguePage;
