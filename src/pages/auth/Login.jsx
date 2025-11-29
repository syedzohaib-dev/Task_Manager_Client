import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { validateEmail } from '../../utils/helper.js';
// import { API_PATHS, BASE_URL } from '../../utils/apiPath.js';
// import axios from 'axios';
// import { Navigate } from "react-router-dom";


const Login = ({ setUserRole }) => {

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
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.'
      return;
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };


  


  return (
    <div className="h-screen flex justify-center items-center border">
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
              // disabled={loading}
              className="w-full text-white py-2 sm:py-3 px-4 rounded-lg outline-none bg-blue-800 hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"

            >
              {/* {loading ? "LOGIN IN..." : "LOGIN"} */} LOGIN
            </button>
          </form>

          {/* Login Link */}

        </div>
      </div >


    </div >
  );
};

export default Login;