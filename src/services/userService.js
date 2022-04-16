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
  return axios.post(`/sua-thong-tin/${data.userId}`, data);
};
export { handleSignUp, handleLogin, getUserInfor, editUserInfor };
