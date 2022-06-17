import axios from "@/plugins/axios";
import { Article } from "@/entities/article";

const getArticle = (slug: string): Promise<Article> => {
  return axios
    .get(`/articles/${slug}`)
    .then(response => response.data.article);
};

const createArticle = (article: Article): Promise<Article> => {
  return axios
    .post(`/articles`, { article })
    .then(response => response.data.article);
};

const updateArticle = (slug: string, article: Article): Promise<Article> => {
  return axios
    .put(`/articles/${slug}`, { article })
    .then(response => response.data.article);
};

const deleteArticle = (slug: string) => {
  return axios.delete(`/articles/${slug}`);
};

export default {
  getArticle,
  deleteArticle,
  createArticle,
  updateArticle
};