import React from "react";
import { ReactComponent as IconShake } from '../assets/img/icon-shake.svg';
import { ReactComponent as IconCircle } from '../assets/img/icon-circle.svg';
import { ReactComponent as IconX } from '../assets/img/icon-x.svg';
import { ReactComponent as IconRoll } from '../assets/img/icon-roll.svg';
import { ReactComponent as IconFever } from '../assets/img/icon-fever.svg';
import { ReactComponent as IconFloss } from '../assets/img/icon-floss.svg';
import Card from "./Card";

import "./Motions.scss";


const MOTIONS = [
  {
    gesture: "shake",
    name: "Shake",
    icon: <IconShake/>
  },
  {
    gesture: "circle",
    name: "Circle",
    icon: <IconCircle/>
  },
  {
    gesture: "x",
    name: "X",
    icon: <IconX/>
  },
  {
    gesture: "roll",
    name: "Roll",
    icon: <IconRoll/>
  },
  {
    gesture: "fever",
    name: "Fever",
    icon: <IconFever/>
  },
  {
    gesture: "floss",
    name: "Floss",
    icon: <IconFloss/>
  },
];


function Motions({game}) {

  return (
    <div className="motions ">
      {MOTIONS.map((m, index) => <Card key={index} game={game} motion={m}/>)}
    </div>
  );
}

export default Motions;
