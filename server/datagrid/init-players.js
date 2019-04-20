const infinispan = require("infinispan");
const env = require("env-var");

const log = require("../utils/log")("datagrid");
const playerChange = require("./player-change");
const readPlayerStats = require("./read-player-stats");

const DATAGRID_HOST = env.get("DATAGRID_HOST").asString();
const DATAGRID_PORT = env.get("DATAGRID_HOTROD_PORT").asIntPositive();

async function initClient() {
  let client = await infinispan.client({port: DATAGRID_PORT, host: DATAGRID_HOST}, {cacheName: "players"});
  log.info(`Connected to Infinispan player data`);

  let stats = await client.stats();
  log.debug(stats);

  let listenerId = await client.addListener("create", key => handleDataChange(client,"create", key));
  client.addListener("modify", key => handleDataChange(client,"modify", key), {listenerId});
  client.addListener("remove", key => handleDataChange(client,"remove", key), {listenerId});

  return client;
}

async function handleDataChange(client, changeType, key) {
  log.debug(`Player change: ${changeType} ${key}`);
  if (changeType === "create" || changeType === "remove") {
    playerChange(client, changeType, key);
  }
}

async function initPlayers() {
  try {
    global.playerClient = await initClient();
    readPlayerStats();
  } catch (error) {
    log.error(`Error connecting to Infinispan player data: ${error.message}`);
    log.error(error);
  }
  return dataClient;
}

module.exports = initPlayers;
