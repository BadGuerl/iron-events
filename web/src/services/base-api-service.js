import axios from 'axios';

const http = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api'
})

http.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // 401 from API means unauthorized! redirect to login page
    if (error?.response?.status === 401) {
      localStorage.removeItem(currentUserStori)
      window.location.replace('/login')
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export default http;
