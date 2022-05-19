import axios from "@/api/axios";
import { UserProfile } from "@/entities/user";

const getUserProfile = (slug: string): Promise<UserProfile> => {
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
  getUserProfile,
  addToFallow,
  removeFromFallow
};