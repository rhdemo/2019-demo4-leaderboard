const log = require("../utils/log")("socket-handlers/init");

const {OUTGOING_MESSAGE_TYPES} = require("../message-types");

async function initHandler(ws, messageObj) {
  ws.send(JSON.stringify({type: OUTGOING_MESSAGE_TYPES.GAME, data: global.game, action: "modify"}));
  ws.send(JSON.stringify({type: OUTGOING_MESSAGE_TYPES.LEADERBOARD, data: global.leaderboard, action: "modify"}));
}

module.exports = initHandler;
