const log = require("../utils/log")("datagrid/game");
const OUTGOING_MESSAGE_TYPE = require("../message-types").OUTGOING_MESSAGE_TYPES;
const readLeaderboard = require("./read-leaderboard");
const broadcast = require("../utils/broadcast");

async function leaderboardHandler(client, changeType, key) {
  log.info("broadcasting leaderboard update");
  await readLeaderboard(changeType);
  if (changeType === "remove") {
    broadcast(OUTGOING_MESSAGE_TYPE.LEADERBOARD, {key, value: undefined}, changeType);
  } else {
    broadcast(OUTGOING_MESSAGE_TYPE.LEADERBOARD, global.leaderboard, changeType);
  }
}


module.exports = leaderboardHandler;

