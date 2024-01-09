import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../utils/api";

function ChatCardBeta({ from, message, isMe }) {
  const [index, setIndex] = useState(null);
  const bgColor = isMe ? "bg-lightMyChat" : "bg-lightOtherChat";
  const alignElement = isMe ? "self-end" : "self-start";
  const row = isMe ? "flex-row-reverse" : "flex-row";

  useEffect(() => {
    async function fetchData(userId) {
      await axios
        .post(`${api}/dashboard/pindex`, { userId }, { withCredentials: true })
        .then((res) => {
          let obj = res.data.row[0];
          setIndex(obj.photoIndex);
        });
    }

    fetchData(from);
  }, []);

  return (
    <div
      className={`chatCard flex ${row} ${bgColor} text-white font-sans w-fit max-w-[70%] rounded-lg mx-2 p-2 gap-2 ${alignElement}`}
    >
      <div className={`w-12 h-12 overflow-hidden rounded-md`}>
        {index !== null ? (
          <img
            className="h-full"
            src={`../img/pps/${index}.webp`}
            alt="image"
          />
        ) : (
          <div>Load</div>
        )}
      </div>
      <div className="flex flex-col">
        <h2 className={`text-base font-semibold ${alignElement}`}>{from}</h2>
        <p
          className="text-base text-justify"
          style={{ textAlignLast: "left", textJustify: "distribute" }}
        >
          {message}
        </p>
      </div>
    </div>
  );
}

export default ChatCardBeta;
