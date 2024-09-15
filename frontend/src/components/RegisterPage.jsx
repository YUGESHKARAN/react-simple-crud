import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function registerPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "student", // default to 'student'
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        // Send a POST request to the API using axios
        const response = await axios.post(
          "http://127.0.0.1:8000/user",
          formData
        );

        if (response.status === 201) {
          setSuccess("Registration successful!");
          login();

          localStorage.setItem("username", formData.username); // Assuming the username is returned in the response
          localStorage.setItem("email", formData.email);
          localStorage.setItem("role", formData.role);
          setFormData({
            username: "",
            email: "",
            password: "",
            role: "student",
          });

          navigate("/home");
        }
      } catch (error) {
        if (error.response) {
          setErrors({
            apiError: error.response.data.message || "Registration failed",
          });
        } else {
          setErrors({ apiError: "Error connecting to the server" });
        }
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="text-blue-600 text-md font-semibold w-full h-screen bg-gray-300 flex justify-center items-center">
      <div className="bg-white p-16 rounded-md">
        <h2 className="text-center text-xl">Register Page</h2>
        <form onSubmit={handleSubmit} className=" w-96 mx-auto p-4">
          {success && <p className="text-green-500">{success}</p>}
          {errors.apiError && <p className="text-red-500">{errors.apiError}</p>}

          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

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
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Register
          </button>
        </form>

        {/* Link to login page */}
        <p className="mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default registerPage;
