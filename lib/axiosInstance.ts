import axios from "axios";

export const httpClient = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  timeout: 1000,
});

// Add a request interceptor
httpClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.Authorization = `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
  { synchronous: true, runWhen: () => true }
);

// Add a response interceptor
httpClient.interceptors.response.use(
  function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
