import React, {forwardRef} from "react";
import lodashGet from "lodash/get";
import { StarRate } from "@material-ui/icons";
import "./Leaderboard.scss";


const Player = forwardRef(({game, player, place}, ref) => {
  function showMotion(gesture) {
    return game && game.motions && game.motions[gesture];
  }

  function renderPosition(place) {
    let superScript;
    switch (place) {
      case 1:
        superScript = "st";
        break;
      case 2:
        superScript = "nd";
        break;
      case 3:
        superScript = "rd";
        break;
      default:
        superScript = "th";
        break;
    }

    return (
      <div className="position">
        <div><span className="place-number">{place}</span><sup className="place-super">{superScript}</sup></div>
      </div>);
  }

  function renderMotionAchievement(player, gesture) {
    if (!showMotion(gesture)) {
      return null;
    }

    let successes = lodashGet(player, `successfulMotions.${gesture}`, 0);
    if (successes > 0) {
      return <div className="achievement success"><StarRate fontSize="inherit"/></div>;
    }
    return <div className="achievement"><StarRate fontSize="inherit"/></div>;
  }

  return (
    <div className="player" ref={ref}>
      <div className={`medal medal-${place}`}/>
      {renderPosition(place)}
      <div className="username">{player.username}</div>
      <div className="points">{player.score} <small className="small"/>
      </div>
      {renderMotionAchievement(player, "shake")}
      {renderMotionAchievement(player, "circle")}
      {renderMotionAchievement(player, "x")}
      {renderMotionAchievement(player, "roll")}
      {renderMotionAchievement(player, "fever")}
      {renderMotionAchievement(player, "floss")}
    </div>);
});

export default Player;
