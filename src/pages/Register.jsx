import React from "react";
import axios from "axios";
import api from "../utils/api";

function Register() {
  function submitHandler(e) {
    e.preventDefault();
    // let api = "https://b808-114-79-6-41.ngrok-free.app";

    let userId = document.querySelector("input[name='userId']").value;
    let username = document.querySelector("input[name='username']").value;
    let password = document.querySelector("input[name='password']").value;

    let input = {
      userId: `${userId}`,
      username: `${username}`,
      password: `${password}`,
    };

    let inputJson = JSON.stringify(input);

    // pengecekan input userId, usename, password
    if (!input.userId) {
      alert("UserId tidak boleh kosong");
    } else if (!input.username) {
      alert("Username tidak boleh kosong");
    } else if (!input.password) {
      alert("Password tidak boleh kosong");
    } else {
      axios
        .post(`${api}/user/create`, inputJson, {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
          withCredentials: true,
        })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("Request gagal coy, status " + response.status);
          }
          let data = response.data;

          alert(data.message);
          let message = data.message;
          if (message == "UserId berhasil terbuat") {
            window.location.href = "/login";
          } else {
            alert("Something error: " + data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function directHandler(target) {
    window.location.href = target;
  }

  return (
    <div className="w-full h-auto min-h-screen flex justify-center items-center bg-gradient-to-bl from-pink-500 to-yellow-500">
      <form
        id="loginForm"
        className="mx-auto flex flex-col gap-y-5 bg-slate-200/40 backdrop-blur-sm drop-shadow-xl p-8 box-border font-sans text-lg rounded-xl"
      >
        <h1 className="text-2xl text-slate-700 font-mono font-bold border-b-4 border-slate-600 w-fit mx-auto px-4 mb-4">
          Create account
        </h1>
        <label htmlFor="userId" className="input-label">
          User Id
        </label>
        <input
          type="text"
          name="userId"
          className="input-input"
          placeholder="MyUserId"
        />
        <label htmlFor="username" className="input-label">
          Username
        </label>
        <input
          type="text"
          name="username"
          className="input-input"
          placeholder="MyUsername"
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
        <button className="submit-btn" onClick={submitHandler}>
          Register
        </button>
        <span
          className="input-label text-blue-900/80 text-center cursor-pointer drop-shadow-none transition duration-100 hover:text-slate-900/80 hover:drop-shadow-md hover:underline"
          onClick={() => directHandler("/login")}
        >
          Log in an account
        </span>
      </form>
    </div>
  );
}

export default Register;
