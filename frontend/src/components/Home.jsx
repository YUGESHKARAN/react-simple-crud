import React from "react";
import faculty from "../assets/faculty.jpg";
import student from "../assets/student.jpg";
import axios from "axios";
import { useState, useEffect } from "react";

import { useAuth } from "../AuthContext";
function Home() {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const { logout } = useAuth();

  function handleLogout() {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    logout();
  }

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/user`);
      console.log("data", response.data);
    } catch (err) {
      console.error("Error", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full  flex justify-center items-center h-screen">
      <div className="flex flex-col w-3/6 justify-center">
        <h1 className="text-center font-semibold text-2xl">
          Hi, {username} <br /> Welcome to{" "}
          <span className="text-red-500"> {role} </span> Dashboard
        </h1>

        {role === "student" ? (
          <img
            src={student}
            className="w-full shadow-2xl rounded-md m-auto mt-10"
          />
        ) : (
          <img
            src={faculty}
            className="w-full rounded-md shadow-md m-auto mt-10"
          />
        )}

        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-blue-500  w-fit mt-10 text-white px-2 py-1 font-semibold rounded-md hover:bg-blue-600 transition-all duration-200"
          >
            {" "}
            logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
