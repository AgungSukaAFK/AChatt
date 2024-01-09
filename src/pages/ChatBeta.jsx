import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import api from "../utils/api";

// Elements
import Achatt from "../components/Element/Achatt";
import ChatCardBeta from "../components/Fragment/ChatCardBeta";

function ChatBeta() {
  const chatContainerRef = useRef(null);

  const [chatAddress, setChatAddress] = useState(null);
  const [userId, setUserId] = useState(null);
  const [chatsArr, setChatsArr] = useState([]);
  const [trigger, setTrigger] = useState("init");
  const [chatTitle, setTitle] = useState(null);
  const [init, setInit] = useState(false);
  const [fetchChat, setFetchChat] = useState(false);
  const [loopChat, setLoopChat] = useState(false);
  const [pIndex, setPIndex] = useState(null);
  const location = useLocation();
  // const api = "https://b808-114-79-6-41.ngrok-free.app";

  useEffect(() => {
    async function cek() {
      await axios.get(api, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
        withCredentials: true,
      });
    }
    cek();
    setInit((prev) => !prev);
  }, []);

  useEffect(() => {
    axios
      .get(`${api}/user/myid`, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
        withCredentials: true,
      })
      .then((res) => {
        let { data } = res;
        if (data.code == 2) {
          setTimeout(() => {
            window.location.href = "/nologin";
          }, 2000);
        } else if (data.code == 1) {
          setUserId(data.userId);
        }
      });
  }, [init]);

  useEffect(() => {
    const paramRaw = window.location.search;
    const param = paramRaw.replace("?", "");
    const aParam = new URLSearchParams(param).get("a");
    let updatedParam = aParam;

    if (param.includes("&")) {
      let params = param.split("&");
      let aValue = params[0].split("=")[1];
      let tValue = params[1].split("=")[1];
      setTitle(tValue);
      updatedParam = aParam.replace(/_/g, "&");
    } else {
      setTitle(updatedParam);
    }

    setChatAddress(updatedParam);
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${api}/chat/`,
          {
            purpose: "GET",
            chatAddress: chatAddress,
          },
          {
            headers: {
              "ngrok-skip-browser-warning": "69420",
            },
            withCredentials: true,
          }
        );

        // Pastikan response.data dan response.data.chats tidak undefined
        const rawArr = response.data && response.data.chats;

        if (rawArr) {
          let updatedArr = [];
          rawArr.forEach((item) => {
            updatedArr.push({
              message: item.chat,
              from: item.from,
              isMe: userId == item.from,
            });
          });
          setChatsArr(updatedArr);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error if needed
      }
    };

    fetchData();
  }, [chatAddress, fetchChat, userId]);

  useEffect(() => {
    const sinkron = setInterval(() => {
      setFetchChat((prev) => !prev);
      // if (chatAddress) {
      // }
    }, 1000);
    return () => clearInterval(sinkron);
  }, [loopChat]);

  useEffect(() => {
    if (trigger == "init") {
      return;
    } else {
      setLoopChat((prev) => !prev);
    }
  }, [chatsArr]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatsArr]);

  useEffect(() => {
    async function fetchData() {
      if (chatTitle == "global") {
        setPIndex("global");
      } else {
        axios
          .post(
            `${api}/dashboard/pindex`,
            { userId: chatTitle },
            {
              withCredentials: true,
              headers: {
                "ngrok-skip-browser-warning": "69420",
              },
            }
          )
          .then((res) => {
            let obj = res.data.row[0];
            setPIndex(obj.photoIndex);
          });
      }
    }
    if (chatTitle) {
      fetchData();
    }
  }, [chatTitle]);

  async function sendHandler() {
    if (!document.cookie) {
      window.location.href = "/nologin";
      return;
    }
    let elementInput = document.getElementById("chatInput");
    let message = elementInput.value;
    if (message) {
      elementInput.value = "";

      let inputJson = {
        purpose: "POST",
        chatAddress: chatAddress,
        from: userId,
        chat: message,
      };
      const response = await axios.post(`${api}/chat/`, inputJson, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
        withCredentials: true,
      });
      let [code, messageRes] = [response.data.code, response.data.message];
      if (code == 1) {
        // refresh
        setFetchChat((prev) => !prev);
        // if (trigger == "init") {
        //   setTrigger(true);
        // } else {
        //   setTrigger((prev) => !prev);
        // }
      } else if (code == 2) {
        console.log(`Err: ${messageRes}`);
      }
    }
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
        <p className="font-bold text-lg">{chatTitle}</p>
        <div className="w-8 rounded-full h-8 overflow-hidden">
          {pIndex !== null ? (
            <img
              className="w-auto h-full"
              src={`../img/pps/${pIndex}.webp`}
              alt="pp"
            />
          ) : (
            <div>Loading ...</div>
          )}
        </div>
      </div>

      {/* Bagian isi chat */}
      <div
        className="chatM flex-1 flex flex-col gap-2 pb-2 bg-quietLight overflow-auto"
        ref={chatContainerRef}
      >
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
