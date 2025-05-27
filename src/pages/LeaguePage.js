import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  const [availableSeasons, setAvailableSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [groupBy, setGroupBy] = useState("date");
  const [selectedTeam, setSelectedTeam] = useState("All");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("matches");

  useEffect(() => {
    fetch("http://localhost:5000/api/matches")
      .then(res => res.json())
      .then(data => {
        const leagueData = data[leagueName] || {};
        setSeasonMatches(leagueData);

        const allSeasons = Object.keys(leagueData).sort().reverse();
        setAvailableSeasons(allSeasons);
        const recentSeason = allSeasons[0];
        setSelectedSeason(recentSeason);

        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch matches:", err);
        setLoading(false);
      });
  }, [leagueName]);

  useEffect(() => {
    if (!selectedSeason) return;

    const leagueId = leagueNameToId[leagueName];
    if (!leagueId) return;

    fetch(`http://localhost:5000/api/standings/${leagueId}?season=${selectedSeason}`)
      .then(res => res.json())
      .then(data => {
        const standingsData = data.response?.[0]?.league?.standings?.[0] || [];
        setStandings(standingsData);
      })
      .catch(err => console.error("Failed to fetch standings:", err));
  }, [selectedSeason, leagueName]);

  if (loading) return <p>Loading...</p>;
  if (Object.keys(seasonMatches).length === 0) return <p>No data found for {leagueName}</p>;

  const matches = seasonMatches[selectedSeason] || [];

  const teamSet = new Set();
  matches.forEach(match => {
    teamSet.add(match.home_team);
    teamSet.add(match.away_team);
  });
  const allTeams = Array.from(teamSet).sort();

  const filteredMatches =
    selectedTeam === "All"
      ? matches
      : matches.filter(
          m => m.home_team === selectedTeam || m.away_team === selectedTeam
        );

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

      <div className="filters-bar">
        <select
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(e.target.value)}
          className="season-select"
        >
          {availableSeasons.map(season => (
            <option key={season} value={season}>
              Season {season.toString().slice(2)}/{(parseInt(season) + 1).toString().slice(2)}
            </option>
          ))}
        </select>

        {activeTab === "matches" && (
          <div className="group-toggle">
            <button
              className={groupBy === "date" ? "active" : ""}
              onClick={() => {
                setGroupBy("date");
                setSelectedTeam("All");
              }}
            >
              Group by Date
            </button>
            <button
              className={groupBy === "team" ? "active" : ""}
              onClick={() => setGroupBy("team")}
            >
              Group by Team
            </button>

            {groupBy === "team" && (
              <select
                className="team-select"
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
              >
                <option value="All">All Teams</option>
                {allTeams.map(team => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}
      </div>

      {activeTab === "standings" && (
        <div className="section-wrapper">
          <h3 className="section-header">
            Standings – {selectedSeason.toString().slice(2)}/{(parseInt(selectedSeason) + 1).toString().slice(2)}
          </h3>
          <StandingsTable standings={standings} />
        </div>
      )}

      {activeTab === "matches" && (
        <div className="section-wrapper">
          <h3 className="section-header">
            Matches – {selectedSeason.toString().slice(2)}/{(parseInt(selectedSeason) + 1).toString().slice(2)}
          </h3>

          {groupBy === "date"
            ? filteredMatches.map(match => (
                <Link to={`/match/${match.match_id}`} key={match.match_id} className="match-row">
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
                </Link>
              ))
            : allTeams
                .filter(team => selectedTeam === "All" || team === selectedTeam)
                .map(team => (
                  <div key={team} className="season-section">
                    <h4 className="season-title">{team}</h4>
                    {filteredMatches
                      .filter(m => m.home_team === team || m.away_team === team)
                      .map(match => (
                        <Link
                          to={`/match/${match.match_id}`}
                          key={match.match_id + team}
                          className="match-row"
                        >
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
                        </Link>
                      ))}
                  </div>
                ))}
        </div>
      )}
    </div>
  );
}

export default LeaguePage;
