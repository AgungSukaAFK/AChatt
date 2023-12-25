import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

// Elements
import Achatt from "../components/Element/Achatt";
import ChatCardBeta from "../components/Fragment/ChatCardBeta";

function ChatBeta() {
  const [chatAddress, setChatAddress] = useState(null);
  const [userId, setUserId] = useState(null);
  const [chatsArr, setChatsArr] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const a = new URLSearchParams(location.search).get("a");
    let updatedParam = a.replace(/_/g, "&");
    setChatAddress(updatedParam);

    if (document.cookie) {
      let userIdCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("userId="));
      let userIdRaw = userIdCookie.split("=")[1];
      setUserId(userIdRaw);
    } else {
      window.location.href = "/nologin";
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post("http://localhost:4000/chat/", {
        purpose: "GET",
        chatAddress: chatAddress,
      });

      const rawArr = response.data.chats;
      let updatedArr = [];
      rawArr.forEach((item) => {
        updatedArr.push({
          message: item.chat,
          from: item.from,
          isMe: userId == item.from,
        });
      });
      setChatsArr(updatedArr);
    };
    if (chatAddress) {
      fetchData();
    }
  }, [chatAddress]);

  // const a = new URLSearchParams.use();
  let dummyChats = [
    { from: "Agung", message: "Haloo Achatt!", isMe: true },
    {
      from: "JKidZ_2",
      message:
        "Saya mau makan siang gratis pake asam sulfat supaya tidak stunting",
      isMe: false,
    },
  ];

  function sendHandler() {
    let currentUser = "Agung";
    let elementInput = document.getElementById("chatInput");
    let message = elementInput.value;
    elementInput.value = "";
    alert([currentUser, message]);
  }

  function backHandler() {
    window.location.href = "/dashboard";
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Bagian header chat */}
      <div className="flex-none flex flex-row w-full justify-between p-4 box-border bg-quietLight">
        <p className="hover:cursor-pointer" onClick={backHandler}>
          &lt;
        </p>
        <p className="font-bold text-lg">Username</p>
        <div className="w-8 rounded-full bg-black h-8"></div>
      </div>

      {/* Bagian isi chat */}
      <div className="chatM flex-1 flex flex-col gap-2 bg-quietLight overflow-auto">
        {/* Bikin chat card nya */}
        {chatsArr.map((item, index) => {
          return (
            <ChatCardBeta
              key={index}
              from={item.from}
              message={item.message}
              isMe={item.isMe}
            />
          );
        })}
      </div>

      {/* Bagian input teks */}
      <div className="chatBottom flex-none bg-white h-20 flex flex-row items-center gap-2 px-4 box-border">
        <textarea
          name="chatTextArea"
          rows={1}
          id="chatInput"
          placeholder="Ketik pesan ..."
          className="flex-1 resize-none w-full h-auto outline-none py-2 px-1 rounded-lg"
        ></textarea>
        <button
          className="text-xl bg-red-500 rounded-full p-1"
          onClick={sendHandler}
        >
          💬
        </button>
      </div>
    </div>
  );
}

export default ChatBeta;
