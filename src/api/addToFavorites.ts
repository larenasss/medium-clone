import axios from "@/plugins/axios";
import { Article } from "@/entities/article";

const addToFavorites = (slug: string): Promise<Article> => {
  return axios
    .post(`/articles/${slug}/favorite`, {})
    .then(response => response.data.article);
};

const removeFromFavorites = (slug: string): Promise<Article> => {
  return axios
    .delete(`/articles/${slug}/favorite`)
    .then(response => response.data.article);
};

export default {
  addToFavorites,
  removeFromFavorites
};