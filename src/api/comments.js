import axios from "@/api/axios";

const getComments = slugArticle => {
  return axios
    .get(`/articles/${slugArticle}/comments`)
    .then(response => response.data.comments);
};

const deleteComment = ({ slugArticle, slugComment }) => {
  return axios
    .delete(`/articles/${slugArticle}/comments/${slugComment}`);
};

export default {
  getComments,
  deleteComment
};