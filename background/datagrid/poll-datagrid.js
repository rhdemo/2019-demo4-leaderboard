const log = require("../utils/log")("datagrid/poll-datagrid");
const initPlayers = require("./init-players");
const initLeaderboard = require("./init-leaderboard");
const {DATAGRID_KEYS} = require("./constants");


function pollDatagrid(interval) {
  setTimeout(async () => {
    log.debug("checking Datagrid connections");
    await checkPlayerClient();
    await checkLeaderboardClient();
    pollDatagrid(interval);
  }, interval);
}

async function checkPlayerClient() {
  log.debug("checkPlayerClient");
  try {
    global.playerStats = await global.playerClient.stats();
  } catch (e) {
    log.error("Error connecting to Infinispan players cache", e.message);
    await reconnectPlayerClient();
  }
}

async function reconnectPlayerClient() {
  log.info("Attempting to reconnect to Infinispan players cache");
  try {
    await initPlayers();
  } catch (e) {
    log.error("Failed to reconnect to Infinispan players cache.  Error: ", e.message);
  }
}


async function checkLeaderboardClient() {
  log.debug("checkLeaderboardClient");
  try {
    const str = await global.leaderboardClient.get(DATAGRID_KEYS.LEADERBOARD);
    if (str) {
      global.leaderboard = JSON.parse(str);
    } else {
      log.error("Leaderboard missing");
    }
  } catch (e) {
    log.error("Error connecting to Infinispan leaderboard cache", e.message);
    await reconnectLeaderboardClient();
  }
}

async function reconnectLeaderboardClient() {
  log.info("Attempting to reconnect to Infinispan leaderboard cache");
  try {
    await initLeaderboard();
  } catch (e) {
    log.error("Failed to reconnect to Infinispan leaderboard cache.  Error: ", e.message);
  }
}

module.exports = pollDatagrid;
