import axios from "@/api/axios";

const register = credentials => {
  return axios.post('/users', { user: credentials });
};

const login = credentials => {
  return axios.post('/users/login', credentials);
};

export default {
  register,
  login
};