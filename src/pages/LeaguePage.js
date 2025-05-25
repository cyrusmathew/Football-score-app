import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './LeaguePage.css';
import StandingsTable from '../components/StandingsTable';

const leagueNameToId = {
  "Premier League": 39,
  "La Liga": 140,
  "Serie A": 135,
  "Bundesliga": 78,
  "Ligue 1": 61,
};

function LeaguePage() {
  const { leagueName } = useParams();
  const [seasonMatches, setSeasonMatches] = useState({});
  const [standings, setStandings] = useState([]);
  const [latestSeason, setLatestSeason] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("matches");

  useEffect(() => {
    fetch("http://localhost:5000/api/matches")
      .then(res => res.json())
      .then(data => {
        const leagueData = data[leagueName] || {};
        setSeasonMatches(leagueData);

        const allSeasons = Object.keys(leagueData);
        if (allSeasons.length > 0) {
          const sorted = allSeasons.sort().reverse();
          const recentSeason = parseInt(sorted[0]);
          setLatestSeason(recentSeason);

          const leagueId = leagueNameToId[leagueName];
          if (leagueId) {
            fetch(`http://localhost:5000/api/standings/${leagueId}?season=${recentSeason}`)
              .then(res => res.json())
              .then(data => {
                const standingsData = data.response?.[0]?.league?.standings?.[0] || [];
                setStandings(standingsData);
              })
              .catch(err => console.error("Failed to fetch standings:", err));
          }
        }

        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch matches:", err);
        setLoading(false);
      });
  }, [leagueName]);

  if (loading) return <p>Loading...</p>;
  if (Object.keys(seasonMatches).length === 0) return <p>No data found for {leagueName}</p>;

  return (
    <div className="league-container">
      <h2 className="league-title">{leagueName}</h2>

      <div className="tab-strip">
        <div
          className={`tab-item ${activeTab === "standings" ? "active" : ""}`}
          onClick={() => setActiveTab("standings")}
        >
          Standings
        </div>
        <div
          className={`tab-item ${activeTab === "matches" ? "active" : ""}`}
          onClick={() => setActiveTab("matches")}
        >
          Matches
        </div>
      </div>


      {activeTab === "standings" && (
        <div className="section-wrapper">
          <h3 className="section-header">Standings – {latestSeason}</h3>
          <StandingsTable standings={standings} />
        </div>
      )}

      {activeTab === "matches" && (
        <div className="section-wrapper">
          <h3 className="section-header">Matches</h3>
          {Object.keys(seasonMatches).sort().reverse().map(season => (
            <div key={season} className="season-section">
              <h4 className="season-title">
                Season {season.toString().slice(2)}/{(parseInt(season) + 1).toString().slice(2)}
              </h4>
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
      )}
    </div>
  );
}

export default LeaguePage;
