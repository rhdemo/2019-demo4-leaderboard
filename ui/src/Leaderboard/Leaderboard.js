import React from "react";
import _get from "lodash/get";
import "./Leaderboard.scss";


function Leaderboard({game, leaderboard}) {

  function showMotion(gesture) {
    return game && game.motions && game.motions[gesture];
  }

  function createHeader() {
    return (
      <tr>
        <th>Place</th>
        <th>Name</th>
        <th>Score</th>
        {showMotion("shake") ? <th>Shake</th> : null}
        {showMotion("circle") ? <th>Circle</th> : null}
        {showMotion("x") ? <th>X</th> : null}
        {showMotion("roll") ? <th>Roll</th> : null}
        {showMotion("fever") ? <th>Fever</th> : null}
        {showMotion("floss") ? <th>Floss</th> : null}
      </tr>);
  }

  function createMotionStat(player, gesture) {
    if (!showMotion(gesture)) {
      return null;
    }

    let successes = _get(player, `successfulMotions.${gesture}`, 0);
    let failures = _get(player, `failedMotions.${gesture}`, 0);
    return <td>{`${successes}/${failures + successes}`}</td>;
  }

  function createRow(player, index) {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{player.username}</td>
        <td>{player.score}</td>
        {createMotionStat(player, "shake")}
        {createMotionStat(player, "circle")}
        {createMotionStat(player, "x")}
        {createMotionStat(player, "roll")}
        {createMotionStat(player, "fever")}
        {createMotionStat(player, "floss")}
      </tr>);
  }

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
        {createHeader()}
        </thead>
        <tbody>
        {leaderboard.players.map((player, index) => createRow(player, index))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
