const {DATAGRID_KEYS} = require("./constants");
const log = require("../utils/log")("datagrid/poll-players");

function pollPlayers(interval) {
  setTimeout(async () => {
    log.debug("pollPlayers")
    let {successfulMotions, failedMotions} = await getData();
    await writeMotions({successfulMotions, failedMotions});
    pollPlayers(interval);
  }, interval);
}

async function getData() {
  log.debug("read player info");
  try {
    let clientIterator = await global.playerClient.iterator(1);
    let entry = {done: true};
    let successfulMotions = {};
    let failedMotions = {};

    do {
      entry = await clientIterator.next();
      if (!entry.done && entry.value) {
        let player = JSON.parse(entry.value);
        for (let key in player.successfulMotions) {
          successfulMotions[key] = (successfulMotions[key] || 0) + player.successfulMotions[key];
        }
        for (let key in player.failedMotions) {
          failedMotions[key] = (failedMotions[key] || 0) + player.failedMotions[key];
        }
      }
    } while (!entry.done);
    return {successfulMotions, failedMotions};
  } catch (e) {
    log.error("Error reading player data", e.message);
  }
}

async function writeMotions({successfulMotions, failedMotions}) {
  log.debug("successfulMotions", successfulMotions);
  log.debug("failedMotions", failedMotions);
  const writeSuccessesPromise = global.leaderboardClient.put(DATAGRID_KEYS.SUCCESSFUL_MOTIONS, JSON.stringify(successfulMotions));
  const writeFailuresPromise = global.leaderboardClient.put(DATAGRID_KEYS.FAILED_MOTIONS, JSON.stringify(failedMotions));

  try {
    await writeSuccessesPromise;
    await writeFailuresPromise;
  } catch (error) {
    log.error("error occurred updating motion data:", error.message);
  }
}

module.exports = pollPlayers;
