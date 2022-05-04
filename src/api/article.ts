import axios from "@/api/axios";

const getArticle = (slug: string) => {
  return axios
    .get(`/articles/${slug}`)
    .then(response => response.data.article);
};

const createArticle = (articleInput: object) => {
  return axios
    .post(`/articles`, { article: articleInput })
    .then(response => response.data.article);
};

const updateArticle = (slug: string, articleInput: object) => {
  return axios
    .put(`/articles/${slug}`, { article: articleInput })
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