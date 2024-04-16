import axios, { AxiosRequestConfig } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const authAxios = axios.create({
  withCredentials: true,
});

const refreshAuthLogic = async (failedRequest: any) => {
  const tokenRefreshResponse = await axios.post('/api/refresh-token', {}, { withCredentials: true });
  const newToken = tokenRefreshResponse.data.newToken;
  failedRequest.response.config.headers['Authorization'] = 'Bearer ' + newToken;
  localStorage.setItem('token', newToken);
  return Promise.resolve();
};

createAuthRefreshInterceptor(authAxios, refreshAuthLogic);

authAxios.interceptors.request.use((config) => {
  config.headers = config.headers || {};

  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  } else {
    console.warn('No token available, request might fail due to authentication.');
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default authAxios;
