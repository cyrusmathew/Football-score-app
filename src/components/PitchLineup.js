import React from "react";
import "./PitchLineup.css";

function PitchLineup({ lineup }) {
  if (!lineup || !lineup.formation || !lineup.startXI) return null;

  const formation = lineup.formation.split("-").map(Number);
  const players = lineup.startXI;
  const goalkeeper = players.find((p) => p.player.pos === "G");
  const fieldPlayers = players.filter((p) => p.player.pos !== "G");

  let distributed = [];
  let index = 0;
  for (let row of formation) {
    distributed.push(fieldPlayers.slice(index, index + row));
    index += row;
  }

  return (
    <div className="pitch-layout">
      <div className="pitch-box">
        {distributed.map((row, i) => (
          <div className="pitch-row" key={i}>
            {row.map((p, j) => (
              <div key={j} className="player-icon">
                <img
                  src={p.player.photo}
                  alt={p.player.name}
                  onError={(e) => (e.target.src = "/default-player.png")}
                />
                <span>{p.player.name}</span>
              </div>
            ))}
          </div>
        ))}
        {goalkeeper && (
          <div className="pitch-row goalkeeper-row">
            <div className="player-icon">
              <img
                src={goalkeeper.player.photo}
                alt={goalkeeper.player.name}
                onError={(e) => (e.target.src = "/default-player.png")}
              />
              <span>{goalkeeper.player.name}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PitchLineup;
