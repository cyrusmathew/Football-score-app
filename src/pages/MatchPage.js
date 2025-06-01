import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MatchEvents from "../components/MatchEvents";
import MatchLineups from "../components/MatchLineups";
import "./MatchPage.css";

function MatchPage() {
  const { matchId } = useParams();
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("facts");

  useEffect(() => {
    fetch(`http://localhost:5000/api/match/${matchId}`)
      .then(res => res.json())
      .then(data => {
        setMatchData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading match:", err);
        setLoading(false);
      });
  }, [matchId]);

  if (loading) return <p>Loading match...</p>;
  if (!matchData || !matchData.info || !matchData.info[0]) {
    return <p>Match not found or data missing.</p>;
  }

  const match = matchData.info[0].fixture;
  const league = matchData.info[0].league;
  const teams = matchData.info[0].teams;
  const goals = matchData.info[0]?.goals;
  const events = matchData.events || [];

  const homeScorers = events
    .filter(e => e.type === "Goal" && e.team.id === teams.home.id)
    .map(e => `${e.player.name} ${e.time.elapsed}'`);

  const awayScorers = events
    .filter(e => e.type === "Goal" && e.team.id === teams.away.id)
    .map(e => `${e.player.name} ${e.time.elapsed}'`);

  return (
    <div className="match-page">
      {/* Top Nav */}
      <div className="match-topbar">
        <Link to="/" className="back-button">← Matches</Link>
        <span className="match-league">
          {league.name} – Round {match.round?.split(" ").pop()}
        </span>
      </div>

      {/* Meta Info Row */}
      <div className="match-meta-bar">
        <span>{new Date(match.date).toLocaleString()}</span>
        <span>{match.venue.name}</span>
        <span>{match.referee}</span>
      </div>

      {/* Score Banner */}
      <div className="score-banner">
        <div className="team">
          <img src={teams.home.logo} alt="" />
          <span>{teams.home.name}</span>
        </div>
        <div className="score">
          {goals.home} - {goals.away}
          <div className="score-status">{match.status.long}</div>
        </div>
        <div className="team">
          <span>{teams.away.name}</span>
          <img src={teams.away.logo} alt="" />
        </div>
      </div>

      {/* Scorers */}
      <div className="scorers-row">
        <div className="side">{homeScorers.join(", ")}</div>
        <div className="side right">{awayScorers.join(", ")}</div>
      </div>

      {/* Tabs */}
      <div className="match-tabs">
        <span
          className={activeTab === "facts" ? "active-tab" : ""}
          onClick={() => setActiveTab("facts")}
        >
          Facts
        </span>
        <span
          className={activeTab === "lineup" ? "active-tab" : ""}
          onClick={() => setActiveTab("lineup")}
        >
          Lineup
        </span>
        <span
          className={activeTab === "stats" ? "active-tab" : ""}
          onClick={() => setActiveTab("stats")}
        >
          Stats
        </span>
        <span
          className={activeTab === "events" ? "active-tab" : ""}
          onClick={() => setActiveTab("events")}
        >
          Events
        </span>
      </div>

      {/* Tab Content */}
      {activeTab === "lineup" && (
        <div className="section-wrapper">
          <h3 className="section-header">Lineups</h3>
          <MatchLineups lineups={matchData.lineups} />
        </div>
      )}

      {activeTab === "events" && (
        <div className="section-wrapper">
          <h3 className="section-header">Match Events</h3>
          <MatchEvents
            events={events}
            homeTeamId={teams.home.id}
            awayTeamId={teams.away.id}
          />
        </div>
      )}
    </div>
  );
}

export default MatchPage;
