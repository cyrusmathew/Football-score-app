import React from "react";
import "./MatchSummary.css";

function MatchSummary({ matchInfo }) {
  if (!matchInfo || !matchInfo.fixture || !matchInfo.league) return null;

  const { fixture, league } = matchInfo;

  return (
    <div className="summary-wrapper">
      <div className="summary-item"><strong>Status:</strong> {fixture.status.long}</div>
      <div className="summary-item"><strong>Competition:</strong> {league.name} ({league.season}/{(league.season + 1).toString().slice(2)})</div>
      <div className="summary-item"><strong>Round:</strong> {league.round}</div>
      <div className="summary-item"><strong>Date & Time:</strong> {new Date(fixture.date).toLocaleString()}</div>
      <div className="summary-item"><strong>Stadium:</strong> {fixture.venue.name}, {fixture.venue.city}</div>
      <div className="summary-item"><strong>Referee:</strong> {fixture.referee || "N/A"}</div>
    </div>
  );
}

export default MatchSummary;
