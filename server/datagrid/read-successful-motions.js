const {DATAGRID_KEYS} = require("./constants");
const log = require("../utils/log")("datagrid/read-successful-motions");

async function readSuccessfulMotions() {
  try {
    let str = await global.leaderboardClient.get(DATAGRID_KEYS.SUCCESSFUL_MOTIONS);
    if (str) {
      global.successfulMotions = JSON.parse(str);
    } else {
      global.successfulMotions = undefined;
    }
  } catch (error) {
    log.error("Failed to read successful motions. Error:", error.message);
  }
  return global.successfulMotions;
}

module.exports = readSuccessfulMotions;
