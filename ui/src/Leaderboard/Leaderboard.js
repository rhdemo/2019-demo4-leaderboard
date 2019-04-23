import React from "react";
import Player from "./Player"

import "./Leaderboard.scss";

function Leaderboard({game, stats, leaderboard}) {

  if (!leaderboard || !leaderboard.players) {
    return (
      <div className="leaderboard ">
        <h1 className="title">No Players</h1>
      </div>
    );
  }

  return (
    <div className="leaderboard ">
        {leaderboard.players.map((player, index) => <Player key={index} game={game} player={player} place={index+1}/>)}
    </div>
  );
}

export default Leaderboard;
