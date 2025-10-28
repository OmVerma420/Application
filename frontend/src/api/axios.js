import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1', // Adjust the base URL as needed
  withCredentials: true, // To send cookies with requests
});

// Request interceptor to add auth token if available
api.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle global errors here
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access
      // e.g., redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;
