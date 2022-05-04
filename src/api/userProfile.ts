import axios from "@/api/axios";

const getUserProfile = (slug: string) => {
  return axios.get(`/profiles/${slug}`).then(response => response.data.profile);
};

const addToFallow = (slug: string) => {
  return axios
    .post(`/profiles/${slug}/follow`, {})
    .then(response => response.data.profile);
};

const removeFromFallow = (slug: string) => {
  return axios
    .delete(`/profiles/${slug}/follow`)
    .then(response => response.data.profile);
};

export default {
  getUserProfile,
  addToFallow,
  removeFromFallow
};