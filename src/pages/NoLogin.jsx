import React from "react";

function NoLogin() {
  function linkHandler() {
    window.location.href = "/login";
  }
  return (
    <div className="w-screen h-screen bg-quietLight text-2xl font-semibold flex items-center justify-center">
      <p>
        Untuk mengakses aplikasi harap{" "}
        <span
          className="underline text-blue-600 font-bold hover:text-blue-800 hover:cursor-pointer"
          onClick={linkHandler}
        >
          Login
        </span>{" "}
        terlebih dahulu
      </p>
    </div>
  );
}

export default NoLogin;
