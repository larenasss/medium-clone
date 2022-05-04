import axios from "@/api/axios";

const register = (credentials: object) => {
  return axios.post('/users', { user: credentials });
};

const login = (credentials: object) => {
  return axios.post('/users/login', credentials);
};

const getCurrentUser = () => {
  return axios.get('/user');
};

const updateCurrentUser = (currentUserInput: object) => {
  return axios
    .put('/user', { user: currentUserInput })
    .then(response => response.data.user);
};

export default {
  register,
  login,
  getCurrentUser,
  updateCurrentUser,
};