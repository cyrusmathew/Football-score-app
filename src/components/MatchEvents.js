import React from "react";
import "./MatchEvents.css";

function MatchEvents({ events, homeTeamId, awayTeamId }) {
  if (!events || events.length === 0) return <p>No event data.</p>;

  // Filter to goals + cards only
  const filtered = events.filter(
    e =>
      e.type === "Goal" ||
      e.detail === "Yellow Card" ||
      e.detail === "Red Card"
  );

  // Inject HT & FT separators
  const withSeparators = [];
  let addedHT = false;

  filtered.forEach((event, i) => {
    const min = event.time.elapsed;

    // Add HT at first event ≥ 45
    if (!addedHT && min >= 45) {
      withSeparators.push({ type: "Separator", label: "HT" });
      addedHT = true;
    }

    withSeparators.push(event);
  });

  // Add FT at the end
  withSeparators.push({ type: "Separator", label: "FT" });

  return (
    <div className="match-events-timeline">
      {withSeparators.map((event, index) => {
        if (event.type === "Separator") {
          return (
            <div key={`sep-${index}`} className="event-separator">
              <span className="line" />
              <span className="label">{event.label}</span>
              <span className="line" />
            </div>

          );
        }

        const isHome = event.team.id === homeTeamId;
        const minute = event.time.extra
          ? `${event.time.elapsed}+${event.time.extra}'`
          : `${event.time.elapsed}'`;

        const player = event.player?.name || "Unknown";
        const assist = event.assist?.name;
        const type = event.type;
        const detail = event.detail;

        const iconMap = {
          Goal: "⚽",
          "Own Goal": "🥅",
          "Penalty": "⚽",
          "Yellow Card": "🟨",
          "Red Card": "🟥"
        };

        const icon = iconMap[detail] || iconMap[type] || "•";

        let eventText = player;
        if (type === "Goal" && assist) {
          eventText += ` (Assist: ${assist})`;
        }

        return (
          <div key={index} className={`event-row ${isHome ? "left" : "right"}`}>
            <div className="event-info">
              {isHome && <div className="event-text">{eventText}</div>}
              <div className="event-icon">{icon}</div>
              {!isHome && <div className="event-text">{eventText}</div>}
            </div>
            <div className="event-minute">{minute}</div>
          </div>
        );
      })}
    </div>
  );
}

export default MatchEvents;
