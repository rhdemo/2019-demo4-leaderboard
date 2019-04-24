const {DATAGRID_KEYS} = require("./constants");
const log = require("../utils/log")("datagrid/read-leaderboard");

async function readLeaderboard() {
  try {
    let str = await global.leaderboardClient.get(DATAGRID_KEYS.LEADERBOARD);
    if (str) {
      global.leaderboard = JSON.parse(str);
    } else {
      global.leaderboard = undefined;
    }
  } catch (error) {
    log.error("Failed to read leaderboard. Error:", error.message);
  }
  return global.leaderboard;
}

module.exports = readLeaderboard;
