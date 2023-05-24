import axios from 'axios';

const mongoInstance = axios.create({
  baseURL: 'http://localhost:5000/',
  headers: { Authorization: `Bearer ${localStorage.getItem('accessTocken')}` },
});

mongoInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      'accessTocken'
    )}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default mongoInstance;
