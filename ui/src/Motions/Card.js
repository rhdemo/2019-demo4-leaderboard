import React from "react";
import classNames from 'classnames';
import lodashGet from "lodash/get";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";


function Card({game, motion}) {

  let showGesture = lodashGet(game, `motions.${motion.gesture}`);

  if (!showGesture) {
    return (
      <div className={classNames("card", "unknown")}>
        <span><FontAwesomeIcon icon={faQuestionCircle}/></span>
      </div>);
  }

  return (
    <div className={classNames("card", motion.gesture)}>
      <h1>{motion.name}</h1>
    </div>
  );
}

export default Card;
