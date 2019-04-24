const WebSocket = require("ws");
const env = require("env-var");
const log = require("./utils/log")("leaderboard-server");
const {OUTGOING_MESSAGE_TYPES} = require("./message-types");
const broadcast = require("./utils/broadcast");
const processSocketMessage = require("./socket-handlers/process-socket-message");
const initData = require("./datagrid/init-data");
const initPlayers = require("./datagrid/init-players");
const pollDatagrid = require("./datagrid/poll-datagrid");
const pollLeaderboard = require("./datagrid/poll-leaderboard");

const PORT = env.get("PORT", "8080").asIntPositive();
const IP = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0";

global.game = {
    id: null,
    state: "loading"
};

global.leaderboard = {
  players: []
};

global.playerStats = {};

global.socketServer = new WebSocket.Server({
  host: IP,
  port: PORT
});

global.dataClient = null;
global.playerClient = null;

log.info(`Started Leaderboard server on ${IP}:${PORT}`);

setInterval(function () {
  broadcast(OUTGOING_MESSAGE_TYPES.HEARTBEAT);
}, 5000);

initData()
  .then(() => initPlayers())
  .then(client => {
    global.socketServer.on("connection", function connection(ws) {
      ws.on("message", function incoming(message) {
        processSocketMessage(ws, message);
      });
    });
    pollDatagrid(10000);
    pollLeaderboard(1000);
  });
