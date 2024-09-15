import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function loginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [title,setTitle] = useState('Login Page') ;
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const navigate = useNavigate(); // Hook for navigation
  const { login } = useAuth();
  const [password, setPassword] = useState("Password");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the API using axios
      const response = await axios.post(
        "http://localhost:8000/login",
        formData
      );

      if (response.status === 200) {
        setSuccess("Login successful!");
        login();
        console.log("user data", response.data);
        localStorage.setItem("username", response.data.user.username); // Assuming the username is returned in the response
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("role", response.data.user.role);
        navigate("/home"); // Redirect to home page
      }
    } catch (error) {
      setErrors({ apiError: error.response.data.message || "Login failed" });
    }
  };

  const handleChangePassword = async (e, email, password) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8000/user/${email}`, {
        password: password,
      });
      response.status == 201 && setSuccess("Password updated Successfully");
      setForgotPassword(false);
      setPassword("Password");
      setTitle('Login Page') ;
      window.location.reload();
    } catch (err) {
      console.log("Error", err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className="text-blue-600 text-md font-semibold w-full h-screen bg-gray-300 flex justify-center items-center">
        <div className="bg-white p-16 rounded-md">
          <h2 className="text-center text-xl">{title}</h2>
          <form className="w-96 mx-auto p-4">
            {success && <p className="text-green-500">{success}</p>}
            {errors.apiError && (
              <p className="text-red-500">{errors.apiError}</p>
            )}

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Enter Email"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                {password}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Enter Password"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <button
              // onSubmit={handleSubmit}
              onClick={handleSubmit}
              type="submit"
              className={`${
                forgotPassword
                  ? "hidden"
                  : "w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              }`}
            >
              Login
            </button>
            <button
              // onSubmit={handleSubmit}
              onClick={(e) =>
                handleChangePassword(e, formData.email, formData.password)
              }
              type="submit"
              className={`${
                forgotPassword
                  ? "w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  : "hidden"
              }`}
            >
              Upadte Password
            </button>
          </form>
          <p
            onClick={() => {
              setForgotPassword(true);
              setPassword("New Password");
              setTitle('Forgot Password') ;
            }}
            className="mt-4 flex px-4 justify-start gap-2 text-gray-600"
          >
            Forgot Password? {"  "}
            <p className="text-blue-500 hover:underline cursor-pointer">
              Click here
            </p>
          </p>
          <p className="mt-4  px-4 text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default loginPage;
