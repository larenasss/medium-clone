import axios from "@/plugins/axios";
import { UserAuthor, UserProfile } from "@/entities/user";

const register = (user: object): Promise<UserProfile> => {
  return axios
    .post('/users', { user })
    .then(res => res.data.user);
};

const getUserProfile = (slug: string): Promise<UserAuthor> => {
  return axios
    .get(`/profiles/${slug}`)
    .then(response => response.data.profile);
};

const addToFallow = (slug: string): Promise<UserProfile> => {
  return axios
    .post(`/profiles/${slug}/follow`, {})
    .then(response => response.data.profile);
};

const removeFromFallow = (slug: string): Promise<UserProfile> => {
  return axios
    .delete(`/profiles/${slug}/follow`)
    .then(response => response.data.profile);
};

export default {
  register,
  getUserProfile,
  addToFallow,
  removeFromFallow
};