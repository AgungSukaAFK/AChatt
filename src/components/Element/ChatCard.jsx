import React from "react";
import api from "../../utils/api";
import axios from "axios";

function ChatCard({
  cardTitle,
  cardSender,
  cardLastChat,
  onClickHandler,
  value,
  photoIndex,
}) {
  return (
    <div
      onClick={onClickHandler}
      className="card-container flex flex-row p-2 gap-x-2 bg-white shadow-md brightness-100 rounded-md hover:cursor-pointer hover:brightness-[0.8] transition duration-200 border border-black md:p-4 md:gap-x-4"
    >
      <div className="w-10 h-auto aspect-square rounded-lg overflow-hidden object-fill my-auto md:w-14 drop-shadow-lg">
        <img
          className="w-full h-full"
          src={`img/pps/${photoIndex}.webp`}
          alt="global"
        />
      </div>
      <div>
        <h1
          className="card-title text-lg font-bold text-slate-700 md:text-xl"
          value={value}
        >
          {cardTitle}
        </h1>
        <div className="chat flex flex-row text-base text-slate-600">
          <p className="card-sender font-semibold whitespace-nowrap text-base md:text-lg">
            {cardSender}
          </p>
          <span className="mx-1">:</span>
          <p className="card-chat overflow-hidden whitespace-nowrap text-ellipsis text-base md:text-lg">
            "{cardLastChat}"
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatCard;
