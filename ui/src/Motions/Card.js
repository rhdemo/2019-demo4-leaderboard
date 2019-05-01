import React from "react";
import classNames from 'classnames';
import lodashGet from "lodash/get";


function Card({game, motion}) {

  let showGesture = lodashGet(game, `motions.${motion.gesture}`);

  if (!showGesture) {
    return <div className={classNames("card", "unknown")}/>;
  }

  return (
    <div className={classNames("card", motion.gesture)}>
      <div className="motion-title">{motion.name}</div>
      <div className={classNames("motion-icon", motion.gesture)}>{motion.icon}</div>
    </div>
  );
}

export default Card;
