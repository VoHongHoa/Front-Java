import axios from "../axios";
const addNewBook = (data) => {
  return axios.post("/admin/luu-sach", data);
};
const getAllBooksPaging = (page) => {
  return axios.get(`/admin/xem-tat-ca-sach/${page}`);
};
const deleteBook = (bookId) => {
  return axios.delete(`/admin/xoa-sach/${bookId}`);
};
const getBooksLibrary = () => {
  return axios.get(`/thu-vien`);
};
const borrowBooks = (data) => {
  return axios.get("/user/muon-sach", data);
};
const editBook = (data, bookId) => {
  return axios.post(`/admin/sua-sach/${bookId}`, data);
};
export {
  addNewBook,
  getAllBooksPaging,
  deleteBook,
  getBooksLibrary,
  borrowBooks,
  editBook,
};
