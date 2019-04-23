const {DATAGRID_KEYS} = require("./constants");

async function readLeaderboard(changeType) {
  try {
    if (changeType === "remove") {
      global.leaderboard = undefined;
      return;
    }

    let str = await global.playerClient.get(DATAGRID_KEYS.LEADERBOARD);
    if (str) {
      global.leaderboard = JSON.parse(str);
    }
  } catch (error) {
    log.error("Failed to read leaderboard. Error:", error.message);
  }
}


module.exports = readLeaderboard;

