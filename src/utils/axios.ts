import axios from "axios";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";

const UNAUTHORIZED_MESSAGES = [
  "INVALID_TOKEN",
  "AUTHORIZATION_TOKEN_SHOULD_NOT_BE_EMPTY",
  "INVALID_USER"
];

const axiosInterceptorResponse = async (response: any) => {
  
  if (
    response?.data?.status === 401 ||
    UNAUTHORIZED_MESSAGES.includes(response?.data?.message)
  ) {
    Cookies.remove("accessToken");
    Cookies.remove("clientId");
    if (typeof window !== "undefined") {
      window.location.replace("/login?clear=true");
    } else {
      console.log("Axios Interceptor server");
      redirect("/login?clear=true");
    }
  }
  return response;
};

const axiosInterceptorResponseError = async (error: any) => {
  if (
    error?.response.data.status === 401 ||
    UNAUTHORIZED_MESSAGES.includes(error?.response.data.message) ||
    error.message === "Request failed with status code 401"
  ) {
    Cookies.remove("accessToken");
    Cookies.remove("clientId");
    if (typeof window !== "undefined") {
      window.location.replace("/login?clear=true");
    } else {
      console.log("Axios Interceptor Error server");
      redirect("/login?clear=true");
    }
  }
};

const axiosServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_lOCAL || process.env.NEXT_PUBLIC_API_URL_LOCAL,
});

const axiosClient = axios.create({});

const axiosPrivate = axios.create({});

axiosServer.interceptors.response.use(
  async (response) => {
    console.log("Axios Server Response",response)

    return axiosInterceptorResponse(response);
  },
  (error) => {
    console.log("Axios Server Response",error)

    axiosInterceptorResponseError
    Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  async (response) => {
    return axiosInterceptorResponse(response);
  },
  (error) => {
    axiosInterceptorResponseError(error);
    Promise.reject(error);
  }
);

axiosPrivate.interceptors.response.use(
  async (response) => {
    return axiosInterceptorResponse(response);
  },
  // (error) =>{
  //   axiosInterceptorResponseError(error);   
  //   Promise.reject(error)
  // }
);

export { axiosServer, axiosClient, axiosPrivate };
