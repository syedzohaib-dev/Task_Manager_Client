import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { validateEmail } from '../../utils/helper.js';
import axiosInstance from '../../utils/axiosInstance.js'
import { API_PATHS } from '../../utils/apiPath.js';
import { errorToast } from '../../utils/toast.js'
import { useUser } from '../../context/UserContext.jsx';


const Login = ({ setUserRole }) => {
  const { getUser } = useUser()
  const [showPassword, setShowPassord] = useState(false)
  const finalType = showPassword ? "text" : "password";

  const toggleShowPassword = () => {
    setShowPassord(!showPassword)
  };

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    }
    if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address.'
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.post(
        `${API_PATHS.AUTH.LOGIN}`,
        formData
      );

      if (response?.data?.data?.user?.role) {
        localStorage.setItem('role', response?.data?.data?.user?.role)
      }

      if (response?.data?.data?.token) {
        localStorage.setItem('token', response?.data?.data?.token)
      }
      if (response?.data?.data?.user?._id) {
        localStorage.setItem('userId', response?.data?.data?.user?._id)
      }

      setFormData({
        email: "",
        password: "",
      })


      // const userRole = localStorage.getItem("role");
      if (response?.data?.data?.user?.role) {
        setUserRole(response?.data?.data?.user?.role); // <-- VERY IMPORTANT
      }
      // if (response?.data?.data?.user?.role === "admin") {
      await getUser();
      navigate("/dashboard");


    } catch (err) {
      console.log("Login Error:", err);

      const message =
        err.response?.data?.message || "Login failed. Try again.";

      errorToast(err.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div onSubmit={handleSubmit} className="h-screen flex justify-center items-center border">
      {/* Left Side - Signup Form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center sm:p-6 ">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">LOGIN</h1>
            <p className="text-sm sm:text-base text-gray-600">Enter your email and password to Login</p>
          </div>

          {/* Signup Form */}
          <form className="space-y-4 sm:space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 sm:py-2 text-sm sm:text-base border rounded-lg hover:border-blue-800 outline-none ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                placeholder="Enter your email"
              />
              {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className={`w-full flex justify-center items-center border pr-2  rounded-lg hover:border-blue-800 outline-none ${errors.email ? ' border-red-400' : 'border-gray-300'}`}>
                <input
                  type={finalType}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-2 text-sm sm:text-base border-none outline-none`}
                  placeholder="Enter your password"
                />
                {
                  <>
                    {showPassword ? (
                      <FaRegEye
                        size={22}
                        className='text-text-slate-400 cursor-pointer'
                        onClick={() => toggleShowPassword()}
                      />
                    ) : (
                      <FaRegEyeSlash
                        size={22}
                        className='text-slate-400 cursor-pointer'
                        onClick={() => toggleShowPassword()}
                      />
                    )

                    }
                  </>

                }
              </div>
              {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password}</p>}
            </div>



            <button
              type="submit"
              disabled={loading}
              // disabled={loading}
              className="w-full text-white py-2 sm:py-3 px-4 rounded-lg outline-none bg-blue-800 hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"

            >
              {loading ? "LOGIN IN..." : "LOGIN"}
            </button>
          </form>

          {/* Login Link */}

        </div>
      </div >


    </div >
  );
};

export default Login;