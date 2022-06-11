import axios from "../axios";
const addComment = (data, bookId) => {
  return axios.post(`/user/luu-comment/${bookId}`, data);
};
const deleteComment = (commentId) => {
  return axios.post(`/user/xoa-comment/${commentId}`);
};
const editComment = (commentId, data) => {
  return axios.post(`/user/sua-comment/${commentId}`, data);
};
const getComment = (bookId) => {
  return axios.get(`/book/comment/${bookId}`);
};
const updateReviewByUser = (commentId) => {
  return axios.post(`/user/sua-comment/${commentId}`);
};

export {
  addComment,
  deleteComment,
  editComment,
  getComment,
  updateReviewByUser,
};
