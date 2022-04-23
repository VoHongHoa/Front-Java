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
export { addNewBook, getAllBooksPaging, deleteBook };
