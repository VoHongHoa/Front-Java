import axios from "../axios";
const handleLogin = (data) => {
  console.log(data);
  return axios.post("/dang-ky", data);
};
export { handleLogin };
