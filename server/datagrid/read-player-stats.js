const log = require("../utils/log")("datagrid/read-player-stats");

async function readPlayerStats() {
  try {
    global.playerStats = await global.playerClient.stats();
  } catch (error) {
    log.error("Failed to read player stats. Error:", error.message);
  }
  return global.playerStats;
}

module.exports = readPlayerStats;
