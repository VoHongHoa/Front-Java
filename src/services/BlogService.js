import axios from "../axios";
const addNewBlog = (data) => {
  return axios.post("/admin/them-blog", data);
};
const getAllBlog = () => {
  return axios.get("/admin/xem-tat-ca-blog");
};
export { addNewBlog, getAllBlog };
