import axios from "@/api/axios";

const addToFavorites = (slug: string) => {
  return axios
    .post(`/articles/${slug}/favorite`, {})
    .then(response => response.data.article);
};

const removeFromFavorites = (slug: string) => {
  return axios
    .delete(`/articles/${slug}/favorite`)
    .then(response => response.data.article);
};

export default {
  addToFavorites,
  removeFromFavorites
};