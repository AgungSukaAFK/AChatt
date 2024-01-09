import Aos from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../components/Fragment/LoadingScreen";

function Home() {
  function loginHandler() {
    showLoading();
    window.location.href = "/login";
  }

  function signupHandler() {
    showLoading();
    window.location.href = "/register";
  }

  function showLoading() {
    document.querySelector(".loading-container").classList.remove("hidden");
  }

  useEffect(() => {
    let element = document.getElementById("change");

    let m = ["ACHATT", "Chat dimanapun", "Komunikasi", "Bakwan Jagung"];
    let i = 0;
    let j = 0;
    let gas = true;
    async function type() {
      if (i < m[j].length && gas) {
        element.innerHTML += m[j].charAt(i);
        i++;
        await new Promise((resolve) => {
          setTimeout(resolve, 100);
        });
        type();
      } else if (gas) {
        gas = false;
        setTimeout(() => {
          i = 0;
          if (j === m.length - 1) {
            j = 0;
          } else {
            j++;
          }

          element.innerHTML = "";
          gas = true;
          setTimeout(type, 100);
        }, 3000);
      }
    }

    Aos.init();

    if (gas) {
      setTimeout(() => {
        element.innerHTML = "";
        type();
      }, 3000);
    }

    return () => {
      gas = false;
    };
  }, []);

  return (
    // <div className='bg-gradient-to-br from-indigo-700 to-fuchsia-600 w-full h-screen flex justify-center'>
    <div className="bg-gradient-to-tr from-blue-500 via-purple-500 to-yellow-300 w-full h-screen flex justify-center overflow-hidden">
      <LoadingScreen classAdd={"loading-container"} />

      <div className="flex flex-col justify-center home-container w-full h-[90%] md:p-10 md:max-w-4xl">
        {/* Bagian logo AChatt */}
        <div
          data-aos="fade-up"
          className="flex flex-row justify-center mb-8 drop-shadow-md"
        >
          <svg
            role="img"
            width={40}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#cbd5e1"
              d="M11.999 0c-2.25 0-4.5.06-6.6.21a5.57 5.57 0 00-5.19 5.1c-.24 3.21-.27 6.39-.06 9.6a5.644 5.644 0 005.7 5.19h3.15v-3.9h-3.15c-.93.03-1.74-.63-1.83-1.56-.18-3-.15-6 .06-9 .06-.84.72-1.47 1.56-1.53 2.04-.15 4.2-.21 6.36-.21s4.32.09 6.36.18c.81.06 1.5.69 1.56 1.53.24 3 .24 6 .06 9-.12.93-.9 1.62-1.83 1.59h-3.15l-6 3.9V24l6-3.9h3.15c2.97.03 5.46-2.25 5.7-5.19.21-3.18.18-6.39-.03-9.57a5.57 5.57 0 00-5.19-5.1c-2.13-.18-4.38-.24-6.63-.24zm-5.04 8.76c-.36 0-.66.3-.66.66v2.34c0 .33.18.63.48.78 1.62.78 3.42 1.2 5.22 1.26 1.8-.06 3.6-.48 5.22-1.26.3-.15.48-.45.48-.78V9.42c0-.09-.03-.15-.09-.21a.648.648 0 00-.87-.36c-1.5.66-3.12 1.02-4.77 1.05-1.65-.03-3.27-.42-4.77-1.08a.566.566 0 00-.24-.06z"
            />
          </svg>
          <div className="text-4xl font-mono font-bold ml-2">
            <span className="text-orange-200">A</span>
            <span className="text-blue-300">Chatt</span>
          </div>
        </div>

        {/* Bagian kalimat utama */}
        <div className="words text-center font-medium">
          <h1
            id="change"
            data-aos="fade-up"
            data-aos-delay="100"
            className="change-element"
          >
            Welcome
          </h1>
          <h3
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-slate-300 text-justify text-last-center text-base w-auto px-8 drop-shadow-md md:text-xl"
          >
            Selamat datang di AChatt, tempat di mana percakapan menjadi lebih
            dari sekadar kata-kata. Mulailah berkomunikasi dengan teman-teman
            Anda secara real-time, bagikan momen-momen berharga, dan buat
            kenangan yang tak terlupakan.
            <br />
            <br />
            AChatt, tempatnya untuk berbagi cerita dan tersenyum bersama.
          </h3>
        </div>

        {/* Bagian button direct */}
        <div className="mt-10 mx-8 md:mt-14">
          <h1
            data-aos="fade-up"
            data-aos-delay="300"
            className="text-center font-medium text-lg text-slate-300 mb-5 md:text-2xl"
          >
            Masuk ke <span className="text-orange-200">A</span>
            <span className="text-blue-300">Chatt</span>
          </h1>
          <div
            data-aos="fade-up"
            data-aos-delay="350"
            className="flex justify-center gap-x-5 w-full h-auto"
          >
            <button className="home-button" onClick={loginHandler}>
              Login
            </button>
            <p className="text-slate-300 font-medium font-sans text-lg md:text-2xl">
              - or -{" "}
            </p>
            <button className="home-button" onClick={signupHandler}>
              Signup
            </button>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="mx-auto mt-16 font-mono font-bold underline text-slate-200/50 text-sm transition duration-200 md:text-lg hover:text-slate-200/80 hover:cursor-pointer"
        >
          About developer
        </div>
      </div>

      {/* Shape divider Wave bagian bawah */}
      <div class="custom-shape-divider-bottom-1696242358">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            class="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            class="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default Home;
