import React from "react";
import lodashGet from "lodash/get";
import lodashReduce from "lodash/reduce";

import "./Status.scss";


function Status({game, stats, successfulMotions, failedMotions}) {

  let totalSuccessfulMotions = 0;
  if (successfulMotions) {
    totalSuccessfulMotions = lodashReduce(successfulMotions, (result, value) => result + value, 0);
  }

  let totalFailedMotions = 0;
  if (failedMotions) {
    totalFailedMotions = lodashReduce(failedMotions, (result, value) => result + value, 0);
  }

  return (
    <div className="status">
      <div className="status-text"><span className="stat-number">{lodashGet(stats, "players.globalCurrentNumberOfEntries", 0)}</span> sensors</div>
      <div className="status-text"><span className="stat-number">{totalSuccessfulMotions}</span> recognized motions</div>
      <div className="status-text"><span className="stat-number">{totalSuccessfulMotions + totalFailedMotions}</span> evaluated vibrations</div>
    </div>
  );
}

export default Status;
