import React from "react";
import "./Leaderboard.scss";


function Leaderboard({leaderboard}) {

  if (!leaderboard || !leaderboard.players) {
    return (
      <div className="leaderboard section">
        <h1 className="title">No Players</h1>
      </div>
    );
  }

  return (
    <div className="leaderboard section">
      <h1 className="title">Leaderboard</h1>
      <table className="table leaderboard-table">
        <thead>
        <tr>
          <th>Place</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
        </thead>
        <tbody>
        {leaderboard.players.map((player, index) => (
          <tr key={index}>
            <td>{index+1}</td>
            <td>{player.username}</td>
            <td>{player.score}</td>
          </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
