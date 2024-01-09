import React from "react";
import axios from "axios";
import { useEffect } from "react";
import api from "../utils/api";

function Login() {
  // const api = "http://localhost:4000";
  // const api = "https://b808-114-79-6-41.ngrok-free.app";

  useEffect(() => {
    async function cek() {
      await axios.get(api);
    }
    cek();
  }, []);

  function getAllCookies() {
    const cookies = document.cookie.split("; ");
    const allCookie = {};

    cookies.forEach((cookie) => {
      const [name, value] = cookie.split("=");
      allCookie[name] = value;
    });

    return allCookie;
  }

  async function submitHandler(e) {
    let userId = document.querySelector("input[name='userId']").value;
    let password = document.querySelector("input[name='password']").value;
    let loadingContainer = document.querySelector(".loading-container");
    e.preventDefault();
    loadingContainer.classList.remove("hidden");

    let input = {
      userId: `${userId}`,
      password: `${password}`,
    };

    let inputJson = JSON.stringify(input);

    if (input.password == "") {
      loadingContainer.classList.add("hidden");
      alert("Password tidak boleh kosong");
    } else if (input.userId == "") {
      loadingContainer.classList.add("hidden");
      alert("Input UserId tidak boleh kosong");
    } else {
      await axios
        .post(`${api}/user/login`, inputJson, {
          headers: {
            "content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("Request gagal coy, status " + response.status);
          }
          loadingContainer.classList.add("hidden");
          let { code, message } = response.data;
          // console.log(`dari response: ${message}`);
          if (code == 1) {
            // window.location.href = "/dashboard/profile";
            // alert("okay");
            window.location.href = "/dashboard";
          } else if (code == 2) {
            alert("Something wrong: " + message);
          } else if (code == 3) {
            alert(
              `Terdeteksi: ${message}\nTekan oke akan dialihkan ke halaman dashboard`
            );
            window.location.href = "/dashboard";
          } else {
            alert(`Error login: ${message}`);
            return;
          }
          // console.log(response.data);
          // window.location.href = "/beta";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function showHandler() {
    let inputPassword = document.querySelector("input[name='password'");

    let e = document.querySelector(".showhide");
    if (inputPassword.type == "text") {
      inputPassword.type = "password";
      document.querySelector("input[name='password'").placeholder = "*****";
      e.innerHTML = "Show password 🔒";
    } else {
      inputPassword.type = "text";
      document.querySelector("input[name='password'").placeholder = "Haiya";
      e.innerHTML = "Hide password 🔓";
    }
  }

  function directHandler(target) {
    window.location.href = target;
  }

  return (
    <div className="w-full h-auto min-h-screen flex justify-center items-center bg-gradient-to-tr from-pink-500 to-yellow-500">
      <div className="loading-container hidden w-screen h-screen fixed flex justify-center items-center z-30 bg-slate-800/50">
        <div className="loading-div flex justify-center items-center z-10 text-2xl bg-slate-800 text-white"></div>
        <span className="absolute text-xl font-bold text-white z-20 font-mono">
          Loading
        </span>
      </div>
      <form
        id="loginForm"
        className="mx-auto flex flex-col gap-y-5 bg-slate-200/40 backdrop-blur-sm drop-shadow-xl p-8 box-border font-sans text-lg rounded-xl"
      >
        <h1 className="text-2xl text-slate-700 font-mono font-bold border-b-4 border-slate-600 w-fit mx-auto px-4 mb-4">
          Login page
        </h1>
        {/* <span className='text-sm -mt-8 text-center'>by aogung</span> */}
        <label htmlFor="userId" className="input-label">
          User Id
        </label>
        <input
          type="text"
          name="userId"
          className="input-input"
          placeholder="MyUserId"
        />
        <label htmlFor="password" className="input-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="input-input"
          placeholder="*****"
        />
        <span
          className="w-fit flex ml-auto -mt-4 text-base font-semibold drop-shadow-md border-b-2 border-blue-700 text-blue-700 cursor-pointer hover:text-slate-900 showhide"
          onClick={showHandler}
        >
          Show password🔒
        </span>
        <button className="submit-btn" onClick={submitHandler}>
          Log In
        </button>
        <span
          className="input-label text-blue-900/80 text-center cursor-pointer drop-shadow-none transition duration-100 hover:text-slate-900/80 hover:drop-shadow-md hover:underline"
          onClick={() => directHandler("/register")}
        >
          Create an account
        </span>
      </form>
    </div>
  );
}

export default Login;
