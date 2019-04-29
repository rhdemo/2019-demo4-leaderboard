const log = require("./utils/log")("stats-counter");
require("./datagrid/enable-logging");
const initPlayers = require("./datagrid/init-players");
const initLeaderboard = require("./datagrid/init-leaderboard");
const pollDatagrid = require("./datagrid/poll-datagrid");
const pollPlayers = require("./datagrid/poll-players");


log.info("Attempting to start stats-counter");


initLeaderboard()
  .then(() => initPlayers())
  .then(() => {
    pollDatagrid(5000);
    pollPlayers(1000);
    log.info(`Started player counter server`);
  });
