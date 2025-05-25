import React from "react";

export default function StandingsTable({ standings }) {
  if (!standings || standings.length === 0) return <p>No standings data available.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto text-sm border-collapse">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2">#</th>
            <th className="p-2">Team</th>
            <th className="p-2">P</th>
            <th className="p-2">W</th>
            <th className="p-2">D</th>
            <th className="p-2">L</th>
            <th className="p-2">Pts</th>
          </tr>
        </thead>
        <tbody>
          {standings.map(team => (
            <tr key={team.team.id} className="border-t">
              <td className="p-2">{team.rank}</td>
              <td className="p-2 flex items-center gap-2">
                <img src={team.team.logo} alt="" className="h-4" />
                {team.team.name}
              </td>
              <td className="p-2">{team.all.played}</td>
              <td className="p-2">{team.all.win}</td>
              <td className="p-2">{team.all.draw}</td>
              <td className="p-2">{team.all.lose}</td>
              <td className="p-2">{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
