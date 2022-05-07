import axios from "@/api/axios";

const getComments = (slugArticle: string) => {
  return axios
    .get(`/articles/${slugArticle}/comments`)
    .then(response => response.data.comments);
};

const addComment = ({ slugArticle, comment }: {slugArticle: string, comment: Comment}) => {
  return axios
    .post(`/articles/${slugArticle}/comments`, { comment })
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