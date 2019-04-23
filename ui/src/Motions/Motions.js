import React from "react";
import Card from "./Card";

import "./Motions.scss";


const MOTIONS = [
  {
    gesture: "shake",
    name: "Shake"
  },
  {
    gesture: "circle",
    name: "Circle"
  },
  {
    gesture: "x",
    name: "X"
  },
  {
    gesture: "roll",
    name: "Roll"
  },
  {
    gesture: "fever",
    name: "Fever"
  },
  {
    gesture: "floss",
    name: "Floss"
  },
];


function Motions({game, stats}) {

  return (
    <div className="motions ">
      {MOTIONS.map((m, index) => <Card key={index} game={game} motion={m}/>)}
    </div>
  );
}

export default Motions;
