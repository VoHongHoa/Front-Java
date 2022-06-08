import axios from "../axios";
const fetchDataChart = () => {
  return axios.get("admin/chart");
};
export { fetchDataChart };
