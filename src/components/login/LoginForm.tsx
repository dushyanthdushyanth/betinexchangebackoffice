'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { APP_CONFIG } from '@/constants';
import { toast } from "react-toastify";
import { isValidEmail} from '@/utils';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { performPostAPICall } from '@/utils';
import {axiosClient} from '@/utils/axios';
import { setAccessToken, setClientId, setRefreshToken} from '@/redux/slices/cookieSlice';

import { useDispatch } from "@/redux/store";
import { log } from 'console';


interface AxiosError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function LoginForm() {
const searchParams = useSearchParams();
const [loginInfo, setLoginInfo] = useState({
    deviceId: "",
    ipAddress: "",
    password: "",
    userAgent: "",
    userName: "",
  });
  const [errors, setErrors] = useState<{ userName?: string; password?: string; general?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setLoginInfo((prevState) => ({
          ...prevState,
          ipAddress: data.ip,
        }));
      } catch (error) {
        console.error("Error fetching IP:", error);
      }
    };

    fetchIP(); // Trigger the IP fetch on component mount
  }, []);

  

  const router = useRouter();

  const validateForm = () => {
    const newErrors: { userName?: string; password?: string; general?: string } = {};

    if (!loginInfo.userName) {
      newErrors.userName = 'Email is required';
    } else if (!isValidEmail(loginInfo.userName)) {
      newErrors.userName = 'Please enter a valid email address';
    }

    if (!loginInfo.password) {
      newErrors.password = 'Password is required';
    } 
    
    
    // else if (!isValidPassword(loginInfo.password)) {
    //   newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number';
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


   const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    const body = loginInfo;
        try {
      const response = await axiosClient.post(`/api/login`, body);
      console.log("Logiesponse:", response);
             const { message } = response.data?.message || {};

      if (response.status === 200) {
       const { accessToken, refreshToken } = response.data?.data || {};
       const clientId = "1";

  if (accessToken && refreshToken) {
    dispatch(setAccessToken(accessToken));
    dispatch(setClientId(clientId));
    dispatch(setRefreshToken(refreshToken));
    toast.success("Login successful");
    router.push("/userlist");
        }
      } else {
        switch (message) {
          case "USER_NOT_FOUND":
            toast.error("Invalid UserName");
            break;
          case "INVALID_PASSWORD":
            toast.error("Invalid Password");
            break;
          case "USER_IS_INACTIVE":
            toast.error("User InActive");
            break;
          case "INVALID_2FA_CODE":
            toast.error("Invalid 2fa Code");
            break;
        }
      }
    } catch (error) {
      const typedError = error as AxiosError;
      const key = typedError.response?.data?.message;

      switch (key) {
        case "USER_NOT_FOUND":
          toast.error("Invalid UserName");
          break;
        case "INVALID_PASSWORD":
          toast.error("Invalid Password");
          break;
      }
    }
    finally{
      setIsSubmitting(false);
    }

  };

  return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            {/* Header */}
            <div className="text-center">
              {/* <div className="mx-auto h-16 w-16 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-2xl">B</span>
              </div> */}
              <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Sign in to your {APP_CONFIG.name} account
              </p>
            </div>

            {/* Login Form */}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Email Field */}
                <div>
                  <label htmlFor="userName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email address
                  </label>
                  <input
                    id="userName"
                    name="userName"
                    type="email"
                    autoComplete="email"
                    required
                    value={loginInfo.userName}
                    onChange={(e) => setLoginInfo({ ...loginInfo, userName: e.target.value })}
                    className={`mt-1 appearance-none relative block w-full px-3 py-3 border ${
                        errors.userName ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                    } placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                    placeholder="Enter your email"
                  />
                  {errors.userName && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.userName}</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={loginInfo.password}
                    onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
                    className={`mt-1 appearance-none relative block w-full px-3 py-3 border ${
                      errors.password ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                    } placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
                  )}
                </div>
              </div>

              {/* General Error */}
              {errors.general && (
                <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-800 dark:text-red-200">{errors.general}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>

              {/* Demo Credentials */}
              {/* <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
                  <strong>Demo Credentials:</strong><br />
                  Email: admin@betinexchange.com<br />
                  Password: Admin123!
                </p>
              </div> */}
            </form>

            {/* Footer */}
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                  Contact administrator
                </Link>
              </p>
            </div>
          </div>
        </div>
  );
}

