import React, { useState, useReducer } from "react";
import Sockette from "sockette";
import lodashGet from "lodash/get";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faSync } from "@fortawesome/free-solid-svg-icons";
import { faPauseCircle, faStopCircle } from "@fortawesome/free-regular-svg-icons";

import Status from "./Status/Status";
import Leaderboard from "./Leaderboard/Leaderboard";
import Motions from "./Motions/Motions";
import GameOver from "./GameOver/GameOver";

import "./App.scss";

const initialState = {loading: true, connection: "loading"};

const GAME_STATES = {
  LOBBY: "lobby",
  STOPPED: "stopped",
  PAUSED: "paused",
  LOADING: "loading",
  ACTIVE: "active",
};

function reducer(state, action) {
  switch (action.type) {
    case "connection":
      return {
        ...state,
        connection: action.connection
      };
    case "ws_message":
      return processMessage(state, action.message);
    default:
      console.warn("Unhandled reducer action", action);
  }
}

function processMessage(state, message) {
  const {type, data} = message;
  let value = {};

  switch (type) {
    case "heartbeat":
      value.heartbeat = new Date();
      break;
    default:
      value[type] = data;
      break;
  }
  return {...state, ...value, loading: false};
}

function App() {
  const socketUrl = `ws://${window.location.host}/socket`;

  const [socket] = useState(connect);
  const [state, dispatch] = useReducer(reducer, initialState);

  function connect() {
    return new Sockette(socketUrl, {
      timeout: 2000,
      onopen: onWsOpen,
      onmessage: onWsMessage,
      onreconnect: onWsOpen,
      onmaximum: onWsMaximum,
      onclose: onWsClosed,
      onerror: e => console.error("Error:", e)
    });
  }

  function onWsOpen(event) {
    console.log("Websocket connected");
    dispatch({
      type: "connection",
      connection: "connected"
    });

    socket.json({
      type: "init"
    });
  }

  function onWsMessage(e) {
    const json = JSON.parse(e.data);
    dispatch({
      type: "ws_message",
      message: json
    });
  }

  function onWsClosed(event) {
    dispatch({
      type: "connection",
      connection: "disconnected"
    });
  }

  function onWsMaximum(event) {
    dispatch({
      type: "connection",
      connection: "lost"
    });
  }

  function renderConnectionStatus() {
    if (state.connection === "connected") {
      return null;
    }

    return (
      <div className="connection-status">
        <FontAwesomeIcon icon={faSync} spin={true}/>
      </div>);
  }

  if (state.loading) {
    return (
      <div className="app">
        <div className="app-message-container">
          <div className="app-message">
            <h1><FontAwesomeIcon icon={faSpinner} spin={true}/> Loading...</h1>
          </div>
        </div>
      </div>
    );
  }

  const gameState = lodashGet(state.game, `state`);

  if (gameState === GAME_STATES.LOBBY) {
    return (
      <div className="app lobby">
        {renderConnectionStatus()}
        <h1 className="title">The game will start soon</h1>
      </div>
    );
  }

  if (gameState === GAME_STATES.PAUSED) {
    return (
      <div className="app">
        {renderConnectionStatus()}
        <div className="paused-status">
          <div className="status-message-container">
            <div className="status-message">
              <div className="icon"><FontAwesomeIcon icon={faPauseCircle}/></div>
              <div>Game paused</div>
            </div>
          </div>
        </div>
        <div className="main">
          <Motions game={state.game} stats={state.stats}/>
          <Leaderboard game={state.game} stats={state.stats} leaderboard={state.leaderboard}/>
        </div>
      </div>
    );
  }

  if (gameState === GAME_STATES.STOPPED) {
    return (
      <div className="app">
        {renderConnectionStatus()}
        <div className="stopped-status">
          <div className="status-message-container">
            <div className="status-message">
              <div className="icon"><FontAwesomeIcon icon={faStopCircle}/></div>
              <div>Game stopped</div>
            </div>
          </div>
        </div>
        <div className="main">
          <GameOver stats={state.stats}
                    successfulMotions={state.successfulMotions}
                    failedMotions={state.failedMotions}/>
          <Leaderboard game={state.game} stats={state.stats} leaderboard={state.leaderboard}/>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {renderConnectionStatus()}
      <Status game={state.game}
              stats={state.stats}
              successfulMotions={state.successfulMotions}
              failedMotions={state.failedMotions}/>
      <div className="main">
        <Motions game={state.game} stats={state.stats}/>
        <Leaderboard game={state.game} stats={state.stats} leaderboard={state.leaderboard}/>
      </div>
    </div>
  );
}

export default App;
