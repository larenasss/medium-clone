import axios from "@/plugins/axios";
import { Comment } from "@/entities/comment";

const getComments = (slugArticle: string): Promise<Array<Comment>> => {
  return axios
    .get(`/articles/${slugArticle}/comments`)
    .then(response => response.data.comments);
};

const addComment = ({ slugArticle, comment }: {slugArticle: string, comment: Comment}): Promise<Comment> => {
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