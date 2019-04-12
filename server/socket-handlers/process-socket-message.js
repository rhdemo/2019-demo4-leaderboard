const log = require("../utils/log")("socket-handlers");
const {INCOMING_MESSAGE_TYPES} = require("../message-types");


function processSocketMessage(ws, messageStr) {
  log.debug("processSocketMessage", messageStr)
  let messageObj = JSON.parse(messageStr);

  switch (messageObj.type) {
    case INCOMING_MESSAGE_TYPES.INIT:
      initHandler(ws, messageObj);
      break;

    case INCOMING_MESSAGE_TYPES.PING:
      pingHandler(ws, messageObj);
      break;

    default:
      log.warn(`Unhandled Message of type "${messageStr}"`);
      break;
  }
}

/**
 * Wraps a message handler with some generic logging
 * @param {Function} fn The handler function implementation
 * @param {String} type The named type of the payload
 */
function wrapMessageHandler (type, fn) {
    return function messageHandlerWrapper (ws, messageObj) {
        log.info(`processing message of type "${type}"`);
        log.debug(`payload for message "${type}" was: %j`, messageObj);

        fn(ws, messageObj)
    }
}

const initHandler = wrapMessageHandler(INCOMING_MESSAGE_TYPES.INIT, require("./init"));
const pingHandler = wrapMessageHandler(INCOMING_MESSAGE_TYPES.PING, function (ws, messageObj) {});

module.exports = processSocketMessage;
