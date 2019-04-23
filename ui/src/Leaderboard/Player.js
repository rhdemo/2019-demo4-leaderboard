import React from "react";
import lodashGet from "lodash/get";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar} from "@fortawesome/free-solid-svg-icons";
import "./Leaderboard.scss";


function Player({game, player, place}) {
  function showMotion(gesture) {
    return game && game.motions && game.motions[gesture];
  }

  function renderPosition(place) {
    let superScript;
    switch (place) {
      case 1:
        superScript = "ST";
        break;
      case 2:
        superScript = "ND";
        break;
      case 3:
        superScript = "RD";
        break;
      default:
        superScript = "TH";
        break;
    }

    return (
      <div className="position">
        <div>{place}<sup>{superScript}</sup></div>
      </div>);
  }

  function renderMotionAchievement(player, gesture) {
    if (!showMotion(gesture)) {
      return null;
    }

    let successes = lodashGet(player, `successfulMotions.${gesture}`, 0);
    if (successes > 0) {
      return <div className="achievement success"><FontAwesomeIcon icon={fasStar}/></div>
    }
    return <div className="achievement"><FontAwesomeIcon icon={fasStar}/></div>;
  }

  return (
    <div className="player">
      {renderPosition(place)}
      <div className="username">{player.username}</div>
      <div className="points">{player.score} <small className="small">POINTS</small>
      </div>
      {renderMotionAchievement(player, "shake")}
      {renderMotionAchievement(player, "circle")}
      {renderMotionAchievement(player, "x")}
      {renderMotionAchievement(player, "roll")}
      {renderMotionAchievement(player, "fever")}
      {renderMotionAchievement(player, "floss")}
    </div>);
}

export default Player;
