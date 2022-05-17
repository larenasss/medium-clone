import axios from "@/api/axios";
import { UserProfile } from "@/entities/user";

const register = (user: object): Promise<UserProfile> => {
  return axios
    .post('/users', { user })
    .then(res => res.data.user);
};

const login = (user: object): Promise<UserProfile> => {
  return axios
    .post('/users/login', { user })
    .then(res => res.data.user);
};

const getCurrentUser = (): Promise<UserProfile> => {
  return axios
    .get('/user')
    .then(res => res.data.user);
};

const updateCurrentUserProfile = (user: UserProfile): Promise<UserProfile> => {
  return axios
    .put('/user', { user })
    .then(response => response.data.user);
};

export default {
  register,
  login,
  getCurrentUser,
  updateCurrentUserProfile,
};