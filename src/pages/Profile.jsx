import React, { useState, useEffect } from "react";
import Achatt from "../components/Element/Achatt";
import axios from "axios";
import api from "../utils/api";

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [status, setStatus] = useState(null);
  const [username, setUsername] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(null);
  const [dateCreated, setCreated] = useState(null);
  const [userId, setUserId] = useState(null);
  const [init, setInit] = useState(false);
  const arrayIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

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
    setInit((prev) => !prev);
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
        if (data.code == 1) {
          setUserId(data.userId);
          setIsLoading(false);
        } else if (data.code == 2) {
          window.location.href = "/nologin";
        }
      });
  }, [init]);

  // useEffect(() => {
  //   if (userId) {
  //     setIsLoading(false);
  //     setTrigger();
  //   } else {
  //     setTimeout(() => {
  //       window.location.href = "/nologin";
  //     }, 3000);
  //   }
  // }, [userId]);

  useEffect(() => {
    async function fetchData() {
      await getDatas();
    }
    fetchData();
  }, [trigger]);

  async function getDatas() {
    await axios
      .get(`${api}/dashboard`, {
        withCredentials: true,
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((res) => {
        let resObj = res.data.rows;
        let datas = resObj[0];
        setPhotoIndex(datas.photoIndex);
        setUsername(datas.username);
        setStatus(datas.status);
        let dateString = datas.dateCreated;
        const dateObject = new Date(dateString);

        const monthNames = [
          "Januari",
          "Februari",
          "Maret",
          "April",
          "Mei",
          "Juni",
          "Juli",
          "Agustus",
          "September",
          "Oktober",
          "November",
          "Desember",
        ];

        const day = dateObject.getDate();
        const monthIndex = dateObject.getMonth();
        const year = dateObject.getFullYear();

        const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;
        setCreated(formattedDate);
      })
      .catch((err) => console.log(err));
  }

  function logoHandler() {
    let { pathname } = window.location;
    if (pathname == "/dashboard") {
      return;
    } else {
      alert("beda nih, redirect");
    }
  }

  function logoutHandler() {
    axios
      .get(`${api}/user/logout`, {
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

  async function plusHandler() {
    document.getElementById("editModal").classList.toggle("hidden");
  }

  function profileHandler() {
    window.location.href = "/dashboard";
  }

  function closeModal() {
    document.getElementById("editModal").classList.add("hidden");
  }

  function ppHandler(index) {
    setSelectedImage(selectedImage === index ? null : index);
  }

  function saveEditHandler() {
    let usernameInput = document.getElementById("usernameInput").value;
    let statusInput = document.getElementById("statusInput").value;
    let photoIndex = selectedImage;

    let jsonBody = {
      userId: userId,
    };

    if (usernameInput) {
      jsonBody.username = usernameInput;
    }

    if (statusInput) {
      jsonBody.status = statusInput;
    }

    if (photoIndex) {
      jsonBody.photoIndex = photoIndex;
    }

    axios
      .post(`${api}/user/update`, jsonBody, {
        withCredentials: true,
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then(() => {
        alert("Update berhasil");
        location.reload();
      })
      .catch((err) => alert(`Something error: ${err}`));
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
              <h1 className="flex-1">Dashboard &gt; profile</h1>
              <h1
                className=" brightness-100 font-bold hover:brightness-75 hover:cursor-pointer transition duration-200"
                onClick={profileHandler}
              >
                Ke Dashboard
              </h1>
            </div>
            <div className="profileSettings flex flex-col gap-2  px-14 max-w-2xl mx-auto">
              <div className="overflow-hidden w-40 h-40 mb-4 self-center rounded-full border-2 border-slate-500 drop-shadow-md aspect-square">
                {photoIndex !== null ? (
                  <img
                    className="w-full h-full"
                    src={`../img/pps/${photoIndex}.webp`}
                    alt="profile picture"
                  />
                ) : (
                  <div className="flex justify-center items-center h-full w-full">
                    Loading...
                  </div>
                )}
              </div>
              <div>
                <h2 className="font-bold text-lg">🪪 UserId</h2>
                <p className="ml-8">{userId}</p>
              </div>
              <div>
                <h2 className="font-bold text-lg">🧌 Username</h2>
                <p className="ml-8 text-base">{username}</p>
              </div>
              <div>
                <h2 className="font-bold text-lg">🤔 Status</h2>
                <p className="ml-8 text-base">{status}</p>
              </div>
              <div>
                <h2 className="font-bold text-lg">⏱️ Created at</h2>
                <p className="ml-8 text-base">{dateCreated}</p>
              </div>
            </div>
            <div
              onClick={plusHandler}
              className="addButton w-fit h-fit fixed bottom-10 right-5 brightness-100 drop-shadow-sm hover:drop-shadow-lg hover:brightness-75 hover:cursor-pointer transition duration-200"
            >
              <svg
                className="w-16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle opacity="0.5" cx="12" cy="12" r="10" fill="#1C274C" />
                <path
                  d="M13.9261 14.3018C14.1711 14.1107 14.3933 13.8885 14.8377 13.4441L20.378 7.90374C20.512 7.7698 20.4507 7.53909 20.2717 7.477C19.6178 7.25011 18.767 6.82414 17.9713 6.02835C17.1755 5.23257 16.7495 4.38186 16.5226 3.72788C16.4605 3.54892 16.2298 3.48761 16.0959 3.62156L10.5555 9.16192C10.1111 9.60634 9.88888 9.82854 9.69778 10.0736C9.47235 10.3626 9.27908 10.6753 9.12139 11.0062C8.98771 11.2867 8.88834 11.5848 8.68959 12.181L8.43278 12.9515L8.02443 14.1765L7.64153 15.3252C7.54373 15.6186 7.6201 15.9421 7.8388 16.1608C8.0575 16.3795 8.38099 16.4559 8.67441 16.3581L9.82308 15.9752L11.0481 15.5668L11.8186 15.31L11.8186 15.31C12.4148 15.1113 12.7129 15.0119 12.9934 14.8782C13.3243 14.7205 13.637 14.5273 13.9261 14.3018Z"
                  fill="#1C274C"
                />
                <path
                  d="M22.1127 6.16905C23.2952 4.98656 23.2952 3.06936 22.1127 1.88687C20.9302 0.704377 19.013 0.704377 17.8306 1.88687L17.6524 2.06499C17.4806 2.23687 17.4027 2.47695 17.4456 2.7162C17.4726 2.8667 17.5227 3.08674 17.6138 3.3493C17.796 3.87439 18.14 4.56368 18.788 5.21165C19.4359 5.85961 20.1252 6.20364 20.6503 6.38581C20.9129 6.4769 21.1329 6.52697 21.2834 6.55399C21.5227 6.59693 21.7627 6.51905 21.9346 6.34717L22.1127 6.16905Z"
                  fill="#1C274C"
                />
              </svg>
            </div>
          </div>
          {/* Elemen setting profile */}
          <div
            id="editModal"
            className="hidden bg-slate-700 bg-opacity-60 absolute top-0 bottom-0 right-0 left-0 flex flex-col justify-center items-center"
          >
            <p
              className="text-2xl -mt-6 mb-6 font-bold text-quietLight underline hover:cursor-pointer"
              onClick={closeModal}
            >
              Cancel
            </p>
            <div className="mainEdit flex flex-col w-80 h-[512px] bg-quietLight px-2 py-3 rounded-md">
              <div>
                <h1 className="text-lg font-semibold text-center">
                  Edit information
                </h1>
              </div>
              <div className="flex-1 bg-white rounded-md p-4 overflow-auto grid grid-cols-2 gap-2">
                {arrayIndex.map((item) => {
                  return (
                    <img
                      className={`rounded-md h-full hover:cursor-pointer ${
                        selectedImage === item ? "brightness-50" : ""
                      }`}
                      src={`../img/pps/${item}.webp`}
                      alt="image"
                      key={item}
                      onClick={() => ppHandler(item)}
                    />
                  );
                })}
              </div>
              <div className="flex flex-col">
                <label htmlFor="usernameInput">username</label>
                <textarea
                  name="usernameInput"
                  id="usernameInput"
                  cols="30"
                  rows="1"
                  className="resize-none p-1 mb-4 rounded-md"
                  placeholder={username}
                ></textarea>
                <label htmlFor="statusInput">status</label>
                <textarea
                  name="statusInput"
                  id="statusInput"
                  cols="30"
                  rows="1"
                  className="resize-none p-1 mb-4 rounded-md"
                  placeholder={status}
                ></textarea>
                <button
                  className="bg-red-500 text-quietLight font-semibold rounded-md"
                  onClick={saveEditHandler}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
