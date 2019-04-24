const log = require("../utils/log")("datagrid/poll-datagrid");
const readLeaderboard = require("./read-leaderboard");
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
  try {
    await readLeaderboard();
    broadcast(OUTGOING_MESSAGE_TYPES.LEADERBOARD, global.leaderboard, "modified");
  } catch (e) {
    log.error("Error connecting to Infinispan leaderboard cache", e.message);
  }

}

module.exports = pollLeaderboard;
