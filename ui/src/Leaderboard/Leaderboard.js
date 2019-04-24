import React from "react";
import posed, { PoseGroup } from "react-pose";
import Player from "./Player"
import "./Leaderboard.scss";

const AnimatedPlayer = posed(Player)({});

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
      <PoseGroup>
        {leaderboard.players.map((player, index) => (
          <AnimatedPlayer className="player" key={player.username} game={game} player={player} place={index+1}/>
        ))}
      </PoseGroup>
    </div>
  );
}

export default Leaderboard;
