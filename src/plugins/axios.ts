import axios, { AxiosRequestConfig } from "axios";
import { getToken } from '@/service/jwtService';

axios.defaults.baseURL = 'https://conduit.productionready.io/api';

axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
  const token = getToken();
  const authorizationToken = token ? `Token ${token}` : '';
  config.headers = {
    Authorization: authorizationToken
  };
  return config;
});

export default axios;