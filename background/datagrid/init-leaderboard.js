const infinispan = require("infinispan");
const env = require("env-var");

const log = require("../utils/log")("datagrid");

const DATAGRID_HOST = env.get("DATAGRID_HOST").asString();
const DATAGRID_HOTROD_PORT = env.get("DATAGRID_HOTROD_PORT").asIntPositive();

async function initClient() {
  let client = await infinispan.client({port: DATAGRID_HOTROD_PORT, host: DATAGRID_HOST}, {cacheName: "leaderboard"});
  log.info(`Connected to Infinispan leaderboard data`);

  let stats = await client.stats();
  log.debug(stats);

  return client;
}

async function initLeaderboard() {
  try {
    global.leaderboardClient = await initClient();
  } catch (error) {
    log.error(`Error connecting to Infinispan leaderboard data: ${error.message}`);
    log.error(error);
  }
  return global.leaderboardClient;
}

module.exports = initLeaderboard;
