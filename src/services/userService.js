import axios from "../axios";
const handleSignUp = (data) => {
  return axios.post("/dang-ky", data);
};
const handleLogin = (data) => {
  return axios.post("/dang-nhap", data);
};
const getUserInfor = () => {
  return axios.get("/xem-tai-khoan");
};

const editUserInfor = (data) => {
  return axios.post(`/sua-thong-tin/`, data);
};

const getAllUser = (currentPage) => {
  return axios.get(`/admin/xem-tat-ca-user/${currentPage}`);
};
const deleteUser = (userId) => {
  return axios.delete(`/admin/xoa-user/${userId}`);
};
export {
  handleSignUp,
  handleLogin,
  getUserInfor,
  editUserInfor,
  getAllUser,
  deleteUser,
};
