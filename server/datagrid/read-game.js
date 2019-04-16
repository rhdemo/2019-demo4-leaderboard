const log = require("../utils/log")("datagrid/read-game");
const {DATAGRID_KEYS} = require("./constants");

async function readGame() {
    try {
      let str = await global.dataClient.get(DATAGRID_KEYS.GAME);
      if (str) {
        global.game = JSON.parse(str);
      }
    } catch (error) {
      log.error("Failed to read game. Error:", error.message);
    }
}


module.exports = readGame;

