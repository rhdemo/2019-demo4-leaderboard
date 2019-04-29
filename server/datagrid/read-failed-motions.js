const {DATAGRID_KEYS} = require("./constants");
const log = require("../utils/log")("datagrid/read-failed-motions");

async function readSuccessfulMotions() {
  try {
    let str = await global.leaderboardClient.get(DATAGRID_KEYS.FAILED_MOTIONS);
    if (str) {
      global.failedMotions = JSON.parse(str);
    } else {
      global.failedMotions = undefined;
    }
  } catch (error) {
    log.error("Failed to read failed motions. Error:", error.message);
  }
  return global.failedMotions;
}

module.exports = readSuccessfulMotions;
