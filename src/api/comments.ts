import axios from "@/api/axios";

const getComments = (slugArticle: string) => {
  return axios
    .get(`/articles/${slugArticle}/comments`)
    .then(response => response.data.comments);
};

const addComment = ({ slugArticle, commentInput }: {slugArticle: string, commentInput: object}) => {
  return axios
    .post(`/articles/${slugArticle}/comments`, { comment: commentInput })
    .then(response => response.data.comment);
};

const deleteComment = ({ slugArticle, slugComment }: {slugArticle: string, slugComment: string}) => {
  return axios
    .delete(`/articles/${slugArticle}/comments/${slugComment}`);
};

export default {
  getComments,
  deleteComment,
  addComment
};