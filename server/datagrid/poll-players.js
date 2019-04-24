const log = require("../utils/log")("datagrid/poll-datagrid");
const readPlayerStats = require("./read-player-stats");
const broadcast = require("../utils/broadcast");
const {OUTGOING_MESSAGE_TYPES} = require("../message-types");

function pollPlayerInfo(interval) {
  setTimeout(async () => {
    await getData();
    pollPlayerInfo(interval);
  }, interval);
}

async function getData() {
  log.debug("read player Info");
  try {
    let playerStats = await readPlayerStats();
    broadcast(OUTGOING_MESSAGE_TYPES.STATS, {players: playerStats});
  } catch (e) {
    log.error("Error connecting to Infinispan players cache", e.message);
  }

}

module.exports = pollPlayerInfo;
