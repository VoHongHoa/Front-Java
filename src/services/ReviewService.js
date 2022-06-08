import axios from "axios";
const addComment = data => {
  return axios.post(`/user/luu-comment/${data.bookId}`, data);
};
const deleteComment = commentId => {
  return axios.delete(`/user/xoa-comment/${commentId}`);
};
const editComment = data => {
  return axios.post(`/user/sua-comment/${data.bookId}`, data);
};
const getComment = bookId => {
  return axios.get(`/book/comment/${bookId}`);
};

export { addComment, deleteComment, editComment, getComment };
