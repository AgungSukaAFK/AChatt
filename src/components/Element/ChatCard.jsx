import React from "react";

function ChatCard({ cardTitle, cardSender, cardLastChat, onClickHandler }) {
  return (
    <div
      onClick={onClickHandler}
      className="card-container flex flex-col p-2 bg-white shadow-md brightness-100 rounded-md hover:cursor-pointer hover:brightness-[0.8] transition duration-200"
    >
      <h1 className="card-title text-lg font-bold text-slate-700">
        {cardTitle}
      </h1>
      <div className="chat flex flex-row text-base text-slate-600">
        <p className="card-sender font-semibold whitespace-nowrap">
          {cardSender}
        </p>
        <span className="mx-1">:</span>
        <p className="card-chat overflow-hidden whitespace-nowrap text-ellipsis">
          "{cardLastChat}"
        </p>
      </div>
    </div>
  );
}

export default ChatCard;
