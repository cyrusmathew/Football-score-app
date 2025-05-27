import React from "react";
import "./StandingsTable.css";

export default function StandingsTable({ standings }) {
  if (!standings || standings.length === 0) return <p>No standings data available.</p>;

  return (
    <div className="standings-container">
      <table className="standings-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>PL</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GD</th>
            <th>PTS</th>
            <th>Form</th>
          </tr>
        </thead>
        <tbody>
          {standings.map(team => (
            <tr key={team.team.id}>
              <td>{team.rank}</td>
              <td className="team-cell">
                <img src={team.team.logo} alt={team.team.name} className="team-logo" />
                {team.team.name}
              </td>
              <td>{team.all.played}</td>
              <td>{team.all.win}</td>
              <td>{team.all.draw}</td>
              <td>{team.all.lose}</td>
              <td>{team.goalsDiff}</td>
              <td>{team.points}</td>
              <td className="form-cell">
                {team.form?.split("").map((r, idx) => (
                  <span key={idx} className={`form-badge ${r}`}>
                    {r}
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
