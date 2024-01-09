import React, { useEffect, useState } from "react";
import Achatt from "../components/Element/Achatt";
import ChatCard from "../components/Element/ChatCard";
import LoadingScreen from "../components/Fragment/LoadingScreen";
import axios from "axios";
import api from "../utils/api";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [dataCardArray, setDataCardArray] = useState([]);
  const [trigger, setTrigger] = useState(false);
  // const api = "https://c218-103-140-130-53.ngrok-free.app";
  useEffect(() => {
    async function cek() {
      await axios.get(api, {
        ithCredentials: true,
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });
    }
    cek();
    setTrigger((prev) => !prev);
  }, []);

  useEffect(() => {
    axios
      .get(`${api}/user/myid`, {
        withCredentials: true,
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((res) => {
        let { data } = res;
        if (data.code == 2) {
          setTimeout(() => {
            window.location.href = "/nologin";
          }, 2000);
        } else if (data.code == 1) {
          setUserId(data.userId);
          setIsLoading(false);
        }
      });
  }, [trigger]);

  // Mengambil data buat chatCard nya
  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        console.log("Haiya");
      }, 1000);
      try {
        const response = await axios.get(`${api}/user/allgroups`, {
          withCredentials: true,
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        });

        let groupNames = JSON.stringify(response.data.data);
        let groupNameArr = JSON.parse(groupNames);

        const requests = groupNameArr.map(async (item) => {
          const res = await axios.post(
            `${api}/chat/`,
            {
              purpose: "GETLAST",
              chatAddress: item,
            },
            {
              withCredentials: true,
              headers: {
                "ngrok-skip-browser-warning": "69420",
              },
            }
          );

          let { lastChat } = res.data;

          let groupName = item;
          let names = groupName.split("&");
          let str1 = names[0];
          let title =
            str1.toLowerCase() == userId.toLowerCase() ? names[1] : names[0];
          let index = await getPhotoIndex(title);

          return {
            cardTitle: title,
            cardSender: lastChat ? lastChat.from : " - ",
            cardLastChat: lastChat ? lastChat.chat : "Belum ada chat ...",
            groupName: item,
            photoIndex: index,
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
  }, [userId, trigger]);

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
      .querySelector(".card-title")
      .getAttribute("value");
    if (groupName.includes("&")) {
      let names = groupName.split("&");
      let title = names[0] == userId ? names[1] : names[0];
      window.location.href = `/beta?a=${groupName.replace(
        /&/g,
        "_"
      )}&title=${title}`;
    } else {
      window.location.href = `/beta?a=${groupName}`;
    }
    // window.location.href = `/beta?a=${groupName}`;

    // alert(`sender: ${e}`);
    // console.log(groupName);
  }

  function logoutHandler() {
    axios
      .get(`${api}/user/logout`, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
        withCredentials: true,
      })
      .then((data) => {
        alert("Telah logout: " + JSON.stringify(data.data));
        window.location.href = "/";
      });
  }

  async function plusHandler() {
    let userIdPrompt = prompt("Masukkan user ID tujuan: ");
    if (userIdPrompt) {
      if (userIdPrompt == userId) {
        alert("Nggak bisa nambahin diri sendiri :)");
        return;
      }
      let input = {
        userId: userId,
        userId2: userIdPrompt,
      };
      let response = await axios.post(`${api}/group/conversation`, input, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
        withCredentials: true,
      });
      let { code, message } = response.data;
      if (code == 1) {
        alert("Berhasil tambah chat!");
        setTrigger((prev) => !prev);
      } else {
        alert(`Something wrong: ${message}`);
      }
    } else {
      return;
    }
  }

  function profileHandler() {
    window.location.href = "/dashboard/profile";
  }

  async function getPhotoIndex(title) {
    let index = "global";

    if (title !== "global") {
      try {
        const response = await axios.post(
          `${api}/user/photo`,
          { userId: title },
          {
            withCredentials: true,
            headers: {
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );

        index = response.data.photoIndex.photoIndex;
        console.log(index);
        console.log(typeof index);
      } catch (error) {
        console.error("Error fetching photo index:", error);
        // Handle the error as needed
      }
    }

    return index;
  }

  // return <div>hq</div>;
  // /*
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
        // pembatas loading disini :)
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
            <div className="w-full mb-4 flex flex-row">
              <h1 className="flex-1">Dashboard &gt;</h1>
              <h1
                className="mr-8 brightness-100 font-bold hover:brightness-75 hover:cursor-pointer transition duration-200"
                onClick={profileHandler}
              >
                ☝️🤓My profile
              </h1>
            </div>
            <div className="chatList flex flex-col gap-2">
              {/* Cards */}
              {dataCardArray.map((item, index) => {
                let {
                  cardTitle,
                  cardSender,
                  cardLastChat,
                  groupName,
                  photoIndex,
                } = item;

                return (
                  <ChatCard
                    cardTitle={cardTitle}
                    cardSender={cardSender}
                    cardLastChat={cardLastChat}
                    photoIndex={photoIndex}
                    onClickHandler={cardHandler}
                    key={index}
                    value={groupName}
                  />
                );
              })}

              {/* End cards */}
            </div>
            <div
              onClick={plusHandler}
              className="addButton w-fit h-fit fixed bottom-10 right-5 brightness-100 drop-shadow-sm hover:drop-shadow-lg hover:brightness-75 hover:cursor-pointer transition duration-200"
            >
              <svg
                className="w-16"
                viewBox="0 0 24 24"
                fill="green"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="24" fill="none" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13 9C13 8.44772 12.5523 8 12 8C11.4477 8 11 8.44772 11 9V11H9C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H11V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V13H15C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11H13V9ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
                  fill="#323232"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  // */
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
