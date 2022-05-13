import axios from "@/api/axios";
import { UserProfile } from "@/entities/user";

const register = (user: object) => {
  return axios.post('/users', { user });
};

const login = (user: object) => {
  return axios.post('/users/login', { user });
};

const getCurrentUser = () => {
  return axios.get('/user');
};

const updateCurrentUser = (user: UserProfile) => {
  return axios
    .put('/user', { user })
    .then(response => response.data.user);
};

export default {
  register,
  login,
  getCurrentUser,
  updateCurrentUser,
};