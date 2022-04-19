import axios from "../axios";
const addNewBook = (data) => {
  return axios.post("/admin/luu-sach", data);
};
export { addNewBook };
