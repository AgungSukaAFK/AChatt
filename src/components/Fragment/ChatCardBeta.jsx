import React from "react";

function ChatCardBeta({ from, message, isMe }) {
  const bgColor = isMe ? "bg-lightMyChat" : "bg-lightOtherChat";
  const alignElement = isMe ? "self-end" : "self-start";
  return (
    <div
      className={`chatCard flex flex-col ${bgColor} text-white font-sans w-fit max-w-[70%] rounded-lg mx-2 p-2 ${alignElement}`}
    >
      <h2 className={`text-base font-semibold ${alignElement}`}>{from}</h2>
      <p
        className="text-base text-justify"
        style={{ textAlignLast: "left", textJustify: "distribute" }}
      >
        {message}
      </p>
    </div>
  );
}

export default ChatCardBeta;
