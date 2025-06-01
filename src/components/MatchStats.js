import React from "react";
import "./MatchStats.css";

function MatchStats({ stats }) {
  if (!stats || stats.length < 2) return <p>No statistics available.</p>;

  const [home, away] = stats;

  const renderStatRow = (statType) => {
    const homeStat = home.statistics.find(s => s.type === statType);
    const awayStat = away.statistics.find(s => s.type === statType);

    const homeVal = parseStatValue(homeStat?.value);
    const awayVal = parseStatValue(awayStat?.value);
    const total = homeVal + awayVal || 1;

    return (
      <div className="stat-row" key={statType}>
        <div className="stat-label">{statType}</div>
        <div className="stat-bars">
          <div className="stat-value left">{homeVal}</div>
          <div className="bar-container">
            <div
              className="bar home"
              style={{ width: `${(homeVal / total) * 100}%` }}
            ></div>
            <div
              className="bar away"
              style={{ width: `${(awayVal / total) * 100}%` }}
            ></div>
          </div>
          <div className="stat-value right">{awayVal}</div>
        </div>
      </div>
    );
  };

  const parseStatValue = (val) => {
    if (typeof val === "number") return val;
    if (typeof val === "string" && val.includes("%"))
      return parseInt(val.replace("%", ""));
    if (!isNaN(Number(val))) return Number(val);
    return 0;
  };

  const statTypes = [
    "Ball Possession",
    "Total Shots",
    "Shots on Goal",
    "Shots off Goal",
    "Blocked Shots",
    "Fouls",
    "Corner Kicks",
    "Offsides",
    "Yellow Cards",
    "Red Cards",
    "Big Chances",
    "Passes %"
  ];

  return (
    <div className="stats-wrapper">
      {statTypes.map(renderStatRow)}
    </div>
  );
}

export default MatchStats;
