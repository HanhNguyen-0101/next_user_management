import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

// Add a request interceptor
axiosConfig.interceptors.request.use(
  function (config) {
    // // Modify the request config here (e.g., add headers, authentication tokens)
    // const accessToken = JSON.parse(localStorage.getItem("token"));

    // // ** If token is present add it to request's Authorization Header
    // if (accessToken) {
    //   if (config.headers) config.headers.token = accessToken;
    // }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosConfig.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosConfig;