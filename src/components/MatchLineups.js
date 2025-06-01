import React from "react";
import PitchLineup from "./PitchLineup";
import "./MatchLineups.css";

function MatchLineups({ lineups }) {
  if (!lineups || lineups.length < 2) return <p>No lineup data available.</p>;

  const [home, away] =
    lineups[0].team.id < lineups[1].team.id
      ? [lineups[0], lineups[1]]
      : [lineups[1], lineups[0]];

  const renderSubs = (players) =>
    players.map((p, i) => (
      <div key={i} className="sub-row">
        <img
          src={p.player.photo}
          alt={p.player.name}
          onError={(e) => (e.target.src = "/default-player.png")}
        />
        <span>{p.player.name}</span>
        <span className="position">{p.player.pos}</span>
      </div>
    ));

  return (
    <div className="lineup-wrapper">
      {/* HEADER */}
      <div className="lineup-header">
        <div className="lineup-team">
          <img src={home.team.logo} alt="logo" />
          <span>{home.team.name}</span>
          <span className="formation">{home.formation}</span>
        </div>
        <div className="lineup-team right">
          <span className="formation">{away.formation}</span>
          <span>{away.team.name}</span>
          <img src={away.team.logo} alt="logo" />
        </div>
      </div>

      {/* PITCH */}
      <div className="lineup-pitch">
        <PitchLineup lineup={home} />
        <PitchLineup lineup={away} />
      </div>

      {/* COACH + SUBS */}
      <div className="lineup-footer">
        <div className="coach-block">
          <img src={home.coach.photo} alt="coach" />
          <span>{home.coach.name}</span>
        </div>
        <div className="coach-block">
          <img src={away.coach.photo} alt="coach" />
          <span>{away.coach.name}</span>
        </div>
      </div>

      <div className="subs-section">
        <div className="sub-list">
          <h4>Substitutes</h4>
          {renderSubs(home.substitutes)}
        </div>
        <div className="sub-list">
          <h4>Substitutes</h4>
          {renderSubs(away.substitutes)}
        </div>
      </div>
    </div>
  );
}

export default MatchLineups;
