import axios from "../axios";
const getAllCategoriesBooks = (page) => {
  return axios.get(`/admin/xem-tat-ca-loai-sach/${page}`);
};
const addNewCategoriesBooks = (data) => {
  return axios.post("/admin/luu-loai-sach", data);
};
const deleteCategories = (idCategory) => {
  return axios.delete(`/admin/xoa-loai-sach/${idCategory}`);
};
export { getAllCategoriesBooks, addNewCategoriesBooks, deleteCategories };
