const proxy = require("http-proxy-middleware");


module.exports = function(app) {
  let devSocket = process.env.DEV_SOCKET || "http://localhost:8085";

  app.use(proxy("/socket", { target: devSocket, ws: true }));
};
