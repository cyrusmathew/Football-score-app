import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function LeaguePage() {
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
          <h3>Season {season}</h3>
          {seasonMatches[season].map(match => (
            <div key={match.match_id} style={{
              padding: '10px',
              borderBottom: '1px solid #ccc'
            }}>
              {match.home_team} {match.home_score} - {match.away_score} {match.away_team}
              <br />
              <small>{new Date(match.date).toLocaleString()}</small>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
