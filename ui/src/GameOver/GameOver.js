import React from "react";
import "./GameOver.scss";
import lodashGet from "lodash/get";
import lodashReduce from "lodash/reduce";

// const MOTIONS = [
//   {
//     gesture: "shake",
//     name: "Shake",
//     plural: "shakes"
//   },
//   {
//     gesture: "circle",
//     name: "Circle",
//     plural: "circles"
//   },
//   {
//     gesture: "x",
//     name: "X",
//     plural: "crosses"
//   },
//   {
//     gesture: "roll",
//     name: "Roll",
//     plural: "rolls"
//   },
//   {
//     gesture: "fever",
//     name: "Fever",
//     plural: "fevers"
//   },
//   {
//     gesture: "floss",
//     name: "Floss",
//     plural: "flosses"
//   },
// ];


function GameOver({stats, successfulMotions, failedMotions}) {

  const numSensors = lodashGet(stats, "players.globalCurrentNumberOfEntries", 0);

  let totalSuccessfulMotions = 0;
  if (successfulMotions) {
    totalSuccessfulMotions = lodashReduce(successfulMotions, (result, value) => result + value, 0);
  }

  let totalFailedMotions = 0;
  if (failedMotions) {
    totalFailedMotions = lodashReduce(failedMotions, (result, value) => result + value, 0);
  }

  return (
    <div className="game-over">
      <h1>Game Over</h1>
      <div className="stats">
        <h3 className="stat"><span>{numSensors}</span> sensors</h3>
        <h3 className="stat"><span>{totalSuccessfulMotions}</span> recognized motions</h3>
        <h3 className="stat"><span>{totalSuccessfulMotions + totalFailedMotions}</span> evaluated vibrations</h3>
        {/*{MOTIONS.map((m, index) => {*/}
        {/*  const numSuccess = lodashGet(successfulMotions, m.gesture, 0);*/}
        {/*  const numFailed = lodashGet(failedMotions, m.gesture, 0);*/}
        {/*  const total = numSuccess + numFailed;*/}
        {/*  return (*/}
        {/*    <div className="stat-section">*/}
        {/*      <div className="stat"><span>{numSuccess}</span> recognized {m.plural}.</div>*/}
        {/*      <div className="stat"><span>{total}</span> total {m.plural}</div>*/}
        {/*      <div className="stat"><span>{Math.floor(numSuccess / total * 100)}</span>% success rate</div>*/}
        {/*    </div>*/}
        {/*  );*/}
        {/*})}*/}
      </div>
    </div>
  );
}

export default GameOver;
