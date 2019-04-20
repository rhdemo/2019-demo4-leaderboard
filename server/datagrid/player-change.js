const {OUTGOING_MESSAGE_TYPES} = require("../message-types");
const readPlayerStats = require("./read-player-stats");
const broadcast = require("../utils/broadcast");

let statsNeedUpdate = false;

// gather player changes in 1 second block
function playerChange(client, changeType, key) {
  //first update request creates a timer, otherwise ignore until the time fires
  if (!statsNeedUpdate) {
    statsNeedUpdate = true;
    setTimeout(async function () {
      statsNeedUpdate = false;
      let playerStats = await readPlayerStats();
      broadcast(OUTGOING_MESSAGE_TYPES.STATS, {players: playerStats});
    }, 1000);
  }
}


module.exports = playerChange;
