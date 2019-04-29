const log = require("../utils/log")("datagrid/poll-datagrid");
const readLeaderboard = require("./read-leaderboard");
const readSuccessfulMotions = require("./read-successful-motions");
const readFailedMotions = require("./read-failed-motions");
const broadcast = require("../utils/broadcast");
const {OUTGOING_MESSAGE_TYPES} = require("../message-types");

function pollLeaderboard(interval) {
  setTimeout(async () => {
    await getData();
    pollLeaderboard(interval);
  }, interval);
}

async function getData() {
  log.debug("poll leaderboard");
  const readLeaderboardPromise = readLeaderboard();
  const readSuccessesPromise = readSuccessfulMotions();
  const readFailuresPromise = readFailedMotions();


  await readLeaderboardPromise;
  broadcast(OUTGOING_MESSAGE_TYPES.LEADERBOARD, global.leaderboard, "modified");

  await readSuccessesPromise;
  broadcast(OUTGOING_MESSAGE_TYPES.SUCCESSFUL_MOTIONS, global.successfulMotions, "modified");

  await readFailuresPromise;
  broadcast(OUTGOING_MESSAGE_TYPES.FAILED_MOTIONS, global.failedMotions, "modified");

}

module.exports = pollLeaderboard;
