import axios from 'axios';
import { apiBaseUrl, authBaseUrl } from '../contants';
import { getToken, setToken } from '../utils/token';
// import { NewToken } from '../types';

const axiosWithAuth = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

axiosWithAuth.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosWithAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // refresh token in cookie
        const url: string = `${authBaseUrl}/usuarios/refresh`;
        const response = await axios.get(url);
        
        const { accessToken } = response.data;

        setToken(accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return axios(originalRequest);
      } catch(error) {
        // redirect to login
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosWithAuth;