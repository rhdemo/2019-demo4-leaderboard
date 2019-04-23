import React, { useState, useReducer } from "react";
import Sockette from "sockette";
import lodashGet from "lodash/get";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faSync } from "@fortawesome/free-solid-svg-icons";

import Leaderboard from "./Leaderboard/Leaderboard";
import Motions from "./Motions/Motions";
import PauseScreen from "./PauseScreen/PauseScreen";
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

  function renderMain() {
    if (state.loading) {
      return (
        <div className="app message">
          <h1><FontAwesomeIcon icon={faSpinner} spin={true}/> Loading...</h1>
        </div>
      );
    }

    const gameState = lodashGet(state.game, `state`);

    if (gameState === GAME_STATES.LOBBY) {
      return (
        <div className="app message">
          <h1 className="title">It's time to Wreck it!</h1>
          <h3 className="title">Waiting for the game to start...</h3>
        </div>
      );
    }

    if (gameState === GAME_STATES.PAUSED) {
      return (
        <div className="main">
          <Leaderboard game={state.game} stats={state.stats} leaderboard={state.leaderboard}/>
          <PauseScreen/>
        </div>
      );
    }

    if (gameState === GAME_STATES.STOPPED) {
      return (
        <div className="main">
          <Leaderboard game={state.game} stats={state.stats} leaderboard={state.leaderboard}/>
          <GameOver/>
        </div>
      );
    }

    return (
      <div className="main">
        <Leaderboard game={state.game} stats={state.stats} leaderboard={state.leaderboard}/>
        <Motions game={state.game} stats={state.stats}/>
      </div>
    );
  }

  return (
    <div className="app">
      {renderConnectionStatus()}
      {renderMain()}
    </div>
  );
}

export default App;
