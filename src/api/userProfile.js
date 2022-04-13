import axios from "@/api/axios";

const getUserProfile = slug => {
  return axios.get(`/profiles/${slug}`).then(response => response.data.profile);
};

const addToFallow = slug => {
  return axios
    .post(`/profiles/${slug}/follow`, {})
    .then(response => response.data.profile);
};

const removeFromFallow = slug => {
  return axios
    .delete(`/profiles/${slug}/follow`)
    .then(response => response.data.profile);
};

export default {
  getUserProfile,
  addToFallow,
  removeFromFallow
};