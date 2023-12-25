import React from "react";

function Achatt({ containerClass, addClass, onClickHandler }) {
  return (
    <div
      className={
        containerClass || `${addClass} text-4xl font-mono font-bold ml-2`
      }
      onClick={onClickHandler}
    >
      <span className="text-orange-200">A</span>
      <span className="text-blue-300">Chatt</span>
    </div>
  );
}

export default Achatt;
