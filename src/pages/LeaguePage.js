import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
    <div>
      <h2>{leagueName}</h2>
      {Object.keys(seasonMatches).sort().reverse().map(season => (
        <div key={season}>
          <h3>
            Season {season.toString().slice(2)}/{(parseInt(season) + 1).toString().slice(2)}
          </h3>
          {seasonMatches[season].map(match => (
            <div key={match.match_id} style={{
              padding: '10px',
              borderBottom: '1px solid #ccc',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <img src={match.home_logo} alt="home logo" style={{ height: '20px' }} />
              <span>{match.home_team}</span>
              <strong>{match.home_score}</strong>
              <span>-</span>
              <strong>{match.away_score}</strong>
              <span>{match.away_team}</span>
              <img src={match.away_logo} alt="away logo" style={{ height: '20px' }} />
              <small style={{ marginLeft: 'auto' }}>{new Date(match.date).toLocaleString()}</small>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default LeaguePage;
