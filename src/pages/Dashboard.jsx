import React, { useEffect, useState } from "react";
import Achatt from "../components/Element/Achatt";
import ChatCard from "../components/Element/ChatCard";
import LoadingScreen from "../components/Fragment/LoadingScreen";
import axios from "axios";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataCardArray, setDataCardArray] = useState([]);

  let userId;
  let userIdCookie;
  if (document.cookie) {
    userIdCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("userId="));
    userId = userIdCookie.split("=")[1];
  }

  useEffect(() => {
    if (userIdCookie) {
      setIsLoading(false);
    } else {
      setTimeout(() => {
        window.location.href = "/nologin";
      }, 3000);
    }
  }, []);

  // Mengambil data buat chatCard nya
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/user/allgroups",
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        let groupNames = JSON.stringify(response.data.data);
        let groupNameArr = JSON.parse(groupNames);

        const requests = groupNameArr.map(async (item) => {
          const res = await axios.post(
            "http://localhost:4000/chat/",
            {
              purpose: "GETLAST",
              chatAddress: item,
            },
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }
          );

          let { lastChat } = res.data;

          return {
            cardTitle: item,
            cardSender: lastChat ? lastChat.from : null,
            cardLastChat: lastChat ? lastChat.chat : null,
          };
        });

        const updatedDataCardArray = await Promise.all(requests);
        setDataCardArray(updatedDataCardArray);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  function logoHandler() {
    let { pathname } = window.location;
    if (pathname == "/dashboard") {
      return;
    } else {
      alert("beda nih, redirect");
    }
  }

  function cardHandler(e) {
    let groupName = e.target
      .closest(".card-container")
      .querySelector(".card-title").innerHTML;

    // window.location.href = `/beta?a=${encodeURIComponent(groupName)}`;
    window.location.href = `/beta?a=${groupName.replace(/&/g, "_")}`;

    // alert(`sender: ${e}`);
    // console.log(groupName);
  }

  function logoutHandler() {
    axios
      .get("http://localhost:4000/user/logout", {
        withCredentials: true,
        headers: {
          "Content-Type": "applicaiton/json",
        },
      })
      .then((data) => {
        alert("Telah logout: " + data.data);
        window.location.href = "/";
      });
  }

  return (
    <div>
      {isLoading ? (
        <div
          className={`loading-container w-screen h-screen fixed flex justify-center items-center z-30 bg-slate-800/70`}
        >
          <div className="loading-div flex justify-center items-center z-10 text-2xl bg-slate-800 text-white"></div>
          <span className="absolute text-xl font-bold text-white z-20 font-mono">
            Loading
          </span>
        </div>
      ) : (
        <div className="flex flex-col bg-[#FAF9FF] h-screen w-screen box-border">
          <div className="navbar flex flex-row items-center px-4 bg-[#0D2646] h-16 box-border border-b-8 border-teal-600">
            <div
              className="logo w-fit hover:cursor-pointer"
              onClick={logoHandler}
            >
              <Achatt />
            </div>
            <div className="flex-1"></div>
            {/* svg logout */}
            <div className="flex flex-row brightness-100 transition duration-200 hover:cursor-pointer hover:brightness-[1.25]">
              <p
                className="text-slate-300 mr-2 brightness-100 hover:brightness-75 hover:cursor-pointer transition duration-200"
                onClick={logoutHandler}
              >
                Logout
              </p>
              <div className="w-6">
                <svg
                  className="fill-red-400"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.2929 14.2929C16.9024 14.6834 16.9024 15.3166 17.2929 15.7071C17.6834 16.0976 18.3166 16.0976 18.7071 15.7071L21.6201 12.7941C21.6351 12.7791 21.6497 12.7637 21.6637 12.748C21.87 12.5648 22 12.2976 22 12C22 11.7024 21.87 11.4352 21.6637 11.252C21.6497 11.2363 21.6351 11.2209 21.6201 11.2059L18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289C16.9024 8.68342 16.9024 9.31658 17.2929 9.70711L18.5858 11H13C12.4477 11 12 11.4477 12 12C12 12.5523 12.4477 13 13 13H18.5858L17.2929 14.2929Z" />
                  <path d="M5 2C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H14.5C15.8807 22 17 20.8807 17 19.5V16.7326C16.8519 16.647 16.7125 16.5409 16.5858 16.4142C15.9314 15.7598 15.8253 14.7649 16.2674 14H13C11.8954 14 11 13.1046 11 12C11 10.8954 11.8954 10 13 10H16.2674C15.8253 9.23514 15.9314 8.24015 16.5858 7.58579C16.7125 7.4591 16.8519 7.35296 17 7.26738V4.5C17 3.11929 15.8807 2 14.5 2H5Z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="main box-border h-full p-4 bg-quietLight overflow-auto">
            <h1 className="mb-4">Dashboard &gt;</h1>
            <div className="chatList flex flex-col gap-2">
              {/* Cards */}
              {dataCardArray.map((item, index) => {
                let { cardTitle, cardSender, cardLastChat } = item;

                return (
                  <ChatCard
                    cardTitle={cardTitle}
                    cardSender={cardSender}
                    cardLastChat={cardLastChat}
                    onClickHandler={cardHandler}
                    key={index}
                  />
                );
              })}
              {/* // <ChatCard
              //   cardTitle={"global"}
              //   cardSender={"Agung Tampar"}
              //   cardLastChat={
              //     "Halo mau makan apa guys lorem ipsum dolor sit amet adipasicing elit."
              //   }
              //   onClickHandler={cardHandler}
              // /> */}

              {/* End cards */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

// Rencana dashboard:
/*
1. Menampilkan halo username, userid.
2. Menampilkan status
3. Menampilkan orang yang online
4. Menampilkan daftar group chat atau server yang tersedia
5. Menampilkan Moderator uang online
6. Menampilkan news untuk webnya
7. kalau /dashboard menampilkan data sendiri, kalau /dashboard/userId menampilkan profile orang lain
8. FIX RESPONSIVENYA
*/
